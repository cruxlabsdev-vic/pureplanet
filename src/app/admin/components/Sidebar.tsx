'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  FileText,
  PenSquare,
  Plus,
  LogOut,
  Facebook,
} from 'lucide-react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Contact Inquiries',
    href: '/admin/contacts',
    icon: Users,
    badge: 0,
  },
  {
    name: 'Quotation Leads',
    href: '/admin/quotes',
    icon: FileText,
    badge: 0,
  },
  {
    name: 'Facebook Leads',
    href: '/admin/facebook-leads',
    icon: Facebook,
    badge: 0,
  },
  {
    name: 'Blogs',
    href: '/admin/blogs',
    icon: PenSquare,
  },
];

export default function Sidebar({
  newContactsCount = 0,
  newQuotesCount = 0,
  newFacebookLeadsCount = 0
}: {
  newContactsCount?: number;
  newQuotesCount?: number;
  newFacebookLeadsCount?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-[#062d16] text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="rounded-lg p-3">
          <Image
            src="/Pure planet Logo/logo.webp"
            alt="Pure Planet"
            width={140}
            height={45}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Create New Button */}
      <div className="p-4">
        <Link
          href="/admin/blogs/new"
          className="flex items-center justify-center gap-2 w-full py-3 px-4
                   bg-[#C2F32C] text-[#062d16] font-semibold rounded-xl
                   hover:bg-[#d4ff4d] transition-all duration-200
                   transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={20} />
          Create New
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          // Update badge counts
          let badgeCount = 0;
          if (item.name === 'Contact Inquiries') badgeCount = newContactsCount;
          if (item.name === 'Quotation Leads') badgeCount = newQuotesCount;
          if (item.name === 'Facebook Leads') badgeCount = newFacebookLeadsCount;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl
                        transition-all duration-200 group
                        ${isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={isActive ? 'text-[#C2F32C]' : ''} />
                <span className="font-medium">{item.name}</span>
              </div>

              {badgeCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-[#C2F32C]
                              text-[#062d16] rounded-full animate-pulse">
                  {badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
                   text-white/70 hover:bg-white/10 hover:text-white
                   transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
