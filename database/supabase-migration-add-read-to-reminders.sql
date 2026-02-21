-- Add is_read column to follow_up_reminders
ALTER TABLE follow_up_reminders 
ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;
