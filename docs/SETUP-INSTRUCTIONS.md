# 🚀 Quick Setup Instructions

## Problem: No data showing in tables

This happens because the database tables haven't been created yet. Follow these steps:

---

## Step 1: Run Database Setup Script

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Run the Script**
   - Open file: `COMPLETE-DATABASE-SETUP.sql`
   - Select ALL the content (Ctrl+A)
   - Copy it (Ctrl+C)
   - Paste into Supabase SQL Editor
   - Click **"Run"** button

4. **Check for Success**
   - You should see: "✅ Database setup complete!"
   - This creates all tables and adds sample data

---

## Step 2: Create Admin User

1. **Go to Authentication**
   - In Supabase Dashboard, click "Authentication" → "Users"
   - Click "Add user" → "Create new user"

2. **Enter Credentials**
   - Email: your-email@example.com
   - Password: YourPassword123!
   - Click "Create user"

3. **Copy the User ID**
   - After creating, you'll see the user in the list
   - Copy the UUID (looks like: a1b2c3d4-e5f6-...)

4. **Add to Admin Users Table**
   - Go back to SQL Editor
   - Run this query (replace the values):

   ```sql
   INSERT INTO admin_users (id, email, full_name, role)
   VALUES
     ('PASTE-USER-UUID-HERE', 'your-email@example.com', 'Your Name', 'admin');
   ```

---

## Step 3: Login and Check

1. **Go to Login Page**
   - Open: `http://localhost:3000/admin/login`
   - Or your deployment URL: `/admin/login`

2. **Login**
   - Use the email and password you created
   - Click "Sign In"

3. **You Should Now See:**
   - ✅ **5 Quotation Leads** with:
     - Services showing (Solar Panel, Battery Storage, etc.)
     - Status badges (New, Contacted, Qualified, Quoted)
     - Source badges (Website, Google Ads, Referral, Facebook Ads)
   - ✅ **4 Contact Inquiries** with proper data
   - ✅ **Note badges** showing count (Lead 1 has 2 notes, Lead 2 has 1 note)

---

## What the Sample Data Includes:

### Quotation Leads Table:
| Name | Service | Source | Status | Notes |
|------|---------|--------|--------|-------|
| John Smith | Solar Panel | Website | New | 2 notes |
| Sarah Johnson | Battery Storage | Google Ads | Contacted | 1 note |
| Michael Brown | Commercial Solar | Referral | Qualified | - |
| Emily Davis | Solar Panel + Battery Storage | Facebook Ads | Quoted | - |
| David Wilson | Solar Panel | Website | New | - |

### Contact Inquiries Table:
| Name | Inquiry Type | Status |
|------|--------------|--------|
| Alice Cooper | Solar Inquiry | New |
| Robert Taylor | Commercial Inquiry | Responded |
| Linda Martinez | Battery Inquiry | New |
| James Anderson | General | Resolved |

---

## How to Test Note Badges:

1. **Look at the first lead (John Smith)**
   - You should see a purple badge with "2" on the note icon

2. **Click the Eye icon (View Details)**
   - Scroll down to "Activity Timeline"
   - You should see 2 notes:
     - "Customer called back. Very interested. Follow up on Friday."
     - "Sent quote via email. Waiting for response."

3. **Look at the second lead (Sarah Johnson)**
   - You should see a purple badge with "1" on the note icon

---

## Troubleshooting:

### Still no data showing?

1. **Check browser console for errors:**
   - Press F12 to open Developer Tools
   - Click "Console" tab
   - Look for red errors
   - Share the error message if you see one

2. **Check if tables were created:**
   - In Supabase Dashboard → "Table Editor"
   - You should see: leads, contacts, admin_users, notes, email_logs, reminders

3. **Check if data was inserted:**
   - Go to "Table Editor" → "leads"
   - You should see 5 rows of data

4. **Make sure you're logged in:**
   - The tables require authentication
   - If not logged in, data won't load

### Note badges not showing?

This means notes aren't being fetched. Check:
1. The `notes` table exists
2. There are notes in the database
3. The notes have the correct `lead_id` foreign key

---

## Files Created:

- ✅ `COMPLETE-DATABASE-SETUP.sql` - All-in-one database setup
- ✅ `LEAD_TABLE_FIXES.md` - Detailed explanation of fixes
- ✅ `SETUP-INSTRUCTIONS.md` - This file

Run the SQL script and everything should work!
