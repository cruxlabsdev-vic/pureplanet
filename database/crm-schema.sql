-- =====================================================
-- PURE PLANET CRM - DATABASE SCHEMA (FINAL)
-- =====================================================

-- ADMIN USERS
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'super_admin',
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NOTES (Renamed from lead_notes)
CREATE TABLE IF NOT EXISTS notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL,
  lead_type VARCHAR(20) NOT NULL,
  quote_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contact_submissions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EMAIL LOGS
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL,
  lead_type VARCHAR(20) NOT NULL,
  quote_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contact_submissions(id) ON DELETE CASCADE,
  to_email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,
  tracking_id VARCHAR(100) UNIQUE,
  sent_by UUID REFERENCES admin_users(id),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- REMINDERS
CREATE TABLE IF NOT EXISTS follow_up_reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL,
  lead_type VARCHAR(20) NOT NULL,
  quote_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contact_submissions(id) ON DELETE CASCADE,
  remind_at TIMESTAMP WITH TIME ZONE NOT NULL,
  message TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ACTIVITY LOG
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL,
  lead_type VARCHAR(20) NOT NULL,
  quote_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contact_submissions(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  details JSONB,
  performed_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
