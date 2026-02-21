'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import {
    Eye,
    Trash2,
    Mail,
    Search,
    Download,
    RefreshCw,
    Facebook,
} from 'lucide-react';
import { format } from 'date-fns';
import ViewModal from '../components/modals/ViewModal';
import DeleteModal from '../components/modals/DeleteModal';
import SendEmailModal from '../components/modals/SendEmailModal';

interface FacebookLead {
    id: string;
    fb_lead_id: string;
    full_name: string;
    phone: string | null;
    email: string | null;
    message: string | null;
    ad_name: string | null;
    campaign_name: string | null;
    form_name: string | null;
    status: 'new' | 'contacted' | 'qualified' | 'quoted' | 'won' | 'lost';
    lead_score: number;
    source: string;
    raw_data: any;
    created_at: string;
    updated_at: string;
    address: string | null;
    zip_code: string | null;
    property_ownership: string | null;
    monthly_bill: number | null;
    quarterly_bill_range: string | null;
    fb_form_id: string | null;
    fb_page_id: string | null;
    fb_ad_id: string | null;
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

export default function FacebookLeadsPage() {
    const [leads, setLeads] = useState<FacebookLead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Modals
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<FacebookLead | null>(null);

    const supabase = useMemo(() => createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ), []);

    // Fetch Facebook leads
    const fetchLeads = useCallback(async () => {
        setLoading(true);

        let query = supabase
            .from('facebook_leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (statusFilter !== 'all') {
            query = query.eq('status', statusFilter);
        }

        if (searchQuery) {
            query = query.or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`);
        }

        const { data, error } = await query;
        if (error) {
            console.error('Error fetching Facebook leads:', error.message);
        } else {
            setLeads(data || []);
        }

        setLoading(false);
    }, [supabase, statusFilter, searchQuery]);

    // Initial fetch
    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    // Real-time subscription
    useEffect(() => {
        const channel = supabase
            .channel('facebook_leads_changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'facebook_leads',
                },
                (payload) => {
                    setLeads((prev) => [payload.new as FacebookLead, ...prev]);
                    playNotificationSound();
                    showBrowserNotification(payload.new as FacebookLead);
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'facebook_leads',
                },
                (payload) => {
                    setLeads((prev) =>
                        prev.map((lead) =>
                            lead.id === payload.new.id ? (payload.new as FacebookLead) : lead
                        )
                    );
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'facebook_leads',
                },
                (payload) => {
                    setLeads((prev) =>
                        prev.filter((lead) => lead.id !== payload.old.id)
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
    const showBrowserNotification = (lead: FacebookLead) => {
        if (Notification.permission === 'granted') {
            new Notification('New Facebook Lead', {
                body: `${lead.full_name} - ${lead.ad_name || 'Facebook Ad'}`,
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
        const headers = ['Name', 'Phone', 'Email', 'Ad Name', 'Campaign', 'Status', 'Lead Score', 'City', 'Postcode', 'Property Ownership', 'Quarterly Bill', 'Date'];
        const rows = leads.map((l) => [
            l.full_name,
            l.phone || '',
            l.email || '',
            l.ad_name || '',
            l.campaign_name || '',
            l.status,
            l.lead_score,
            l.address || '',
            l.zip_code || '',
            l.property_ownership || '',
            l.quarterly_bill_range || '',
            format(new Date(l.created_at), 'yyyy-MM-dd HH:mm'),
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(','))
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `facebook-leads-${format(new Date(), 'yyyy-MM-dd')}.csv`;
        a.click();
    };

    // Update lead status
    const updateStatus = async (leadId: string, newStatus: string) => {
        await supabase
            .from('facebook_leads')
            .update({ status: newStatus })
            .eq('id', leadId);
        fetchLeads();
    };

    // Lead Score Badge
    const LeadScoreBadge = ({ score }: { score: number }) => {
        const getScoreColor = () => {
            if (score >= 80) return 'bg-green-100 text-green-700 border-green-200';
            if (score >= 60) return 'bg-blue-100 text-blue-700 border-blue-200';
            if (score >= 40) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            return 'bg-gray-100 text-gray-700 border-gray-200';
        };

        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getScoreColor()}`}>
                {score}
            </span>
        );
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <Facebook className="text-blue-600" size={28} />
                        <h1 className="text-2xl font-bold text-gray-800">Facebook Leads</h1>
                    </div>
                    <p className="text-gray-500 mt-1">
                        {leads.length} total leads from Facebook Lead Ads
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
                    <option value="qualified">Qualified</option>
                    <option value="quoted">Quoted</option>
                    <option value="won">Won</option>
                    <option value="lost">Lost</option>
                </select>
            </div>

            {/* Table (Desktop) */}
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden hidden md:block
                    before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/50 before:to-transparent before:pointer-events-none">
                <div className="overflow-x-auto relative z-10 max-w-full">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-gray-200/50 backdrop-blur-sm">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Name</th>
                                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Contact</th>
                                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Ad/Campaign</th>
                                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Score</th>
                                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
                                <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.map((lead, index) => (
                                <tr
                                    key={lead.id}
                                    className="border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/20
                           transition-all duration-300 animate-slide-in group backdrop-blur-sm
                           hover:shadow-lg hover:shadow-blue-500/10"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <Facebook size={16} className="text-blue-600" />
                                            <span className="font-medium text-gray-800 text-sm">{lead.full_name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="text-sm">
                                            <div className="text-gray-600">{lead.phone || '-'}</div>
                                            <div className="text-gray-500 text-xs">{lead.email || '-'}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="text-sm">
                                            <div className="text-gray-700 font-medium">{lead.ad_name || '-'}</div>
                                            <div className="text-gray-500 text-xs">{lead.campaign_name || '-'}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <LeadScoreBadge score={lead.lead_score} />
                                    </td>
                                    <td className="px-4 py-4">
                                        <select
                                            value={lead.status || 'new'}
                                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                                            className={`px-2 py-1 text-xs font-semibold rounded-full border cursor-pointer outline-none transition-all
                        ${lead.status === 'new' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                                    lead.status === 'contacted' ? 'bg-green-100 text-green-700 border-green-200' :
                                                        lead.status === 'qualified' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                                            lead.status === 'quoted' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                                                                lead.status === 'won' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                                                                    lead.status === 'lost' ? 'bg-red-100 text-red-700 border-red-200' :
                                                                        'bg-gray-100 text-gray-700 border-gray-200'
                                                }`}
                                        >
                                            <option value="new">New</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="qualified">Qualified</option>
                                            <option value="quoted">Quoted</option>
                                            <option value="won">Won</option>
                                            <option value="lost">Lost</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-4 text-gray-500 text-xs">
                                        {format(new Date(lead.created_at), 'MMM d, h:mm a')}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => {
                                                    setSelectedLead(lead);
                                                    setViewModalOpen(true);
                                                }}
                                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100/50
                                 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-110"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>

                                            {lead.email && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedLead(lead);
                                                        setEmailModalOpen(true);
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100/50
                                   rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 hover:scale-110"
                                                    title="Send Email"
                                                >
                                                    <Mail size={16} />
                                                </button>
                                            )}

                                            <button
                                                onClick={() => {
                                                    setSelectedLead(lead);
                                                    setDeleteModalOpen(true);
                                                }}
                                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100/50
                                 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 hover:scale-110"
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
                {leads.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <Facebook size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 mb-2">No Facebook leads found</p>
                        <p className="text-sm text-gray-400">Leads from Facebook Lead Ads will appear here automatically</p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <RefreshCw size={24} className="mx-auto text-gray-400 animate-spin mb-4" />
                        <p className="text-gray-500">Loading Facebook leads...</p>
                    </div>
                )}
            </div>

            {/* Cards (Mobile) */}
            <div className="md:hidden space-y-4">
                {leads.map((lead, index) => (
                    <div
                        key={lead.id}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-slide-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Facebook size={18} className="text-blue-600" />
                                <div>
                                    <h3 className="font-semibold text-gray-800">{lead.full_name}</h3>
                                    <p className="text-sm text-gray-500">{lead.phone || lead.email || '-'}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border shadow-sm
                                ${lead.status === 'new' ? 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-700 border-orange-200/50' :
                                    lead.status === 'contacted' ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-700 border-green-200/50' :
                                        lead.status === 'qualified' ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border-blue-200/50' :
                                            lead.status === 'quoted' ? 'bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 border-purple-200/50' :
                                                lead.status === 'won' ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 border-emerald-200/50' :
                                                    lead.status === 'lost' ? 'bg-gradient-to-r from-red-100 to-red-50 text-red-700 border-red-200/50' :
                                                        'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 border-gray-200/50'
                                }`}>
                                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                            </span>
                        </div>

                        {lead.ad_name && (
                            <p className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">Ad:</span> {lead.ad_name}
                            </p>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <LeadScoreBadge score={lead.lead_score} />
                                <span className="text-xs text-gray-400">
                                    {format(new Date(lead.created_at), 'MMM d, h:mm a')}
                                </span>
                            </div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => {
                                        setSelectedLead(lead);
                                        setViewModalOpen(true);
                                    }}
                                    className="p-2 text-gray-400 hover:text-blue-600 rounded-lg"
                                >
                                    <Eye size={18} />
                                </button>
                                {lead.email && (
                                    <button
                                        onClick={() => {
                                            setSelectedLead(lead);
                                            setEmailModalOpen(true);
                                        }}
                                        className="p-2 text-gray-400 hover:text-green-600 rounded-lg"
                                    >
                                        <Mail size={18} />
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setSelectedLead(lead);
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
                contact={selectedLead as any}
                type="facebook"
            />

            <DeleteModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={async () => {
                    if (selectedLead) {
                        await supabase
                            .from('facebook_leads')
                            .delete()
                            .eq('id', selectedLead.id);
                        setDeleteModalOpen(false);
                    }
                }}
                itemName={selectedLead?.full_name || ''}
            />

            {selectedLead?.email && (
                <SendEmailModal
                    isOpen={emailModalOpen}
                    onClose={() => setEmailModalOpen(false)}
                    contact={selectedLead as any}
                    onSent={() => {
                        fetchLeads();
                        setEmailModalOpen(false);
                    }}
                    contactType="facebook"
                />
            )}
        </div>
    );
}
