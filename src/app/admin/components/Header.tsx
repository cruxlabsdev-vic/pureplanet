'use client';

import { useState, useEffect } from 'react';
import { Bell, Menu } from 'lucide-react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { format } from 'date-fns';

interface Notification {
  id: string;
  type: 'new_contact' | 'new_quote' | 'new_facebook_lead' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  link?: string;
}

export default function Header({
  onMenuClick,
  user
}: {
  onMenuClick: () => void;
  user: any;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      // Fetch regular notifications
      const { data: notificationData } = await supabase
        .from('admin_notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      // Fetch due/overdue reminders
      const { data: reminderData } = await supabase
        .from('follow_up_reminders')
        .select(`
          id,
          remind_at,
          message,
          is_completed:completed,
          is_read,
          created_at,
          lead_id,
          lead_type,
          leads!follow_up_reminders_quote_id_fkey(full_name),
          contact_submissions!follow_up_reminders_contact_id_fkey(full_name)
        `)
        .eq('completed', false)
        .lte('remind_at', new Date().toISOString())
        .order('remind_at', { ascending: false });

      // Convert reminders to notification format
      const reminderNotifications: Notification[] = (reminderData || []).map((reminder: any) => {
        const leadName = reminder.leads?.full_name || reminder.contact_submissions?.full_name || 'Unknown';
        return {
          id: `reminder_${reminder.id}`,
          type: 'reminder' as const,
          title: `⏰ Reminder Due: ${leadName}`,
          message: reminder.message || 'Follow-up reminder is due',
          read: reminder.is_read || false,
          created_at: reminder.remind_at,
          link: reminder.lead_type === 'quote' ? '/admin/quotes' : '/admin/contacts',
        };
      });

      // Merge and sort by date
      const allNotifications = [
        ...reminderNotifications,
        ...(notificationData || []),
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setNotifications(allNotifications);
      setUnreadCount(allNotifications.filter((n) => !n.read).length);
    };

    fetchNotifications();

    // Refresh every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    // Subscribe to new notifications
    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_notifications',
        },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
          setUnreadCount((prev) => prev + 1);

          // Play sound
          const audio = new Audio('/sounds/notification.mp3');
          audio.volume = 0.3;
          audio.play().catch(() => { });
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [supabase]);


  // Mark all as read
  const markAllAsRead = async () => {
    // 1. Mark regular notifications as read
    await supabase
      .from('admin_notifications')
      .update({ read: true })
      .eq('read', false);

    // 2. Mark displayed reminders as read (is_read = true)
    // We only update the ones that are currently fetched and unread
    const reminderIds = notifications
      .filter((n) => n.type === 'reminder' && !n.read)
      .map((n) => n.id.replace('reminder_', ''));

    if (reminderIds.length > 0) {
      await supabase
        .from('follow_up_reminders')
        .update({ is_read: true })
        .in('id', reminderIds);
    }

    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center
                     justify-between px-6 sticky top-0 z-40">
      {/* Left - Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Menu size={24} className="text-gray-600" />
      </button>

      {/* Center - Search (optional) */}
      <div className="flex-1" />

      {/* Right - Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Bell size={22} className="text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white
                            text-xs font-bold rounded-full flex items-center justify-center
                            animate-bounce">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl
                           shadow-xl border border-gray-100 overflow-hidden z-50
                           animate-scale-in origin-top-right">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3
                             border-b border-gray-100">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-[#062d16] hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-gray-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 border-b border-gray-50
                                 hover:bg-gray-50 transition-colors cursor-pointer
                                 ${!notification.read ? 'bg-blue-50/50' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0
                                       ${!notification.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 text-sm">
                              {notification.title}
                            </p>
                            <p className="text-gray-500 text-sm mt-0.5 truncate">
                              {notification.message}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                              {format(new Date(notification.created_at), 'MMM d, h:mm a')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#062d16] flex items-center
                       justify-center text-white font-semibold">
            {user?.full_name?.charAt(0) || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
}
