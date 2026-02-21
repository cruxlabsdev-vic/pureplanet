-- ============================================
-- Migration: Add new fields to leads table
-- ============================================

-- Add new boolean service fields
ALTER TABLE leads ADD COLUMN IF NOT EXISTS solar_panel BOOLEAN DEFAULT FALSE;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS battery_storage BOOLEAN DEFAULT FALSE;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS commercial_solar BOOLEAN DEFAULT FALSE;

-- Add source field
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'website';

-- Make service_type nullable (since we're using boolean fields now)
ALTER TABLE leads ALTER COLUMN service_type DROP NOT NULL;

-- Update existing records to set boolean fields based on service_type
UPDATE leads
SET solar_panel = TRUE
WHERE service_type ILIKE '%solar panel%' OR service_type ILIKE '%solar installation%';

UPDATE leads
SET battery_storage = TRUE
WHERE service_type ILIKE '%battery%';

UPDATE leads
SET commercial_solar = TRUE
WHERE service_type ILIKE '%commercial%';

-- Update existing records to ensure they have a status
UPDATE leads
SET status = 'new'
WHERE status IS NULL;

-- Update existing records to ensure they have a source
UPDATE leads
SET source = 'website'
WHERE source IS NULL;

-- Add index for source field
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
