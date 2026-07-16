// selectors/postSelectors.ts

import { createSelector } from 'reselect';
import type { RootState } from '@/store';

const selectAllPosts = (state: RootState) => state.post.posts;

/**
 * Posts sorted newest-first for dashboard display.
 * Memoized so re-renders only happen when the posts array itself changes.
 */
export const selectPostsSortedByDate = createSelector(
  [selectAllPosts],
  (posts) => [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
);

export const selectPostsCount = createSelector(
  [selectAllPosts],
  (posts) => posts.length
);