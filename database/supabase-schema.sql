-- ============================================
-- Pure Planet CRM Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'quoted', 'won', 'lost')),
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
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'responded', 'resolved', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. ADMIN USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
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
  created_by UUID REFERENCES admin_users(id),
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
  sent_by UUID REFERENCES admin_users(id)
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
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR BETTER PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_lead_score ON leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_lead_id ON notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_notes_contact_id ON notes(contact_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_lead_id ON email_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_reminders_remind_at ON reminders(remind_at);

-- ============================================
-- SAMPLE DATA FOR TESTING
-- ============================================

-- Sample Quotation Leads
INSERT INTO leads (full_name, phone, email, address, solar_panel, battery_storage, commercial_solar, property_type, roof_type, electricity_bill, solar_interest, battery_interest, timeline, reference_number, lead_score, status, source)
VALUES
  ('John Smith', '0412 345 678', 'john.smith@email.com', '123 Solar St, Melbourne VIC 3000', true, false, false, 'Residential', 'Tile', 450.50, 'Very interested', true, 'Within 3 months', 'QT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-001', 85, 'new', 'website'),
  ('Sarah Johnson', '0423 456 789', 'sarah.j@email.com', '456 Green Ave, Richmond VIC 3121', false, true, false, 'Residential', 'Colorbond', 380.00, 'Interested', true, 'Within 6 months', 'QT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-002', 72, 'contacted', 'google_ads'),
  ('Michael Brown', '0434 567 890', 'mbrown@business.com.au', '789 Commercial Rd, South Yarra VIC 3141', false, false, true, 'Commercial', 'Metal', 1250.75, 'Very interested', true, 'ASAP', 'QT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-003', 95, 'qualified', 'referral'),
  ('Emily Davis', '0445 678 901', 'emily.davis@gmail.com', '321 Sunset Blvd, St Kilda VIC 3182', true, true, false, 'Residential', 'Tile', 520.00, 'Interested', true, 'Within 1 year', 'QT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-004', 45, 'quoted', 'facebook_ads'),
  ('David Wilson', '0456 789 012', 'dwilson@email.com', '654 Park Lane, Carlton VIC 3053', true, false, false, 'Residential', 'Slate', 410.25, 'Somewhat interested', false, 'Just researching', 'QT-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-005', 28, 'new', 'website')
ON CONFLICT (reference_number) DO NOTHING;

-- Sample Contact Inquiries
INSERT INTO contacts (full_name, email, phone, subject, message, status)
VALUES
  ('Alice Cooper', 'alice.cooper@email.com', '0467 890 123', 'Question about solar panels', 'Hi, I would like to know more about your solar panel options for residential properties.', 'new'),
  ('Robert Taylor', 'rtaylor@company.com', '0478 901 234', 'Commercial installation inquiry', 'We are looking to install solar for our warehouse. Can you provide a quote?', 'responded'),
  ('Linda Martinez', 'linda.m@email.com', '0489 012 345', 'Battery system information', 'Interested in learning about battery storage systems and pricing.', 'new'),
  ('James Anderson', 'james.anderson@email.com', '0490 123 456', 'Warranty inquiry', 'What warranty do you offer on solar panel installations?', 'resolved')
ON CONFLICT DO NOTHING;

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
-- RLS POLICIES (Allow authenticated users to access everything)
-- ============================================

-- Leads policies
DROP POLICY IF EXISTS "Allow authenticated users to view leads" ON leads;
CREATE POLICY "Allow authenticated users to view leads" ON leads FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert leads" ON leads;
CREATE POLICY "Allow authenticated users to insert leads" ON leads FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update leads" ON leads;
CREATE POLICY "Allow authenticated users to update leads" ON leads FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to delete leads" ON leads;
CREATE POLICY "Allow authenticated users to delete leads" ON leads FOR DELETE TO authenticated USING (true);

-- Contacts policies
DROP POLICY IF EXISTS "Allow authenticated users to view contacts" ON contacts;
CREATE POLICY "Allow authenticated users to view contacts" ON contacts FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert contacts" ON contacts;
CREATE POLICY "Allow authenticated users to insert contacts" ON contacts FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update contacts" ON contacts;
CREATE POLICY "Allow authenticated users to update contacts" ON contacts FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to delete contacts" ON contacts;
CREATE POLICY "Allow authenticated users to delete contacts" ON contacts FOR DELETE TO authenticated USING (true);

-- Admin users policies
DROP POLICY IF EXISTS "Allow authenticated users to view admin users" ON admin_users;
CREATE POLICY "Allow authenticated users to view admin users" ON admin_users FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to update admin users" ON admin_users;
CREATE POLICY "Allow authenticated users to update admin users" ON admin_users FOR UPDATE TO authenticated USING (true);

-- Notes policies
DROP POLICY IF EXISTS "Allow authenticated users full access to notes" ON notes;
CREATE POLICY "Allow authenticated users full access to notes" ON notes FOR ALL TO authenticated USING (true);

-- Email logs policies
DROP POLICY IF EXISTS "Allow authenticated users full access to email logs" ON email_logs;
CREATE POLICY "Allow authenticated users full access to email logs" ON email_logs FOR ALL TO authenticated USING (true);

-- Reminders policies
DROP POLICY IF EXISTS "Allow authenticated users full access to reminders" ON reminders;
CREATE POLICY "Allow authenticated users full access to reminders" ON reminders FOR ALL TO authenticated USING (true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
