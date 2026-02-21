import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const getSupabase = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

const VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN;
const APP_SECRET = process.env.FACEBOOK_APP_SECRET;

// Prefer env override; fallback to latest you’re using in dashboard
const GRAPH_API_VERSION = process.env.FACEBOOK_GRAPH_API_VERSION || 'v25.0';

// Verify webhook signature from Facebook
function verifySignature(payload: string, signature: string): boolean {
  if (process.env.NODE_ENV !== 'production' || process.env.WEBHOOK_SKIP_SIGNATURE === 'true') {
    console.log('Skipping signature verification for local/dev environment.');
    return true;
  }
  if (!APP_SECRET) return false;

  const expectedSignature = crypto
    .createHmac('sha256', APP_SECRET)
    .update(payload, 'utf8')
    .digest('hex');

  return signature === `sha256=${expectedSignature}`;
}

// Helpers
function pickFirst(fields: Record<string, string>, keys: string[]): string | null {
  for (const k of keys) {
    const v = fields[k];
    if (v && String(v).trim() !== '') return String(v).trim();
  }
  return null;
}

function normalizeYes(v: string | null): boolean {
  if (!v) return false;
  const s = v.toLowerCase();
  return s.includes('yes') || s.includes('owner') || s.includes('own') || s.includes('i_am_the_owner');
}

// Calculate a dynamic lead score based on available data
function calculateLeadScore(fields: Record<string, string>): number {
  let score = 40;

  if (fields.email) score += 10;
  if (fields.phone_number || fields.phone) score += 10;
  if (fields.full_name && fields.full_name !== 'Facebook Lead') score += 5;

  const ownership = pickFirst(fields, [
    'property_ownership',
    'are_you_the_owner_of_the_property',
    'do_you_own_this_property?',
  ]);
  if (normalizeYes(ownership)) score += 15;

  const bill = pickFirst(fields, [
    'quarterly_bill',
    'what_is_your_quarterly_electricity_bill',
    'what_is_your_average_electricity_bill_per_quarter?',
    'electricity_bill',
  ]);
  if (bill) score += 10;

  const cityOrZip = pickFirst(fields, [
    'city',
    'suburb',
    'which_city_do_you_live_in?',
    'postcode',
    'zip_code',
    'post_code',
  ]);
  if (cityOrZip) score += 5;

  return Math.min(score, 100);
}

// GET - Webhook verification
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  console.log('Webhook verification request:', { mode, hasToken: !!token, hasChallenge: !!challenge });

  if (!VERIFY_TOKEN) {
    console.error('FACEBOOK_VERIFY_TOKEN is not configured');
    return new Response('Server misconfigured', { status: 500 });
  }

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verified successfully');
    return new Response(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  console.error('Webhook verification failed - mode:', mode, 'token match:', token === VERIFY_TOKEN);
  return new Response('Verification failed', { status: 403 });
}

