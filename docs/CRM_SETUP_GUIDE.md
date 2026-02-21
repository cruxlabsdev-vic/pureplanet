# Pure Planet CRM Admin Panel - Setup Guide

## 🎉 Phase 1: Foundation - COMPLETE!

The foundation of your CRM admin panel has been implemented with:

✅ **Authentication System**
- Split-screen login page with beautiful design
- Supabase authentication integration
- Session management
- Protected routes

✅ **Admin Layout**
- Responsive sidebar navigation (desktop & mobile)
- Header with notification bell
- Real-time badge counts for new leads
- Mobile hamburger menu

✅ **Dashboard Page**
- Stats cards with animations
- Pie chart for lead status distribution
- Line chart for leads over time (7 days)
- Conversion rate progress bar
- Real-time data from Supabase

✅ **Database Schema**
- Complete SQL schema in `database/crm-schema.sql`
- All tables, triggers, and functions defined

✅ **CSS Animations**
- Smooth fade-in, slide-in, scale-in animations
- Shake animation for errors
- Pulse animation for badges
- Count-up animation for numbers

---

## 🚀 Setup Instructions

### 1. Database Setup (Supabase)

1. **Go to your Supabase Dashboard** → SQL Editor

2. **Run the schema file**:
   - Open `database/crm-schema.sql`
   - Copy and paste the entire contents into Supabase SQL Editor
   - Click "Run" to execute

3. **Create your first admin user**:
   ```sql
   -- First, create the user in Supabase Auth Dashboard
   -- Then run this query:
   INSERT INTO admin_users (id, email, full_name, role)
   VALUES (
     'YOUR_AUTH_USER_ID_HERE',  -- Get this from Supabase Auth Users table
     'admin@pureplanet.net.au',
     'Admin User',
     'super_admin'
   );
   ```

4. **Enable Realtime** (for live updates):
   - In Supabase Dashboard → Database → Replication
   - Enable replication for these tables:
     - `contact_submissions`
     - `leads`
     - `admin_notifications`

### 2. Environment Variables

Make sure your `.env.local` has the Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Images Required

Add these images to your project:

1. **Login background image**:
   - Path: `/public/images/admin/login-bg.jpg`
   - Recommended: Melbourne rooftop with solar panels
   - Dimensions: 1920x1080px or higher

2. **White logo** (if you don't have one):
   - Path: `/public/Pure planet Logo/logo-white.png`
   - White version of your logo for the dark sidebar

3. **Notification sound** (optional):
   - Path: `/public/sounds/notification.mp3`
   - A subtle notification sound (2-3 seconds)

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Access the Admin Panel

Navigate to: **http://localhost:3000/admin/login**

---

## 📍 Current File Structure

```
src/app/admin/
├── login/
│   └── page.tsx                    ✅ Split-screen login
├── dashboard/
│   └── page.tsx                    ✅ Dashboard with stats & charts
├── contacts/
│   └── page.tsx                    ⏳ Placeholder (Phase 2)
├── quotes/
│   └── page.tsx                    ⏳ Placeholder (Phase 2)
├── blogs/
│   └── page.tsx                    ⏳ Placeholder (Future)
├── components/
│   ├── Sidebar.tsx                 ✅ Desktop sidebar navigation
│   ├── MobileSidebar.tsx           ✅ Mobile slide-in sidebar
│   └── Header.tsx                  ✅ Header with notifications
├── layout.tsx                      ✅ Admin layout wrapper
└── admin-animations.css            ✅ Smooth animations

database/
└── crm-schema.sql                  ✅ Complete database schema
```

---

## 🎨 Design System

### Colors
- **Primary Dark**: `#062d16` (Deep green)
- **Primary Accent**: `#C2F32C` (Lime green)
- **Status Colors**:
  - New: `#F59E0B` (Orange)
  - Contacted: `#10B981` (Green)
  - Qualified: `#3B82F6` (Blue)
  - Quoted: `#8B5CF6` (Purple)
  - Won: `#22C55E` (Bright Green)
  - Lost: `#EF4444` (Red)

### Typography
- **Font**: Plus Jakarta Sans (Google Fonts - auto-imported)

### Icons
- **Library**: Lucide React (already installed)

---

## 📋 What's Next? - Phase 2 Implementation

The next phase will include:

### Phase 2: Core Tables
1. **Contact Inquiries Table**
   - Real-time table with search & filters
   - Status badges
   - Action buttons (View, Email, Note, Delete)
   - Mobile card view
   - Export to CSV

2. **Quotation Leads Table**
   - Lead score indicators (Hot/Warm/Standard)
   - Priority auto-sorting
   - All features from contacts table
   - Additional quote-specific fields

3. **Modals**
   - View modal with timeline
   - Delete confirmation modal
   - Send email modal with templates
   - Add note modal
   - Set reminder modal

### Phase 3: Communication
- Email system with Resend
- Email templates
- Email open tracking
- Auto-update status after email

### Phase 4: Advanced Features
- Complete notification system
- Activity log
- Follow-up reminders
- Notes system

### Phase 5: Polish
- Full responsive design
- Export functionality
- Advanced animations
- Testing & optimization

---

## 🔧 Troubleshooting

### Issue: Can't login
- **Solution**: Make sure you've created the `admin_users` table and inserted your user record
- Check that the user ID matches your Supabase Auth user ID

### Issue: Dashboard shows 0 for all stats
- **Solution**: The dashboard queries `contact_submissions` and `leads` tables
- Make sure these tables exist and have data

### Issue: Sidebar logo not showing
- **Solution**: Make sure the logo path is correct: `/Pure planet Logo/logo-white.png`
- Create a white version of your logo if needed

### Issue: Animations not working
- **Solution**: Make sure `admin-animations.css` is imported in `layout.tsx`
- Clear browser cache and refresh

---

## 🎯 Testing Checklist

- [ ] Can access login page at `/admin/login`
- [ ] Can log in with valid credentials
- [ ] Dashboard displays correctly with stats
- [ ] Sidebar navigation works
- [ ] Mobile menu opens/closes properly
- [ ] Notification bell appears in header
- [ ] Charts render correctly (Recharts)
- [ ] Animations are smooth
- [ ] Logout redirects to login page

---

## 🚨 Important Notes

1. **Browser Notifications**: Users will be prompted to allow notifications for real-time alerts

2. **Real-time Updates**: Badge counts update automatically when new leads arrive

3. **Session Management**: Sessions are handled by Supabase Auth

4. **Logo Requirements**: You need both regular and white versions of your logo

5. **Database Triggers**: The SQL schema includes triggers for automatic notifications

---

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify Supabase connection in Network tab
3. Ensure all environment variables are set
4. Check that database schema was executed successfully

---

**Built with**: Next.js 13+, TypeScript, Tailwind CSS, Supabase, Recharts, Lucide React

**Design Philosophy**: Sleek, minimal, professional - every element has purpose

---

## 🎨 Preview

Your CRM admin panel features:
- Beautiful split-screen login with solar imagery
- Dark green sidebar with lime accents
- Real-time notifications with sound alerts
- Animated charts and statistics
- Responsive design for all devices
- Smooth transitions and micro-interactions

**Ready to move to Phase 2?** Let me know when you're ready to implement the complete Contact Inquiries and Quotation Leads tables with all their features!
