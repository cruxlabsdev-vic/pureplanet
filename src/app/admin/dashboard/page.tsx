'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Users,
  FileText,
  TrendingUp,
  Zap,
  Clock,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';

// Stats Card Component
interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

function StatCard({ title, value, change, changeLabel, icon: Icon, iconColor, iconBg }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100
                  hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2 animate-count-up">
            {value}
          </p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm
                          ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <span className="font-medium">{Math.abs(change)}%</span>
              <span className="text-gray-500">{changeLabel}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon size={24} className={iconColor} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const supabase = useMemo(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ), []);

  const [stats, setStats] = useState({
    todayLeads: 0,
    weekLeads: 0,
    monthLeads: 0,
    hotLeads: 0,
    pendingFollowups: 0,
    conversionRate: 0,
  });

  const [statusData, setStatusData] = useState([
    { name: 'New', value: 0, color: '#F59E0B' },
    { name: 'Contacted', value: 0, color: '#10B981' },
    { name: 'Qualified', value: 0, color: '#3B82F6' },
    { name: 'Quoted', value: 0, color: '#8B5CF6' },
    { name: 'Won', value: 0, color: '#22C55E' },
    { name: 'Lost', value: 0, color: '#EF4444' },
  ]);

  const [trendData, setTrendData] = useState<any[]>([]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        // Today's leads (contacts + facebook)
        const { count: todayContactCount } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today.toISOString());

        const { count: todayFbCount } = await supabase
          .from('facebook_leads')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today.toISOString());

        // Week's leads (contacts + facebook)
        const { count: weekContactCount } = await supabase
          .from('contact_submissions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', weekAgo.toISOString());

        const { count: weekFbCount } = await supabase
          .from('facebook_leads')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', weekAgo.toISOString());

        // Hot leads (lead_score > 70 from quotes + facebook)
        const { count: hotQuoteCount } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .gte('lead_score', 70);

        const { count: hotFbCount } = await supabase
          .from('facebook_leads')
          .select('*', { count: 'exact', head: true })
          .gte('lead_score', 70);

        // Pending follow-ups
        const { count: followupsCount } = await supabase
          .from('follow_up_reminders')
          .select('*', { count: 'exact', head: true })
          .eq('completed', false);

        // Status distribution (contacts + quotes + facebook)
        const { data: contactStatuses } = await supabase
          .from('contact_submissions')
          .select('status');

        const { data: quoteStatuses } = await supabase
          .from('leads')
          .select('status');

        const { data: fbStatuses } = await supabase
          .from('facebook_leads')
          .select('status');

        // Count statuses
        const statusCounts: any = {
          new: 0,
          contacted: 0,
          qualified: 0,
          quoted: 0,
          won: 0,
          lost: 0,
        };

        contactStatuses?.forEach((item: any) => {
          if (statusCounts[item.status] !== undefined) {
            statusCounts[item.status]++;
          }
        });

        quoteStatuses?.forEach((item: any) => {
          if (statusCounts[item.status] !== undefined) {
            statusCounts[item.status]++;
          }
        });

        fbStatuses?.forEach((item: any) => {
          if (statusCounts[item.status] !== undefined) {
            statusCounts[item.status]++;
          }
        });

        // Conversion rate (won / total)
        const totalLeads = (contactStatuses?.length || 0) + (quoteStatuses?.length || 0) + (fbStatuses?.length || 0);
        const wonLeads = statusCounts.won;
        const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

        setStats({
          todayLeads: (todayContactCount || 0) + (todayFbCount || 0),
          weekLeads: (weekContactCount || 0) + (weekFbCount || 0),
          monthLeads: 0,
          hotLeads: (hotQuoteCount || 0) + (hotFbCount || 0),
          pendingFollowups: followupsCount || 0,
          conversionRate,
        });

        setStatusData([
          { name: 'New', value: statusCounts.new, color: '#F59E0B' },
          { name: 'Contacted', value: statusCounts.contacted, color: '#10B981' },
          { name: 'Qualified', value: statusCounts.qualified, color: '#3B82F6' },
          { name: 'Quoted', value: statusCounts.quoted, color: '#8B5CF6' },
          { name: 'Won', value: statusCounts.won, color: '#22C55E' },
          { name: 'Lost', value: statusCounts.lost, color: '#EF4444' },
        ]);

        // Last 7 days trend data
        const trendDataTemp = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          date.setHours(0, 0, 0, 0);
          const nextDate = new Date(date);
          nextDate.setDate(nextDate.getDate() + 1);

          const { count: contactsCount } = await supabase
            .from('contact_submissions')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', date.toISOString())
            .lt('created_at', nextDate.toISOString());

          const { count: quotesCount } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', date.toISOString())
            .lt('created_at', nextDate.toISOString());

          const { count: fbCount } = await supabase
            .from('facebook_leads')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', date.toISOString())
            .lt('created_at', nextDate.toISOString());

          trendDataTemp.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            contacts: contactsCount || 0,
            quotes: quotesCount || 0,
            facebook: fbCount || 0,
          });
        }

        setTrendData(trendDataTemp);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [supabase]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Leads"
          value={stats.todayLeads}
          change={12}
          changeLabel="vs yesterday"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          title="This Week"
          value={stats.weekLeads}
          change={8}
          changeLabel="vs last week"
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          title="Hot Leads"
          value={stats.hotLeads}
          icon={Zap}
          iconColor="text-orange-600"
          iconBg="bg-orange-100"
        />
        <StatCard
          title="Pending Follow-ups"
          value={stats.pendingFollowups}
          icon={Clock}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Status Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Lead Status Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1000}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart - Leads Over Time */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Leads Over Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="contacts"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  name="Contacts"
                  animationDuration={1500}
                />
                <Line
                  type="monotone"
                  dataKey="quotes"
                  stroke="#C2F32C"
                  strokeWidth={2}
                  dot={false}
                  name="Quotes"
                  animationDuration={1500}
                />
                <Line
                  type="monotone"
                  dataKey="facebook"
                  stroke="#1877F2"
                  strokeWidth={2}
                  dot={false}
                  name="Facebook"
                  animationDuration={1500}
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Conversion Rate */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Conversion Rate
          </h3>
          <span className="text-2xl font-bold text-green-600">
            {stats.conversionRate}%
          </span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#062d16] to-[#C2F32C]
                     rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${stats.conversionRate}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Leads converted to Won status
        </p>
      </div>
    </div>
  );
}
