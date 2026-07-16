// components/DashboardTabs.tsx
'use client';

import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setActiveDashboardTab, type DashboardTab } from '@/store/uiSlice';

const TABS: { id: DashboardTab; label: string }[] = [
  { id: 'posts', label: 'Posts' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'calendar', label: 'Calendar' },
];

function DashboardTabsComponent() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.ui.activeDashboardTab);

  const handleTabClick = useCallback(
    (tab: DashboardTab) => {
      dispatch(setActiveDashboardTab(tab));
    },
    [dispatch]
  );

  return (
    <div className="flex gap-1 border-b border-gray-200">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => handleTabClick(tab.id)}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            activeTab === tab.id
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export const DashboardTabs = memo(DashboardTabsComponent);