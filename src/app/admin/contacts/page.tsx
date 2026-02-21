'use client';

import { useState, useEffect, useCallback } from 'react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import {
  Eye,
  Trash2,
  Mail,
  MessageSquare,
  Search,
  Download,
  RefreshCw,
  Clock,
  Users,
} from 'lucide-react';
import { format } from 'date-fns';
import ViewModal from '../components/modals/ViewModal';
import DeleteModal from '../components/modals/DeleteModal';
import SendEmailModal from '../components/modals/SendEmailModal';
import AddNoteModal from '../components/modals/AddNoteModal';
import SetReminderModal from '../components/modals/SetReminderModal';

interface Contact {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  inquiry_type: string;
  other_message: string | null;
  reference_number: string;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
  notes?: Note[];
  emails_sent?: EmailLog[];
  reminders?: Reminder[];
}

interface Note {
  id: string;
  content: string;
  created_at: string;
  created_by: string;
}

interface EmailLog {
  id: string;
  subject: string;
  sent_at: string;
  opened: boolean;
  opened_count: number;
  last_opened: string | null;
}

interface Reminder {
  id: string;
  remind_at: string;
  message: string | null;
  completed: boolean;
  created_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modals
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch contacts
  const fetchContacts = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from('contact_submissions')
      .select(`
        *,
        notes!notes_contact_id_fkey(id, content, created_at, created_by),
        emails_sent:email_logs!email_logs_contact_id_fkey(id, subject, sent_at, opened, opened_count, last_opened),
        reminders:follow_up_reminders!follow_up_reminders_contact_id_fkey(id, remind_at, message, completed, created_at)
      `)
      .order('created_at', { ascending: false });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    if (searchQuery) {
      query = query.or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching contacts:', error.message, error.details, error.hint);
    } else {
      setContacts(data || []);
    }

