# 🎯 Facebook Lead Ads Integration - Complete Setup Guide

## ✅ What Has Been Implemented

All the necessary files have been created for Facebook Lead Ads webhook integration:

### 📁 New Files Created:
1. **Database Migration**: `database/facebook-leads-table.sql`
2. **Webhook API**: `src/app/api/facebook-webhook/route.ts`
3. **Lead Fetcher API**: `src/app/api/facebook-webhook/fetch-lead/route.ts`
4. **CRM Page**: `src/app/admin/facebook-leads/page.tsx`

### 🔧 Modified Files:
1. **Admin Layout**: Added Facebook leads count tracking
2. **Sidebar**: Added "Facebook Leads" menu item with badge
3. **Mobile Sidebar**: Added Facebook leads support

---

## 📋 Setup Steps

### Step 1: Run Database Migration

1. Open your **Supabase Dashboard**
2. Go to **SQL Editor**
3. Copy and paste the contents of `database/facebook-leads-table.sql`
4. Click **Run** to create the `facebook_leads` table

---

### Step 2: Add Environment Variables

Add these variables to your `.env.local` file:

```env
# Facebook Lead Ads Configuration
FACEBOOK_VERIFY_TOKEN=your_custom_verify_token_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here
FACEBOOK_ACCESS_TOKEN=your_facebook_page_access_token_here

# Supabase Service Role Key (if not already added)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

**How to get these values:**

- **FACEBOOK_VERIFY_TOKEN**: Create any random string (e.g., `my_secure_token_12345`)
- **FACEBOOK_APP_SECRET**: Get from Facebook App Dashboard → Settings → Basic
- **FACEBOOK_ACCESS_TOKEN**: Get from Facebook App Dashboard → Tools → Access Token Tool
- **SUPABASE_SERVICE_ROLE_KEY**: Get from Supabase Dashboard → Settings → API

---

### Step 3: Deploy Your Application

Deploy your application to Vercel (or your hosting platform):

```bash
git add .
git commit -m "Add Facebook Lead Ads integration"
git push
```

After deployment, your webhook URL will be:
```
https://your-domain.com/api/facebook-webhook
```

---

### Step 4: Configure Facebook Lead Ads

#### A. Create a Facebook App (if you don't have one)

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** → **Create App**
3. Choose **Business** type
4. Fill in app details and create

#### B. Add Webhooks Product

1. In your Facebook App Dashboard, go to **Add Product**
2. Find **Webhooks** and click **Set Up**
3. Click **Page** subscription
4. Click **Add Callback URL**:
   - **Callback URL**: `https://your-domain.com/api/facebook-webhook`
   - **Verify Token**: The same token you set in `FACEBOOK_VERIFY_TOKEN`
5. Click **Verify and Save**

#### C. Subscribe to Lead Events

1. After verification, find **leadgen** in the subscription fields
2. Click **Subscribe** to enable lead generation webhooks

#### D. Create a Lead Ad

1. Go to [Facebook Ads Manager](https://business.facebook.com/adsmanager)
2. Click **Create** → Choose **Leads** objective
3. Create your ad campaign
4. In the ad form, create an **Instant Form**
5. Add fields like Name, Email, Phone, etc.
6. Publish your ad

---

### Step 5: Test the Integration

#### Option 1: Use Facebook's Test Tool

1. Go to your Facebook App Dashboard
2. Navigate to **Webhooks** → **Page**
3. Click **Test** next to the `leadgen` subscription
4. Facebook will send a test lead to your webhook

#### Option 2: Submit a Real Test Lead

1. Find your published Lead Ad on Facebook
2. Click on it and fill out the form
3. Submit the form
4. Check your CRM dashboard at `/admin/facebook-leads`

---

## 🎨 How It Works

### Real-time Flow:

1. **User submits Lead Ad on Facebook** → 
2. **Facebook sends webhook to your API** (`/api/facebook-webhook`) →
3. **Lead is saved to `facebook_leads` table** →
4. **CRM dashboard updates in real-time** →
5. **Admin receives browser notification** (if enabled)

### Lead Data Captured:

- Full Name
- Email
- Phone
- Message/Comments
- Ad Name
- Campaign Name
- Form Name
- Lead Score (auto-assigned)
- Status (new, contacted, qualified, quoted, won, lost)

---

## 📊 Using the CRM Dashboard

### View Facebook Leads:

1. Login to admin panel: `/admin/login`
2. Click **Facebook Leads** in the sidebar
3. You'll see all leads from Facebook with:
   - Lead details
   - Lead score badge
   - Status dropdown
   - Action buttons (View, Email, Delete)

### Features Available:

- ✅ **Real-time updates** - New leads appear instantly
- ✅ **Search & Filter** - By name, email, phone, or status
- ✅ **Export to CSV** - Download all leads
- ✅ **Status Management** - Update lead status
- ✅ **Lead Scoring** - Visual badges for lead quality
- ✅ **Browser Notifications** - Get notified of new leads

---

## 🔧 Advanced: Fetching Full Lead Details

Facebook webhooks only send the lead ID initially. To get full contact details:

### Manual Fetch:

You can call the fetch-lead API endpoint:

```bash
POST /api/facebook-webhook/fetch-lead
Content-Type: application/json

{
  "leadId": "123456789"
}
```

This will fetch the complete lead data from Facebook Graph API and update your database.

### Automatic Fetch (Optional):

You can modify `/api/facebook-webhook/route.ts` to automatically fetch full details when a new lead arrives. Add this after line 54:

```typescript
// Fetch full lead details immediately
const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/facebook-webhook/fetch-lead`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ leadId })
});
```

---

## 🐛 Troubleshooting

### Webhook not receiving leads:

1. Check that your `FACEBOOK_VERIFY_TOKEN` matches in both `.env.local` and Facebook App
2. Ensure your app is deployed and the webhook URL is accessible
3. Check Facebook App Dashboard → Webhooks → Recent Deliveries for errors

### Leads not showing in CRM:

1. Check browser console for errors
2. Verify the `facebook_leads` table exists in Supabase
3. Check Supabase logs for any database errors

### "Invalid signature" error:

1. Ensure `FACEBOOK_APP_SECRET` is correct in `.env.local`
2. Redeploy your application after adding environment variables

---

## 🎉 You're All Set!

Your Facebook Lead Ads integration is now complete! Leads will automatically flow from Facebook to your CRM dashboard in real-time.

### Next Steps:

- Set up email notifications for new leads
- Create automated follow-up workflows
- Integrate with other marketing tools
- Analyze lead conversion rates

---

## 📞 Support

If you encounter any issues:
1. Check the console logs in your browser
2. Check Vercel deployment logs
3. Check Supabase database logs
4. Review Facebook App webhook delivery logs
