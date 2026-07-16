// app/dashboard/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useAppSelector } from '@/hooks/redux';
import { DashboardTabs } from '@/components/DashboardTabs';
import { PostsPanel } from '@/components/panels/PostsPanel';

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

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <DashboardTabs />
      <div className="mt-4">
        {activeTab === 'posts' && <PostsPanel />}
        {activeTab === 'analytics' && <AnalyticsPanel />}
        {activeTab === 'calendar' && <CalendarPanel />}
      </div>
    </main>
  );
}