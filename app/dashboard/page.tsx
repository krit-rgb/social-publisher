// app/dashboard/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useAppSelector } from '@/hooks/redux';
import { DashboardTabs } from '@/components/DashboardTabs';
import { PostsPanel } from '@/components/panels/PostsPanel';
import Link from 'next/link';

// Lazy-loaded: only fetched when the user actually visits these tabs
const AnalyticsPanel = dynamic(
  () => import('@/components/panels/AnalyticsPanel').then((mod) => mod.AnalyticsPanel),
  { loading: () => <p className="text-sm text-gray-400 py-8">Loading analytics…</p>, ssr: false }
);

const CalendarPanel = dynamic(
  () => import('@/components/panels/CalendarPanel').then((mod) => mod.CalendarPanel),
  { loading: () => <p className="text-sm text-gray-400 py-8">Loading calendar…</p>, ssr: false }
);

export default function DashboardPage() {
  const activeTab = useAppSelector((state) => state.ui.activeDashboardTab);
// app/dashboard/page.tsx — update the return block

return (
  <main className="min-h-screen px-4 py-10">
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track and review your posts</p>
        </div>
        <Link href="/" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          ← New post
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <DashboardTabs />
        <div className="mt-5">
          {activeTab === 'posts' && <PostsPanel />}
          {activeTab === 'analytics' && <AnalyticsPanel />}
          {activeTab === 'calendar' && <CalendarPanel />}
        </div>
      </div>
    </div>
  </main>
);
}