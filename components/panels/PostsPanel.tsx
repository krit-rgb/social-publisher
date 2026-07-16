// components/panels/PostsPanel.tsx
'use client';

import { useAppSelector } from '@/hooks/redux';
import { selectPostsSortedByDate, selectPostsCount } from '@/selectors/postSelectors';

export function PostsPanel() {
  const posts = useAppSelector(selectPostsSortedByDate);
  const count = useAppSelector(selectPostsCount);
  const hasHydrated = useAppSelector((state) => state.post.hasHydrated);

  if (!hasHydrated) {
    return <p className="text-sm text-gray-500 py-8">Loading posts…</p>;
  }

  if (count === 0) {
    return <p className="text-sm text-gray-500 py-8">No posts yet — publish one to see it here.</p>;
  }

  return (
    <ul className="divide-y divide-gray-100">
      {posts.map((post) => (
        <li key={post.id} className="py-3">
          <p className="text-sm text-gray-800 line-clamp-2">{post.content}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </span>
            <span className="text-xs uppercase text-gray-400">{post.platforms.join(', ')}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}