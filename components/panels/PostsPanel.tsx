// components/panels/PostsPanel.tsx
'use client';

import { useAppSelector } from '@/hooks/redux';
import { selectFilteredPosts, selectPostsCount } from '@/selectors/postSelectors';
import { FilterBar } from '@/components/FilterBar';

export function PostsPanel() {
  const filteredPosts = useAppSelector(selectFilteredPosts);
  const totalCount = useAppSelector(selectPostsCount);
  const hasHydrated = useAppSelector((state) => state.post.hasHydrated);

  if (!hasHydrated) {
    return <p className="text-sm text-gray-500 py-8">Loading posts…</p>;
  }

  if (totalCount === 0) {
    return <p className="text-sm text-gray-500 py-8">No posts yet — publish one to see it here.</p>;
  }

  return (
    <div>
      <FilterBar />
      {filteredPosts.length === 0 ? (
        <p className="text-sm text-gray-500 py-4">No posts match your filters.</p>
      ) : (
        // components/panels/PostsPanel.tsx — update the <ul> and <li> block

<ul className="space-y-3">
  {filteredPosts.map((post) => (
    <li
      key={post.id}
      className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all"
    >
      <p className="text-sm text-gray-800 line-clamp-2">{post.content}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleString()}
        </span>
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          {post.platforms.join(', ')}
        </span>
        <span className="text-xs text-gray-400 capitalize">{post.status}</span>
      </div>
    </li>
  ))}
</ul>
      )}
    </div>
  );
}