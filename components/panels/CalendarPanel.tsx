// components/panels/CalendarPanel.tsx
'use client';

import { useState, useMemo, useCallback } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { selectPostsGroupedByDate } from '@/selectors/calendarSelectors';
import { getMonthGridDays, toDayKey } from '@/utils/calendarUtils';
import { CalendarDayCell } from '@/components/CalendarDayCell';
import { EMPTY_POSTS } from '@/utils/emptyArray';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function CalendarPanel() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const groupedPosts = useAppSelector(selectPostsGroupedByDate);

  const gridDays = useMemo(
    () => getMonthGridDays(currentMonth.year, currentMonth.month),
    [currentMonth.year, currentMonth.month]
  );

  const goToPreviousMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const date = new Date(prev.year, prev.month - 1, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((prev) => {
      const date = new Date(prev.year, prev.month + 1, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }, []);
  const todayKey = toDayKey(new Date());

  const monthLabel = new Date(currentMonth.year, currentMonth.month).toLocaleDateString(
    undefined,
    { month: 'long', year: 'numeric' }
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="px-2 py-1 text-sm border rounded-md hover:bg-gray-50"
        >
          ← Prev
        </button>
        <h3 className="text-sm font-semibold">{monthLabel}</h3>
        <button
          type="button"
          onClick={goToNextMonth}
          className="px-2 py-1 text-sm border rounded-md hover:bg-gray-50"
        >
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 text-xs font-medium text-gray-500 mb-1">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="text-center py-1">{label}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-100">
          {gridDays.map((day) => (
  <CalendarDayCell
    key={day.dateKey}
    date={day.date}
    posts={groupedPosts[day.dateKey] ?? EMPTY_POSTS}
    isCurrentMonth={day.isCurrentMonth}
    isToday={day.dateKey === todayKey}
  />
))}
      </div>
    </div>
  );
}