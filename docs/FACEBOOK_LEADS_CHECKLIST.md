# ✅ Facebook Lead Ads - Quick Start Checklist

## 🎯 Follow these steps in order:

### ☐ Step 1: Database Setup (5 minutes)
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Open file: `database/facebook-leads-table.sql`
4. Copy entire contents
5. Paste in SQL Editor
6. Click "Run"
7. ✅ Verify table created successfully

---

### ☐ Step 2: Environment Variables (5 minutes)
1. Open `.env.local` file (create if doesn't exist)
2. Add these variables:

```env
# Facebook Configuration
FACEBOOK_VERIFY_TOKEN=my_secure_token_12345
FACEBOOK_APP_SECRET=get_from_facebook_app_dashboard
FACEBOOK_ACCESS_TOKEN=get_from_facebook_app_dashboard

# Supabase (if not already added)
SUPABASE_SERVICE_ROLE_KEY=get_from_supabase_dashboard
```

3. Replace placeholder values with real ones
4. Save file
5. ✅ Environment variables configured

**Where to get values:**
- `FACEBOOK_VERIFY_TOKEN`: Create any random string (e.g., `pure_planet_fb_2026`)
- `FACEBOOK_APP_SECRET`: Facebook App → Settings → Basic
- `FACEBOOK_ACCESS_TOKEN`: Facebook App → Tools → Access Token Tool
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase → Settings → API

---

### ☐ Step 3: Deploy Application (5 minutes)
1. Open terminal in project folder
2. Run these commands:

```bash
git add .
git commit -m "Add Facebook Lead Ads integration"
git push
```

3. Wait for Vercel deployment to complete
4. Copy your production URL (e.g., `https://pure-planet.vercel.app`)
5. ✅ Application deployed

---

### ☐ Step 4: Facebook App Setup (10 minutes)

#### A. Create Facebook App (if needed)
1. Go to https://developers.facebook.com/
2. Click "My Apps" → "Create App"
3. Choose "Business" type
4. Fill in app name and details
5. Click "Create App"

#### B. Add Webhooks
1. In Facebook App Dashboard, click "Add Product"
2. Find "Webhooks" → Click "Set Up"
3. Click "Page" subscription
4. Click "Add Callback URL"
5. Enter:
   - **Callback URL**: `https://your-domain.com/api/facebook-webhook`
   - **Verify Token**: Same as your `FACEBOOK_VERIFY_TOKEN`
6. Click "Verify and Save"
7. ✅ Should see "Complete" status

#### C. Subscribe to Lead Events
1. Find "leadgen" in the subscription fields
2. Click "Subscribe"
3. ✅ Webhook configured

---

### ☐ Step 5: Create Test Lead Ad (15 minutes)
1. Go to https://business.facebook.com/adsmanager
2. Click "Create" → Choose "Leads" objective
3. Set up campaign details
4. Create ad with "Instant Form"
5. Add form fields:
   - Full Name
   - Email
   - Phone Number
   - Message (optional)
6. Publish ad
7. ✅ Lead Ad created

---

### ☐ Step 6: Test Integration (5 minutes)

#### Option A: Facebook Test Tool
1. Go to Facebook App → Webhooks
2. Find "leadgen" subscription
3. Click "Test"
4. Check CRM dashboard for test lead

#### Option B: Real Test
1. Find your Lead Ad on Facebook
2. Click and fill out the form
3. Submit
4. Go to `/admin/facebook-leads` in your CRM
5. ✅ Lead should appear instantly!

---

### ☐ Step 7: Verify Everything Works
- [ ] Lead appears in `/admin/facebook-leads`
- [ ] Lead count badge shows in sidebar
- [ ] Can view lead details
- [ ] Can update lead status
- [ ] Can export to CSV
- [ ] Browser notification appears (if enabled)

---

## 🎉 You're Done!

Your Facebook Lead Ads integration is now live and working!

### What Happens Now:
- ✅ Every Facebook lead is automatically captured
- ✅ Leads appear in CRM dashboard instantly
- ✅ You get notified of new leads
- ✅ You can manage leads from the dashboard
- ✅ Zero manual work required!

---

## 🐛 Troubleshooting

### Webhook verification failed?
- Check that `FACEBOOK_VERIFY_TOKEN` matches in both `.env.local` and Facebook App
- Ensure app is deployed and URL is accessible
- Try with `https://` (not `http://`)

### Leads not appearing?
- Check Supabase logs for errors
- Verify `facebook_leads` table exists
- Check Facebook App → Webhooks → Recent Deliveries

### Need help?
- Read: `FACEBOOK_LEADS_SETUP.md` (detailed guide)
- Read: `FACEBOOK_LEADS_IMPLEMENTATION.md` (technical details)

---

## 📚 Documentation Files

1. **FACEBOOK_LEADS_CHECKLIST.md** ← You are here
2. **FACEBOOK_LEADS_SETUP.md** - Detailed setup guide
3. **FACEBOOK_LEADS_IMPLEMENTATION.md** - Technical documentation
4. **.env.example** - Environment variables template

---

**Total Setup Time**: ~45 minutes
**Difficulty**: Easy
**Result**: Fully automated lead capture! 🚀
