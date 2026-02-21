# 🔑 Facebook Credentials - Quick Reference

## ✅ Credentials Provided by Project Manager

Your project manager has provided the correct credentials. Here's how to use them:

---

## 📝 Environment Variables Setup

### What You Need in `.env.local`:

```env
# ============================================
# SUPABASE (Already configured)
# ============================================
NEXT_PUBLIC_SUPABASE_URL=your_existing_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_existing_key
SUPABASE_SERVICE_ROLE_KEY=your_existing_service_key

# ============================================
# FACEBOOK LEAD ADS INTEGRATION
# ============================================

# 1. VERIFY TOKEN (You create this - any random string)
FACEBOOK_VERIFY_TOKEN=pure_planet_secure_2026

# 2. APP SECRET (Get from Facebook App Dashboard)
FACEBOOK_APP_SECRET=your_app_secret_from_facebook

# 3. PAGE ACCESS TOKEN (Provided by your PM)
FACEBOOK_ACCESS_TOKEN=EAABsbCS1iHgBO... (paste the long token from PM)

# 4. FORM ID (Provided by your PM - Optional)
FACEBOOK_FORM_ID=1234567890 (paste the numeric ID from PM)
```

---

## 🎯 What Each Variable Does

### 1. **FACEBOOK_VERIFY_TOKEN**
- **What**: A security token YOU create
- **Purpose**: Facebook uses this to verify your webhook
- **How to get**: Just make up any random string
- **Example**: `pure_planet_secure_2026` or `my_secret_token_12345`
- **Important**: You'll use this same token when configuring Facebook webhook

### 2. **FACEBOOK_APP_SECRET**
- **What**: Your Facebook App's secret key
- **Purpose**: Validates that webhook requests are really from Facebook
- **How to get**: 
  1. Go to https://developers.facebook.com/apps
  2. Select your app
  3. Go to **Settings** → **Basic**
  4. Copy the **App Secret**

### 3. **FACEBOOK_ACCESS_TOKEN** ✅ (Provided by PM)
- **What**: Extended Page Access Token
- **Purpose**: Allows your app to fetch lead details from Facebook
- **How to get**: ✅ Your PM already provided this
- **Format**: Long string starting with `EAABsbCS1iHgBO...`
- **Validity**: 60 days (will need to refresh)
- **Action**: Copy the exact token from your PM's message

### 4. **FACEBOOK_FORM_ID** ✅ (Provided by PM - Optional)
- **What**: The specific lead form ID
- **Purpose**: Track which form the lead came from
- **How to get**: ✅ Your PM already provided this
- **Format**: Numeric value (e.g., `1234567890`)
- **Action**: Copy the exact number from your PM's message

---

## 📋 Step-by-Step Setup

### Step 1: Create `.env.local` File
```bash
# In your project root, create or edit .env.local
```

### Step 2: Add All Variables
```env
# Copy your existing Supabase variables (don't change these)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Add these new Facebook variables:
FACEBOOK_VERIFY_TOKEN=pure_planet_secure_2026
FACEBOOK_APP_SECRET=get_from_facebook_app_dashboard
FACEBOOK_ACCESS_TOKEN=paste_token_from_PM_here
FACEBOOK_FORM_ID=paste_form_id_from_PM_here
```

### Step 3: Get Missing Values

You still need to get:
- ✅ **FACEBOOK_VERIFY_TOKEN**: Create any random string yourself
- ❌ **FACEBOOK_APP_SECRET**: Get from Facebook App Dashboard

---

## 🔍 How to Get Facebook App Secret

1. **Go to Facebook Developers**
   - URL: https://developers.facebook.com/apps

2. **Select Your App**
   - Look for "Pure Planet CRM" or your app name
   - Click on it

3. **Navigate to Settings**
   - Left sidebar → **Settings** → **Basic**

4. **Find App Secret**
   - Look for "App Secret" field
   - Click **Show** button
   - Enter your Facebook password
   - Copy the secret key

5. **Add to `.env.local`**
   ```env
   FACEBOOK_APP_SECRET=paste_the_secret_here
   ```

---

## ✅ Verification Checklist

Before deploying, verify you have:

- [ ] `FACEBOOK_VERIFY_TOKEN` - Created by you (any random string)
- [ ] `FACEBOOK_APP_SECRET` - From Facebook App Dashboard
- [ ] `FACEBOOK_ACCESS_TOKEN` - ✅ From your PM
- [ ] `FACEBOOK_FORM_ID` - ✅ From your PM (optional)
- [ ] All Supabase variables (already configured)

---

## 🚀 After Adding Variables

1. **Save `.env.local`** file

2. **Restart your dev server** (if running locally)
   ```bash
   # Stop the server (Ctrl+C)
   # Start again
   npm run dev
   ```

3. **Deploy to production**
   ```bash
   git add .
   git commit -m "Add Facebook Lead Ads environment variables"
   git push
   ```

4. **Add to Vercel** (Important!)
   - Go to Vercel Dashboard
   - Select your project
   - Go to **Settings** → **Environment Variables**
   - Add all Facebook variables there too
   - Redeploy

---

## 🔒 Security Notes

- ✅ `.env.local` is in `.gitignore` (not committed to Git)
- ✅ Never share these tokens publicly
- ✅ The Page Access Token expires in 60 days
- ✅ You'll need to refresh it periodically

---

## 🆘 Troubleshooting

### "Webhook verification failed"
- Check that `FACEBOOK_VERIFY_TOKEN` in `.env.local` matches what you entered in Facebook App

### "Invalid signature"
- Check that `FACEBOOK_APP_SECRET` is correct
- Make sure you copied it exactly from Facebook App Dashboard

### "Unauthorized" errors
- Check that `FACEBOOK_ACCESS_TOKEN` is the extended token (60 days)
- Make sure it's the Page Access Token, not User Access Token

---

## 📞 Need Help?

If you're stuck:
1. Double-check all tokens are copied exactly (no extra spaces)
2. Verify tokens are added to both `.env.local` AND Vercel
3. Make sure you redeployed after adding Vercel environment variables

---

## ✨ Summary

**What your PM gave you:** ✅  
- Page Access Token (FACEBOOK_ACCESS_TOKEN)
- Form ID (FACEBOOK_FORM_ID)

**What you still need:** ❌  
- Create FACEBOOK_VERIFY_TOKEN yourself (any random string)
- Get FACEBOOK_APP_SECRET from Facebook App Dashboard

**Total time:** ~5 minutes to complete setup!
