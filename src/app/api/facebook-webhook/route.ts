import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const getSupabase = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

const VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN;
const APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const GRAPH_API_VERSION = 'v21.0';

// Verify webhook signature from Facebook
function verifySignature(payload: string, signature: string): boolean {
  if (!APP_SECRET) return false;

  const expectedSignature = crypto
    .createHmac('sha256', APP_SECRET)
    .update(payload)
    .digest('hex');

  return signature === `sha256=${expectedSignature}`;
}

// Calculate a dynamic lead score based on available data
function calculateLeadScore(fields: Record<string, string>): number {
  let score = 40; // Base score for any Facebook lead

  // Has email
  if (fields.email) score += 10;
  // Has phone
  if (fields.phone_number || fields.phone) score += 10;
  // Has full name (not generic)
  if (fields.full_name && fields.full_name !== 'Facebook Lead') score += 5;
  // Owns property
  if (fields.property_ownership?.toLowerCase().includes('own') ||
      fields.are_you_the_owner_of_the_property?.toLowerCase().includes('yes')) {
    score += 15;
  }
  // Has electricity bill info
  if (fields.quarterly_bill || fields.electricity_bill ||
      fields.what_is_your_quarterly_electricity_bill) {
    score += 10;
  }
  // Has city/postcode
  if (fields.city || fields.postcode || fields.zip_code) score += 5;

  return Math.min(score, 100);
}

// GET - Webhook verification (Facebook calls this when registering)
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
    // Facebook expects the challenge as plain text integer response
    return new Response(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  } else {
    console.error('Webhook verification failed - mode:', mode, 'token match:', token === VERIFY_TOKEN);
    return new Response('Verification failed', { status: 403 });
  }
}

// POST - Receive lead data from Facebook
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256') || '';

    // Verify the request is actually from Facebook
    if (!verifySignature(body, signature)) {
      console.error('Invalid webhook signature - rejecting request');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const data = JSON.parse(body);

    if (data.object !== 'page') {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const supabase = getSupabase();
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    for (const entry of data.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field !== 'leadgen') continue;

        const leadgenData = change.value;
        const leadId = leadgenData.leadgen_id;
        const formId = leadgenData.form_id;
        const adId = leadgenData.ad_id;
        const pageId = leadgenData.page_id;
        const createdTime = leadgenData.created_time;

        // Fetch full lead details from Graph API
        let leadDetails = null;

        if (accessToken) {
          try {
            const fieldsParam = 'id,created_time,field_data,ad_id,ad_name,campaign_id,campaign_name,form_id,form_name';
            const fbResponse = await fetch(
              `https://graph.facebook.com/${GRAPH_API_VERSION}/${leadId}?fields=${fieldsParam}`,
              {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                },
              }
            );

            if (fbResponse.ok) {
              leadDetails = await fbResponse.json();
            } else {
              const errorText = await fbResponse.text();
              console.error('Failed to fetch lead details from Facebook:', errorText);
            }
          } catch (err) {
            console.error('Error calling Facebook Graph API:', err);
          }
        } else {
          console.error('FACEBOOK_ACCESS_TOKEN is missing - cannot fetch lead details');
        }

        // Parse field_data into a flat key-value map
        const fields: Record<string, string> = {};
        if (leadDetails?.field_data) {
          for (const field of leadDetails.field_data) {
            const value = field.values?.[0] || '';
            fields[field.name] = value;
          }
        }

        // Extract standard fields
        const fullName = fields.full_name || fields.name || 'Facebook Lead';
        const email = fields.email || null;
        const phone = fields.phone_number || fields.phone || null;

        // Extract custom form fields (common Pure Planet form questions)
        const city = fields.city || fields.suburb || null;
        const postcode = fields.postcode || fields.zip_code || fields.post_code || null;
        const propertyOwnership = fields.property_ownership ||
          fields.are_you_the_owner_of_the_property || null;
        const quarterlyBillRange = fields.quarterly_bill ||
          fields.what_is_your_quarterly_electricity_bill ||
          fields.electricity_bill || null;

        // Build custom answers for the message field
        const customAnswers: string[] = [];
        for (const [name, value] of Object.entries(fields)) {
          if (!['full_name', 'name', 'email', 'phone_number', 'phone',
                'city', 'suburb', 'postcode', 'zip_code', 'post_code',
                'property_ownership', 'are_you_the_owner_of_the_property',
                'quarterly_bill', 'what_is_your_quarterly_electricity_bill',
                'electricity_bill'].includes(name)) {
            customAnswers.push(`${name}: ${value}`);
          }
        }

        const message = customAnswers.length > 0
          ? `Custom Answers:\n${customAnswers.join('\n')}`
          : null;

        const leadScore = calculateLeadScore(fields);

        // Use real names from Graph API response, not just IDs
        const adName = leadDetails?.ad_name || (adId ? `Ad ID: ${adId}` : null);
        const campaignName = leadDetails?.campaign_name || null;
        const formName = leadDetails?.form_name || (formId ? `Form ID: ${formId}` : null);

        const leadData = {
          fb_lead_id: leadId,
          full_name: fullName,
          email,
          phone,
          message,
          ad_name: adName,
          campaign_name: campaignName,
          form_name: formName,
          status: 'new',
          lead_score: leadScore,
          source: 'facebook_ads',
          raw_data: leadDetails || leadgenData,
          created_at: createdTime ? new Date(createdTime * 1000).toISOString() : new Date().toISOString(),
          address: city,
          zip_code: postcode,
          property_ownership: propertyOwnership,
          quarterly_bill_range: quarterlyBillRange,
          fb_form_id: formId || leadDetails?.form_id || null,
          fb_page_id: pageId || null,
          fb_ad_id: adId || leadDetails?.ad_id || null,
        };

        // UPSERT - insert or update if duplicate fb_lead_id
        const { data: upsertedLead, error } = await supabase
          .from('facebook_leads')
          .upsert(leadData, { onConflict: 'fb_lead_id' })
          .select()
          .single();

        if (error) {
          console.error('Error upserting lead into Supabase:', error);
        } else {
          console.log('Lead saved to database:', upsertedLead.id);
        }
      }
    }

    // Always return 200 to Facebook to prevent retries
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Still return 200 to prevent Facebook from retrying
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
