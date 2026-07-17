// selectors/postSelectors.ts (full updated file)

import { createSelector } from 'reselect';
import type { RootState } from '@/store';

const selectAllPosts = (state: RootState) => state.post.posts;

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

// --- Filtering (Milestone 10) ---

const selectSearchQuery = (state: RootState) => state.ui.searchQuery;
const selectFilterPlatform = (state: RootState) => state.ui.filterPlatform;
const selectFilterStatus = (state: RootState) => state.ui.filterStatus;

export const selectFilteredPosts = createSelector(
  [selectPostsSortedByDate, selectSearchQuery, selectFilterPlatform, selectFilterStatus],
  (posts, searchQuery, filterPlatform, filterStatus) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      if (filterPlatform !== 'all' && !post.platforms.includes(filterPlatform)) {
        return false;
      }
      if (filterStatus !== 'all' && post.status !== filterStatus) {
        return false;
      }
      if (normalizedQuery && !post.content.toLowerCase().includes(normalizedQuery)) {
        return false;
      }
      return true;
    });
  }
);