// POST - Receive lead data from Facebook
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256') || '';

    // Verify Facebook signature
    if (!verifySignature(body, signature)) {
      console.error('Invalid webhook signature - rejecting request');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const data = JSON.parse(body);

    // We only care about Page webhooks
    if (data.object !== 'page') {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const supabase = getSupabase();
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    if (!accessToken) {
      console.error('FACEBOOK_ACCESS_TOKEN is missing - cannot fetch lead details');
    }

    for (const entry of data.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field !== 'leadgen') continue;

        const leadgenData = change.value || {};
        const leadId = leadgenData.leadgen_id;
        const formId = leadgenData.form_id;
        const adId = leadgenData.ad_id;
        const pageId = leadgenData.page_id;
        const createdTime = leadgenData.created_time;

        if (!leadId) {
          console.warn('leadgen payload missing leadgen_id; skipping');
          continue;
        }

        // 1) Fetch lead details (IMPORTANT: do NOT ask for form_name here)
        let leadDetails: any = null;

        if (process.env.MOCK_FACEBOOK_GRAPH === 'true') {
          console.log('[MOCK_FACEBOOK_GRAPH] Simulating Graph API response for leadId:', leadId);
          leadDetails = {
            id: leadId,
            created_time: Math.floor(Date.now() / 1000),
            ad_id: adId || 'mock_ad_id',
            ad_name: 'Mock Ad Name',
            campaign_id: 'mock_campaign_id',
            campaign_name: 'Mock Campaign Name',
            form_id: formId || 'mock_form_id',
            field_data: [
              { name: 'full_name', values: ['Shoaib Khan'] },
              { name: 'email', values: ['shoaib.test@pureplanet.com.au'] },
              { name: 'phone_number', values: ['+61400000000'] },
              { name: 'zip_code', values: ['2000'] },
              { name: 'which_city_do_you_live_in?', values: ['Sydney'] },
              { name: 'do_you_own_this_property?', values: ['yes'] },
              { name: 'what_is_your_average_electricity_bill_per_quarter?', values: ['$300-$500'] }
            ]
          };
        } else if (accessToken) {
          try {
            const fieldsParam =
              'id,created_time,field_data,ad_id,ad_name,campaign_id,campaign_name,form_id';
            const fbResponse = await fetch(
              `https://graph.facebook.com/${GRAPH_API_VERSION}/${leadId}?fields=${fieldsParam}`,
              {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );

            const text = await fbResponse.text();
            if (fbResponse.ok) {
              leadDetails = JSON.parse(text);
            } else {
              console.error('Failed to fetch lead details from Facebook:', text);
            }
          } catch (err) {
            console.error('Error calling Facebook Graph API for lead:', err);
          }
        }

        // 2) Parse field_data into flat map
        const fields: Record<string, string> = {};
        if (leadDetails?.field_data) {
          for (const field of leadDetails.field_data) {
            const name = field?.name;
            const values = Array.isArray(field?.values) ? field.values : [];
            if (!name) continue;
            fields[name] = values.map(String).join(', ');
          }
        }

        // 3) Fetch form name safely (optional) so DB shows friendly form name
        let formName: string | null = null;
        const resolvedFormId = formId || leadDetails?.form_id;

        if (accessToken && resolvedFormId) {
          try {
            const formResp = await fetch(
              `https://graph.facebook.com/${GRAPH_API_VERSION}/${resolvedFormId}?fields=name`,
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            const formText = await formResp.text();
            if (formResp.ok) {
              const formJson = JSON.parse(formText);
              formName = formJson?.name || null;
            } else {
              // Not fatal — just fallback to ID label
              console.warn('Could not fetch form name:', formText);
            }
          } catch (e) {
            console.warn('Error fetching form name:', e);
          }
        }

        // 4) Extract standard fields (these are correct per your Explorer output)
        const fullName = pickFirst(fields, ['full_name', 'name']) || 'Facebook Lead';
        const email = pickFirst(fields, ['email']);
        const phone = pickFirst(fields, ['phone_number', 'phone']);

        // 5) Extract custom fields from your actual form keys
        const city = pickFirst(fields, ['city', 'suburb', 'which_city_do_you_live_in?']);
        const postcode = pickFirst(fields, ['postcode', 'zip_code', 'post_code']);

        const propertyOwnership = pickFirst(fields, [
          'property_ownership',
          'are_you_the_owner_of_the_property',
          'do_you_own_this_property?',
        ]);

        const quarterlyBillRange = pickFirst(fields, [
          'quarterly_bill',
          'what_is_your_quarterly_electricity_bill',
          'what_is_your_average_electricity_bill_per_quarter?',
          'electricity_bill',
        ]);

        // 6) Build message from remaining fields
        const ignoreKeys = new Set([
          'full_name',
          'name',
          'email',
          'phone_number',
          'phone',
          'city',
          'suburb',
          'which_city_do_you_live_in?',
          'postcode',
          'zip_code',
          'post_code',
          'property_ownership',
          'are_you_the_owner_of_the_property',
          'do_you_own_this_property?',
          'quarterly_bill',
          'what_is_your_quarterly_electricity_bill',
          'what_is_your_average_electricity_bill_per_quarter?',
          'electricity_bill',
        ]);

        const customAnswers: string[] = [];
        for (const [name, value] of Object.entries(fields)) {
          if (!ignoreKeys.has(name) && value) customAnswers.push(`${name}: ${value}`);
        }

        const message =
          customAnswers.length > 0 ? `Custom Answers:\n${customAnswers.join('\n')}` : null;

        const leadScore = calculateLeadScore(fields);

        // 7) Friendly names
        const adName = leadDetails?.ad_name || (adId ? `Ad ID: ${adId}` : null);
        const campaignName = leadDetails?.campaign_name || null;

        const leadData = {
          fb_lead_id: leadId,
          full_name: fullName,
          email: email || null,
          phone: phone || null,
          message,
          ad_name: adName,
          campaign_name: campaignName,
          form_name: formName || (resolvedFormId ? `Form ID: ${resolvedFormId}` : null),
          status: 'new',
          lead_score: leadScore,
          source: 'facebook_ads',
          raw_data: leadDetails || leadgenData,
          created_at: createdTime
            ? new Date(createdTime * 1000).toISOString()
            : new Date().toISOString(),
          address: city,
          zip_code: postcode,
          property_ownership: propertyOwnership,
          quarterly_bill_range: quarterlyBillRange,
          fb_form_id: resolvedFormId || null,
          fb_page_id: pageId || null,
          fb_ad_id: leadDetails?.ad_id || adId || null,
        };

        const { data: upsertedFbLead, error: fbError } = await supabase
          .from('facebook_leads')
          .upsert(leadData, { onConflict: 'fb_lead_id' })
          .select()
          .single();

        if (fbError) {
          console.error('Error upserting lead into facebook_leads:', fbError);
        } else {
          console.log('Lead saved to facebook_leads database:', upsertedFbLead?.id);
        }

        // Upsert into leads table as well
        const crmLeadData = {
          fb_lead_id: leadId,
          full_name: fullName,
          email: email || null,
          phone: phone || null,
          source: 'facebook_ads',
          status: 'new',
          lead_score: leadScore,
          message,
          address: city,
          zip_code: postcode,
          postcode: postcode,
          property_ownership: propertyOwnership,
          quarterly_bill_range: quarterlyBillRange,
          ad_name: adName,
          campaign_name: campaignName,
          form_name: formName || (resolvedFormId ? `Form ID: ${resolvedFormId}` : null),
          raw_data: leadDetails || leadgenData,
        };

        const { data: upsertedCrmLead, error: crmError } = await supabase
          .from('leads')
          .upsert(crmLeadData, { onConflict: 'fb_lead_id' })
          .select()
          .single();

        if (crmError) {
          console.error('Error upserting lead into main leads table:', crmError);
        } else {
          console.log('Lead saved to central CRM (leads table):', upsertedCrmLead?.id, {
            fb_lead_id: leadId,
            full_name: fullName,
            email: email || null,
            phone: phone || null,
          });
        }
      }
    }

    // Always return 200 to Facebook
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Still return 200 to prevent retries
    return NextResponse.json({ success: true }, { status: 200 });
  }
}