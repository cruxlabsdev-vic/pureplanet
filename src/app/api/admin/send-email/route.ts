import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { generateEmailHtml } from '@/lib/email-templates';

// Initialize Supabase lazily
const getSupabase = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

const getResend = () => {
  return new Resend(process.env.RESEND_API_KEY!);
};

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  const resend = getResend();
  try {
    const body = await request.json();
    const { to, subject, body: emailBody, contactId, contactType } = body;

    // Generate tracking ID
    const trackingId = `track_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Generate HTML content
    const htmlContent = generateEmailHtml(emailBody);

    // Send email using Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Pure Planet <support@pureplanet.net.au>',
      to: [to],
      subject: subject,
      text: emailBody, // Plain text fallback
      html: htmlContent, // Rich HTML version
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send email: ' + emailError.message },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', emailData);

    // Save email log
    const emailLogData: any = {
      lead_id: contactId,
      lead_type: contactType,
      to_email: to,
      subject,
      body: emailBody,
      tracking_id: trackingId,
    };
    if (contactType === 'quote') {
      emailLogData.quote_id = contactId;
    } else if (contactType === 'contact') {
      emailLogData.contact_id = contactId;
    } else if (contactType === 'facebook') {
      emailLogData.facebook_lead_id = contactId;
    }
    await supabase.from('email_logs').insert(emailLogData);

    // Update contact status to 'contacted' only if current status is 'new'
    if (contactType === 'contact') {
      // Always update contact status to 'contacted' when email is sent
      const { error: updateError } = await supabase
        .from('contact_submissions')
        .update({ status: 'contacted' })
        .eq('id', contactId);

      if (updateError) {
        console.error('Error updating contact status:', updateError);
      }
    } else if (contactType === 'quote') {
      // Always update quote status to 'contacted'
      const { error: updateError } = await supabase
        .from('leads')
        .update({ status: 'contacted', lead_status: 'contacted' })
        .eq('id', contactId);

      if (updateError) {
        console.error('Error updating quote status:', updateError);
      }
    } else if (contactType === 'facebook') {
      const { error: updateError } = await supabase
        .from('facebook_leads')
        .update({ status: 'contacted' })
        .eq('id', contactId);

      if (updateError) {
        console.error('Error updating Facebook lead status:', updateError);
      }
    }

    // Create activity log
    const activityData: any = {
      lead_id: contactId,
      lead_type: contactType,
      action: 'email_sent',
      details: { subject, to, resend_id: emailData?.id },
    };
    if (contactType === 'quote') {
      activityData.quote_id = contactId;
    } else if (contactType === 'contact') {
      activityData.contact_id = contactId;
    } else if (contactType === 'facebook') {
      activityData.facebook_lead_id = contactId;
    }
    await supabase.from('activity_log').insert(activityData);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      trackingId,
      resendId: emailData?.id
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
