// selectors/calendarSelectors.ts

import { createSelector } from 'reselect';
import type { RootState } from '@/store';
import type { Post } from '@/types/post';

const selectAllPosts = (state: RootState) => state.post.posts;

/**
 * Groups all posts by their creation date (YYYY-MM-DD key).
 * Computed once per posts-array change; calendar navigation
 * just looks up keys from this map without recomputation.
 */
export const selectPostsGroupedByDate = createSelector(
  [selectAllPosts],
  (posts): Record<string, Post[]> => {
    const grouped: Record<string, Post[]> = {};
    for (const post of posts) {
      const dayKey = new Date(post.createdAt).toISOString().slice(0, 10);
      if (!grouped[dayKey]) grouped[dayKey] = [];
      grouped[dayKey].push(post);
    }
    return grouped;
  }
);