-- ============================================
-- COMPLETE DATABASE SETUP FOR PURE PLANET CRM
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (BE CAREFUL - THIS DELETES DATA!)
-- Comment out these lines if you want to keep existing data
-- DROP TABLE IF EXISTS reminders CASCADE;
-- DROP TABLE IF EXISTS email_logs CASCADE;
-- DROP TABLE IF EXISTS notes CASCADE;
-- DROP TABLE IF EXISTS contacts CASCADE;
-- DROP TABLE IF EXISTS leads CASCADE;
-- DROP TABLE IF EXISTS admin_users CASCADE;

-- ============================================
-- 1. LEADS TABLE (Quotation Leads)
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  service_type TEXT,
  solar_panel BOOLEAN DEFAULT FALSE,
  battery_storage BOOLEAN DEFAULT FALSE,
  commercial_solar BOOLEAN DEFAULT FALSE,
  property_type TEXT,
  roof_type TEXT,
  electricity_bill NUMERIC,
  solar_interest TEXT,
  battery_interest BOOLEAN,
  timeline TEXT,
  other_message TEXT,
  reference_number TEXT UNIQUE NOT NULL,
  lead_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'new',
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. CONTACTS TABLE (Contact Inquiries)
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  inquiry_type TEXT DEFAULT 'General',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. ADMIN USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. NOTES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. EMAIL LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  opened BOOLEAN DEFAULT FALSE,
  opened_count INTEGER DEFAULT 0,
  last_opened TIMESTAMPTZ,
  sent_by UUID
);

-- ============================================
-- 6. REMINDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  remind_at TIMESTAMPTZ NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR BETTER PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_lead_id ON notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_notes_contact_id ON notes(contact_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_lead_id ON email_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_reminders_remind_at ON reminders(remind_at);

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - Allow all authenticated users
-- ============================================

-- Leads policies
DROP POLICY IF EXISTS "Allow all for leads" ON leads;
CREATE POLICY "Allow all for leads" ON leads FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Contacts policies
DROP POLICY IF EXISTS "Allow all for contacts" ON contacts;
CREATE POLICY "Allow all for contacts" ON contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Admin users policies
DROP POLICY IF EXISTS "Allow all for admin_users" ON admin_users;
CREATE POLICY "Allow all for admin_users" ON admin_users FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Notes policies
DROP POLICY IF EXISTS "Allow all for notes" ON notes;
CREATE POLICY "Allow all for notes" ON notes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Email logs policies
DROP POLICY IF EXISTS "Allow all for email_logs" ON email_logs;
CREATE POLICY "Allow all for email_logs" ON email_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Reminders policies
DROP POLICY IF EXISTS "Allow all for reminders" ON reminders;
CREATE POLICY "Allow all for reminders" ON reminders FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================
-- SAMPLE DATA
-- ============================================

-- Sample Quotation Leads (with all new fields)
INSERT INTO leads (full_name, phone, email, address, solar_panel, battery_storage, commercial_solar, property_type, roof_type, electricity_bill, solar_interest, battery_interest, timeline, reference_number, lead_score, status, source)
VALUES
  ('John Smith', '0412 345 678', 'john.smith@email.com', '123 Solar St, Melbourne VIC 3000', true, false, false, 'Residential', 'Tile', 450.50, 'Very interested', true, 'Within 3 months', 'QT-20260202-001', 85, 'new', 'website'),
  ('Sarah Johnson', '0423 456 789', 'sarah.j@email.com', '456 Green Ave, Richmond VIC 3121', false, true, false, 'Residential', 'Colorbond', 380.00, 'Interested', true, 'Within 6 months', 'QT-20260202-002', 72, 'contacted', 'google_ads'),
  ('Michael Brown', '0434 567 890', 'mbrown@business.com.au', '789 Commercial Rd, South Yarra VIC 3141', false, false, true, 'Commercial', 'Metal', 1250.75, 'Very interested', true, 'ASAP', 'QT-20260202-003', 95, 'qualified', 'referral'),
  ('Emily Davis', '0445 678 901', 'emily.davis@gmail.com', '321 Sunset Blvd, St Kilda VIC 3182', true, true, false, 'Residential', 'Tile', 520.00, 'Interested', true, 'Within 1 year', 'QT-20260202-004', 45, 'quoted', 'facebook_ads'),
  ('David Wilson', '0456 789 012', 'dwilson@email.com', '654 Park Lane, Carlton VIC 3053', true, false, false, 'Residential', 'Slate', 410.25, 'Somewhat interested', false, 'Just researching', 'QT-20260202-005', 28, 'new', 'website')
ON CONFLICT (reference_number) DO NOTHING;

-- Sample Contact Inquiries
INSERT INTO contacts (full_name, email, phone, subject, message, inquiry_type, status)
VALUES
  ('Alice Cooper', 'alice.cooper@email.com', '0467 890 123', 'Question about solar panels', 'Hi, I would like to know more about your solar panel options for residential properties.', 'Solar Inquiry', 'new'),
  ('Robert Taylor', 'rtaylor@company.com', '0478 901 234', 'Commercial installation inquiry', 'We are looking to install solar for our warehouse. Can you provide a quote?', 'Commercial Inquiry', 'responded'),
  ('Linda Martinez', 'linda.m@email.com', '0489 012 345', 'Battery system information', 'Interested in learning about battery storage systems and pricing.', 'Battery Inquiry', 'new'),
  ('James Anderson', 'james.anderson@email.com', '0490 123 456', 'Warranty inquiry', 'What warranty do you offer on solar panel installations?', 'General', 'resolved')
ON CONFLICT DO NOTHING;

-- Sample Notes for the first lead
INSERT INTO notes (lead_id, content, created_at)
SELECT id, 'Customer called back. Very interested. Follow up on Friday.', NOW() - INTERVAL '2 hours'
FROM leads WHERE reference_number = 'QT-20260202-001'
ON CONFLICT DO NOTHING;

INSERT INTO notes (lead_id, content, created_at)
SELECT id, 'Sent quote via email. Waiting for response.', NOW() - INTERVAL '1 day'
FROM leads WHERE reference_number = 'QT-20260202-001'
ON CONFLICT DO NOTHING;

-- Sample Notes for the second lead
INSERT INTO notes (lead_id, content, created_at)
SELECT id, 'Customer wants to schedule site inspection next week.', NOW() - INTERVAL '3 hours'
FROM leads WHERE reference_number = 'QT-20260202-002'
ON CONFLICT DO NOTHING;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Database setup complete!';
  RAISE NOTICE '✅ Tables created: leads, contacts, admin_users, notes, email_logs, reminders';
  RAISE NOTICE '✅ Sample data inserted: 5 leads, 4 contacts, 3 notes';
  RAISE NOTICE '✅ Row Level Security enabled';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Create your admin user in Authentication > Users';
  RAISE NOTICE '2. Login at /admin/login';
  RAISE NOTICE '3. Check the tables - you should see data now!';
END $$;
