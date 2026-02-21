'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import Sidebar from './components/Sidebar';
import MobileSidebar from './components/MobileSidebar';
import Header from './components/Header';
import './admin-animations.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newContactsCount, setNewContactsCount] = useState(0);
  const [newQuotesCount, setNewQuotesCount] = useState(0);
  const [newFacebookLeadsCount, setNewFacebookLeadsCount] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
        return;
      }

      if (session && pathname === '/admin/login') {
        router.push('/admin/dashboard');
        return;
      }

      if (session) {
        const { data: userData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser(userData);
      }

      setLoading(false);
    };

    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/admin/login');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router, pathname]);

  // Fetch badge counts
  useEffect(() => {
    if (!user) return;

    const fetchCounts = async () => {
      // New contacts count (status = 'new')
      const { count: contactsCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      // New quotes count (status = 'new')
      const { count: quotesCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      // New Facebook leads count (status = 'new')
      const { count: facebookLeadsCount } = await supabase
        .from('facebook_leads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new');

      setNewContactsCount(contactsCount || 0);
      setNewQuotesCount(quotesCount || 0);
      setNewFacebookLeadsCount(facebookLeadsCount || 0);
    };

    fetchCounts();

    // Subscribe to real-time updates for badge counts
    const contactsChannel = supabase
      .channel('contacts_count')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contact_submissions' }, fetchCounts)
      .subscribe();

    const quotesChannel = supabase
      .channel('quotes_count')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, fetchCounts)
      .subscribe();

    const facebookLeadsChannel = supabase
      .channel('facebook_leads_count')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'facebook_leads' }, fetchCounts)
      .subscribe();

    return () => {
      supabase.removeChannel(contactsChannel);
      supabase.removeChannel(quotesChannel);
      supabase.removeChannel(facebookLeadsChannel);
    };
  }, [user, supabase]);

  // If on login page, show without layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C2F32C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          newContactsCount={newContactsCount}
          newQuotesCount={newQuotesCount}
          newFacebookLeadsCount={newFacebookLeadsCount}
        />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        newContactsCount={newContactsCount}
        newQuotesCount={newQuotesCount}
        newFacebookLeadsCount={newFacebookLeadsCount}
      />

      {/* Main Content */}
      <div className="lg:pl-60 min-h-screen overflow-x-hidden">
        {/* Header */}
        <Header
          onMenuClick={() => setMobileMenuOpen(true)}
          user={user}
        />

        {/* Page Content */}
        <main className="p-4 md:p-6 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
