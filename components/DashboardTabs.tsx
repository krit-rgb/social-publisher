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

 // components/DashboardTabs.tsx — update the return block

return (
  <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
    {TABS.map((tab) => (
      <button
        key={tab.id}
        type="button"
        onClick={() => handleTabClick(tab.id)}
        className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
          activeTab === tab.id
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
);
}

export const DashboardTabs = memo(DashboardTabsComponent);