    setLoading(false);
  }, [supabase, statusFilter, searchQuery]);

  // Initial fetch
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('contact_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_submissions',
        },
        (payload) => {
          setContacts((prev) => [payload.new as Contact, ...prev]);
          playNotificationSound();
          showBrowserNotification(payload.new as Contact);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'contact_submissions',
        },
        (payload) => {
          setContacts((prev) =>
            prev.map((contact) =>
              contact.id === payload.new.id ? (payload.new as Contact) : contact
            )
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'contact_submissions',
        },
        (payload) => {
          setContacts((prev) =>
            prev.filter((contact) => contact.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Notification sound
  const playNotificationSound = () => {
    const audio = new Audio('/sounds/notification.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => { });
  };

  // Browser notification
  const showBrowserNotification = (contact: Contact) => {
    if (Notification.permission === 'granted') {
      new Notification('New Contact Inquiry', {
        body: `${contact.full_name} - ${contact.inquiry_type}`,
        icon: '/favicon.ico',
      });
    }
  };

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Inquiry Type', 'Status', 'Date'];
    const rows = contacts.map((c) => [
      c.full_name,
      c.phone,
      c.email || '',
      c.inquiry_type,
      c.status,
      format(new Date(c.created_at), 'yyyy-MM-dd HH:mm'),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  // Update contact status
  const updateStatus = async (contactId: string, newStatus: string) => {
    await supabase
      .from('contact_submissions')
      .update({ status: newStatus })
      .eq('id', contactId);
    fetchContacts();
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    if (!status) return null;

    const styles = {
      new: 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 border-orange-200/50 shadow-orange-500/20',
      contacted: 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200/50 shadow-green-500/20',
      resolved: 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border-blue-200/50 shadow-blue-500/20',
    };

    const styleClass = styles[status as keyof typeof styles] || 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border-gray-200/50 shadow-gray-500/20';

    return (
      <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border shadow-sm ${styleClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Contact Inquiries</h1>
          <p className="text-gray-500 mt-1">
            {contacts.length} total contacts
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C2F32C] focus:border-transparent transition-all duration-200 outline-none"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#C2F32C] focus:border-transparent transition-all duration-200 outline-none"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Table (Desktop) */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hidden md:block
                    before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/50 before:to-transparent before:pointer-events-none">
        <div className="overflow-x-auto relative z-10 max-w-full">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[110px]" />
              <col className="w-[95px]" />
              <col className="w-[140px]" />
              <col className="w-[90px]" />
              <col className="w-[90px]" />
              <col className="w-[100px]" />
              <col className="w-[140px]" />
            </colgroup>
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/50 backdrop-blur-sm">
              <tr>
                <th className="text-left px-3 py-3 text-sm font-semibold text-gray-600">Name</th>
                <th className="text-left px-3 py-3 text-sm font-semibold text-gray-600">Phone</th>
                <th className="text-left px-3 py-3 text-sm font-semibold text-gray-600">Email</th>
                <th className="text-left px-3 py-3 text-sm font-semibold text-gray-600">Inquiry</th>
                <th className="text-left px-3 py-3 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left px-3 py-3 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-center px-3 py-3 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.map((contact, index) => (
                <tr
                  key={contact.id}
                  className="border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/20
                           transition-all duration-300 animate-slide-in group backdrop-blur-sm
                           hover:shadow-lg hover:shadow-blue-500/10"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-3 py-3">
                    <span className="font-medium text-gray-800 text-sm truncate block">{contact.full_name}</span>
                  </td>
                  <td className="px-3 py-3 text-gray-600 text-sm truncate">{contact.phone}</td>
                  <td className="px-3 py-3 text-gray-600 text-sm truncate">{contact.email || '-'}</td>
                  <td className="px-3 py-3">
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-indigo-100 to-purple-100
                                 text-indigo-700 rounded-full border border-indigo-200/50 shadow-sm truncate block max-w-full text-center">
                      {contact.inquiry_type || 'General'}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={contact.status || 'new'}
                      onChange={(e) => updateStatus(contact.id, e.target.value)}
                      className={`px-2 py-1 text-[10px] font-semibold rounded-full border cursor-pointer outline-none transition-all w-[80px]
                        ${contact.status === 'new' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          contact.status === 'contacted' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                            contact.status === 'resolved' ? 'bg-green-100 text-green-700 border-green-200' :
                              'bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="px-3 py-3 text-gray-500 text-xs">
                    {format(new Date(contact.created_at), 'MMM d, h:mm a')}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => {
                          setSelectedContact(contact);
                          setViewModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100/50
                                 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-110 backdrop-blur-sm border border-transparent hover:border-blue-200/50"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedContact(contact);
                          setEmailModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100/50
                                 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 hover:scale-110 backdrop-blur-sm border border-transparent hover:border-green-200/50"
                        title="Send Email"
                      >
                        <Mail size={16} />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedContact(contact);
                          setNoteModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-purple-600 hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100/50
                                 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-110 backdrop-blur-sm border border-transparent hover:border-purple-200/50 relative"
                        title="Add Note"
                      >
                        <MessageSquare size={16} />
                        {contact.notes && contact.notes.length > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {contact.notes.length}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setSelectedContact(contact);
                          setReminderModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100/50
                                 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-110 backdrop-blur-sm border border-transparent hover:border-orange-200/50 relative"
                        title="Set Reminder"
                      >
                        <Clock size={16} />
                        {contact.reminders && contact.reminders.filter(r => !r.completed).length > 0 && (
                          <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {contact.reminders.filter(r => !r.completed).length}
                          </span>
                        )}
                      </button>


                      <button
                        onClick={() => {
                          setSelectedContact(contact);
                          setDeleteModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100/50
                                 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 hover:scale-110 backdrop-blur-sm border border-transparent hover:border-red-200/50"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {contacts.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No contacts found</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <RefreshCw size={24} className="mx-auto text-gray-400 animate-spin mb-4" />
            <p className="text-gray-500">Loading contacts...</p>
          </div>
        )}
      </div>

      {/* Cards (Mobile) */}
      <div className="md:hidden space-y-4">
        {contacts.map((contact, index) => (
          <div
            key={contact.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">{contact.full_name}</h3>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
              <StatusBadge status={contact.status} />
            </div>

            {contact.email && (
              <p className="text-sm text-gray-600 mb-2">{contact.email}</p>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">
                {format(new Date(contact.created_at), 'MMM d, h:mm a')}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setSelectedContact(contact);
                    setViewModalOpen(true);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 rounded-lg"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => {
                    setSelectedContact(contact);
                    setEmailModalOpen(true);
                  }}
                  className="p-2 text-gray-400 hover:text-green-600 rounded-lg"
                >
                  <Mail size={18} />
                </button>
                <button
                  onClick={() => {
                    setSelectedContact(contact);
                    setNoteModalOpen(true);
                  }}
                  className="p-2 text-gray-400 hover:text-purple-600 rounded-lg"
                >
                  <MessageSquare size={18} />
                </button>
                <button
                  onClick={() => {
                    setSelectedContact(contact);
                    setReminderModalOpen(true);
                  }}
                  className="p-2 text-gray-400 hover:text-orange-600 rounded-lg"
                >
                  <Clock size={18} />
                </button>
                <button
                  onClick={() => {
                    setSelectedContact(contact);
                    setDeleteModalOpen(true);
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <ViewModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        contact={selectedContact}
        type="contact"
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={async () => {
          if (selectedContact) {
            await supabase
              .from('contact_submissions')
              .delete()
              .eq('id', selectedContact.id);
            setDeleteModalOpen(false);
          }
        }}
        itemName={selectedContact?.full_name || ''}
      />

      <SendEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        contact={selectedContact}
        onSent={() => {
          fetchContacts();
          setEmailModalOpen(false);
        }}
      />

      <AddNoteModal
        isOpen={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
        contact={selectedContact}
        type="contact"
        onSaved={() => {
          fetchContacts();
          setNoteModalOpen(false);
        }}
      />

      <SetReminderModal
        isOpen={reminderModalOpen}
        onClose={() => setReminderModalOpen(false)}
        contact={selectedContact}
        type="contact"
        onSaved={() => {
          fetchContacts();
          setReminderModalOpen(false);
        }}
      />
    </div>
  );
}
