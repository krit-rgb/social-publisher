// components/FilterBar.tsx
'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSearchQuery, setFilterPlatform, setFilterStatus } from '@/store/uiSlice';
import { useDebouncedValue } from '@/hooks/useDebouncedValues';
import { PLATFORM_IDS, PLATFORM_CONFIG } from '@/config/platforms.config';
import type { PostStatus } from '@/types/post';

const STATUS_OPTIONS: (PostStatus | 'all')[] = ['all', 'draft', 'scheduled', 'published', 'failed'];

function FilterBarComponent() {
  const dispatch = useAppDispatch();
  const filterPlatform = useAppSelector((state) => state.ui.filterPlatform);
  const filterStatus = useAppSelector((state) => state.ui.filterStatus);

  const [inputValue, setInputValue] = useState('');
  const debouncedQuery = useDebouncedValue(inputValue, 300);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  const handlePlatformChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setFilterPlatform(e.target.value as typeof filterPlatform));
    },
    [dispatch]
  );

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setFilterStatus(e.target.value as PostStatus | 'all'));
    },
    [dispatch]
  );

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search post content…"
        className="flex-1 min-w-[180px] px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={filterPlatform}
        onChange={handlePlatformChange}
        className="px-2 py-1.5 text-sm border border-gray-300 rounded-md"
      >
        <option value="all">All platforms</option>
        {PLATFORM_IDS.map((id) => (
          <option key={id} value={id}>
            {PLATFORM_CONFIG[id].label}
          </option>
        ))}
      </select>
      <select
        value={filterStatus}
        onChange={handleStatusChange}
        className="px-2 py-1.5 text-sm border border-gray-300 rounded-md"
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status === 'all' ? 'All statuses' : status}
          </option>
        ))}
      </select>
    </div>
  );
}

export const FilterBar = memo(FilterBarComponent);