# Lead Table Fixes - Complete Guide

## 3 Issues Fixed:

### 1. ✅ Service Display from Boolean Fields
**Problem:** Service column showed "General Inquiry" instead of actual services
**Solution:** Now reads from 3 boolean fields:
- `solar_panel` → Shows "Solar Panel"
- `battery_storage` → Shows "Battery Storage"
- `commercial_solar` → Shows "Commercial Solar"

**Display Logic:**
- If `solar_panel = true` and `battery_storage = true`: Shows "Solar Panel + Battery Storage"
- If only `solar_panel = true`: Shows "Solar Panel"
- If all false: Shows "General Inquiry"

---

### 2. ✅ Status Field Fixed
**Problem:** Status showing "N/A" because data didn't have status values
**Solution:**
- Database now has DEFAULT value of 'new' for status
- Migration script updates all existing records to have status = 'new'
- All new leads will automatically get status = 'new'

**Available Status Values:**
- `new` - Fresh lead
- `contacted` - You've reached out
- `qualified` - Potential customer
- `quoted` - Sent a quote
- `won` - Closed deal ✅
- `lost` - Didn't convert ❌

---

### 3. ✅ Lead Source Tracking
**Problem:** No way to see where leads came from
**Solution:** Added new `source` column that tracks lead origin

**New Source Column Shows:**
- **Website** - Direct form submission
- **Google Ads** - From Google advertising
- **Facebook Ads** - From Facebook advertising
- **Referral** - Word of mouth
- **Phone Call** - Called directly
- **Email** - Emailed inquiry
- **Other** - Other sources

**Where to See Source:**
- New column in the Quotation Leads table
- Shows with teal/cyan badge
- Displays next to Status column
- Included in CSV exports

---

## How to Apply These Fixes:

### Step 1: Run Migration Script
1. Go to Supabase Dashboard → SQL Editor
2. Copy content from `supabase-migration-add-fields.sql`
3. Paste and click "Run"
4. This will:
   - Add the 3 boolean service fields
   - Add the source field
   - Update existing data
   - Ensure all records have status

### Step 2: Update Your Quote Form
When users submit quotes on your website, make sure the form sends:

```javascript
{
  full_name: "John Smith",
  phone: "0412 345 678",
  email: "john@email.com",
  address: "123 Main St",

  // NEW: Boolean service fields (at least one should be true)
  solar_panel: true,
  battery_storage: false,
  commercial_solar: false,

  // NEW: Source tracking
  source: "website",  // or "google_ads", "facebook_ads", etc.

  // Other fields...
  property_type: "Residential",
  electricity_bill: 450.50,
  // ... etc
}
```

### Step 3: Test It Out
1. Refresh your admin panel
2. You should now see:
   - ✅ Services showing correctly (e.g., "Solar Panel + Battery Storage")
   - ✅ Status badges appearing (should show "New" for fresh leads)
   - ✅ Source column showing where leads came from

---

## Table Column Order (Now):

| Score | Name | Phone | Service | **Source** | Status | Date | Actions |
|-------|------|-------|---------|------------|--------|------|---------|
| 85 (Hot) | John Smith | 0412... | Solar Panel | **Website** | New | Feb 2 | 👁️ 📧 📝 |

---

## Benefits:

1. **Better Service Tracking**
   - Know exactly which services customers want
   - Can filter/search by specific service types
   - Shows multiple services (e.g., "Solar Panel + Battery Storage")

2. **Proper Status Management**
   - Never see "N/A" status again
   - Track lead progress through sales pipeline
   - Filter leads by status

3. **Source Analytics**
   - Know which marketing channels work
   - Track ROI per source
   - Optimize ad spend based on source performance

---

## Sample Data Included:

The schema includes 5 sample leads with different combinations:
- Lead 1: Solar Panel only (from Website)
- Lead 2: Battery Storage only (from Google Ads)
- Lead 3: Commercial Solar only (from Referral)
- Lead 4: Solar Panel + Battery Storage (from Facebook Ads)
- Lead 5: Solar Panel only (from Website)

All with proper status values (new, contacted, qualified, quoted)
