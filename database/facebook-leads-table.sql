-- ============================================
-- FACEBOOK LEADS TABLE FOR PURE PLANET CRM
-- Run this in Supabase SQL Editor
-- ============================================

-- Facebook Leads Table
CREATE TABLE IF NOT EXISTS facebook_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fb_lead_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  message TEXT,
  ad_name TEXT,
  campaign_name TEXT,
  form_name TEXT,
  status TEXT DEFAULT 'new',
  lead_score INTEGER DEFAULT 50,
  source TEXT DEFAULT 'facebook_ads',
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_facebook_leads_status ON facebook_leads(status);
CREATE INDEX IF NOT EXISTS idx_facebook_leads_created_at ON facebook_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_facebook_leads_fb_lead_id ON facebook_leads(fb_lead_id);

-- Enable Row Level Security
ALTER TABLE facebook_leads ENABLE ROW LEVEL SECURITY;

-- RLS Policy - Allow all for authenticated users
DROP POLICY IF EXISTS "Allow all for facebook_leads" ON facebook_leads;
CREATE POLICY "Allow all for facebook_leads" ON facebook_leads 
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Allow anonymous insert for webhook (Facebook will POST to your API)
DROP POLICY IF EXISTS "Allow insert for facebook_leads" ON facebook_leads;
CREATE POLICY "Allow insert for facebook_leads" ON facebook_leads 
  FOR INSERT TO anon WITH CHECK (true);

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Facebook Leads table created successfully!';
  RAISE NOTICE '✅ Indexes created for better performance';
  RAISE NOTICE '✅ Row Level Security enabled';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Add FACEBOOK_VERIFY_TOKEN and FACEBOOK_APP_SECRET to your .env.local';
  RAISE NOTICE '2. Deploy the webhook endpoint';
  RAISE NOTICE '3. Configure Facebook Lead Ads webhook';
END $$;
