// components/panels/AnalyticsPanel.tsx
'use client';

import { useCallback, memo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  selectPlatformBreakdown,
  selectPostsPerDay,
  selectAnalyticsTotals,
} from '@/selectors/analyticsSelectors';
import { setAnalyticsRange } from '@/store/analyticsSlice';

const RANGE_OPTIONS: { label: string; value: number | null }[] = [
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: '90 days', value: 90 },
  { label: 'All time', value: null },
];

function RangeSelector() {
  const dispatch = useAppDispatch();
  const rangeDays = useAppSelector((state) => state.analytics.rangeDays);

  const handleChange = useCallback(
    (value: number | null) => {
      dispatch(setAnalyticsRange(value));
    },
    [dispatch]
  );

  return (
    <div className="flex gap-2 mb-4">
      {RANGE_OPTIONS.map((opt) => (
        <button
          key={opt.label}
          type="button"
          onClick={() => handleChange(opt.value)}
          className={`px-3 py-1 text-xs rounded-full border ${
            rangeDays === opt.value
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-600 border-gray-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

const TotalsSummary = memo(function TotalsSummary() {
  const totals = useAppSelector(selectAnalyticsTotals);
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="border rounded-md p-3">
        <p className="text-xs text-gray-500">Total Posts</p>
        <p className="text-xl font-semibold">{totals.totalPosts}</p>
      </div>
      <div className="border rounded-md p-3">
        <p className="text-xs text-gray-500">Total Images</p>
        <p className="text-xl font-semibold">{totals.totalImages}</p>
      </div>
      <div className="border rounded-md p-3">
        <p className="text-xs text-gray-500">Avg Platforms/Post</p>
        <p className="text-xl font-semibold">{totals.avgPlatformsPerPost.toFixed(1)}</p>
      </div>
    </div>
  );
});

const PlatformBreakdownChart = memo(function PlatformBreakdownChart() {
  const data = useAppSelector(selectPlatformBreakdown);

  if (data.length === 0) {
    return <p className="text-sm text-gray-400">No platform data in this range.</p>;
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" fontSize={12} />
          <YAxis allowDecimals={false} fontSize={12} />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

const PostsFrequencyChart = memo(function PostsFrequencyChart() {
  const data = useAppSelector(selectPostsPerDay);

  if (data.length === 0) {
    return <p className="text-sm text-gray-400">No posts in this range.</p>;
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={11} />
          <YAxis allowDecimals={false} fontSize={12} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export function AnalyticsPanel() {
  return (
    <div>
      <RangeSelector />
      <TotalsSummary />
      <div className="space-y-8">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Posts by Platform</h3>
          <PlatformBreakdownChart />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Posting Frequency</h3>
          <PostsFrequencyChart />
        </div>
      </div>
    </div>
  );
}