// components/CalendarDayCell.tsx
import { memo } from 'react';
import type { Post } from '@/types/post';

interface CalendarDayCellProps {
  date: Date;
  posts: Post[];
  isCurrentMonth: boolean;
  isToday: boolean;
}

function CalendarDayCellComponent({ date, posts, isCurrentMonth, isToday }: CalendarDayCellProps) {
  return (
    <div
      className={`min-h-[80px] border border-gray-100 p-1 text-xs ${
        isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'
      }`}
    >
      <span className={`inline-block w-5 h-5 leading-5 text-center rounded-full ${
        isToday ? 'bg-blue-600 text-white' : ''
      }`}>
        {date.getDate()}
      </span>
      <div className="mt-1 space-y-0.5">
        {posts.slice(0, 3).map((post) => (
          <div
            key={post.id}
            title={post.content}
            className="truncate bg-blue-50 text-blue-700 rounded px-1 py-0.5"
          >
            {post.content || '(empty post)'}
          </div>
        ))}
        {posts.length > 3 && (
          <div className="text-gray-400">+{posts.length - 3} more</div>
        )}
      </div>
    </div>
  );
}

export const CalendarDayCell = memo(CalendarDayCellComponent);