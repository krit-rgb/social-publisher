// selectors/analyticsSelectors.ts

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { PLATFORM_CONFIG } from '@/config/platforms.config';
import type { PlatformId } from '@/types/platform';

const selectAllPosts = (state: RootState) => state.post.posts;
const selectAnalyticsRangeDays = (state: RootState) => state.analytics.rangeDays;

/**
 * Filters posts to only those within the selected time range.
 * Base selector other analytics selectors build on.
 */
const selectPostsInRange = createSelector(
  [selectAllPosts, selectAnalyticsRangeDays],
  (posts, rangeDays) => {
    if (rangeDays === null) return posts; // "all time"
    const cutoff = Date.now() - rangeDays * 24 * 60 * 60 * 1000;
    return posts.filter((p) => new Date(p.createdAt).getTime() >= cutoff);
  }
);

/**
 * Count of posts per platform within range.
 * A single post targeting 3 platforms counts once toward each.
 */
export const selectPlatformBreakdown = createSelector(
  [selectPostsInRange],
  (posts): { platformId: PlatformId; label: string; count: number }[] => {
    const counts: Record<string, number> = {};
    for (const post of posts) {
      for (const platformId of post.platforms) {
        counts[platformId] = (counts[platformId] ?? 0) + 1;
      }
    }
    return Object.entries(counts).map(([platformId, count]) => ({
      platformId: platformId as PlatformId,
      label: PLATFORM_CONFIG[platformId as PlatformId].label,
      count,
    }));
  }
);

/**
 * Posts published per day within range, for a frequency chart.
 * Returns sorted ascending by date.
 */
export const selectPostsPerDay = createSelector(
  [selectPostsInRange],
  (posts): { date: string; count: number }[] => {
    const counts: Record<string, number> = {};
    for (const post of posts) {
      const day = new Date(post.createdAt).toISOString().slice(0, 10); // YYYY-MM-DD
      counts[day] = (counts[day] ?? 0) + 1;
    }
    return Object.entries(counts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }
);

export const selectAnalyticsTotals = createSelector(
  [selectPostsInRange],
  (posts) => ({
    totalPosts: posts.length,
    totalImages: posts.reduce((sum, p) => sum + p.images.length, 0),
    avgPlatformsPerPost: posts.length === 0
      ? 0
      : posts.reduce((sum, p) => sum + p.platforms.length, 0) / posts.length,
  })
);