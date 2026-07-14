// selectors/platformSelectors.ts

import { createSelector } from 'reselect';
import type { RootState } from '@/store';
import { PLATFORM_CONFIG } from '@/config/platforms.config';
import type { PlatformConfig } from '@/types/platform';

// Base selector — just reads the raw slice value
const selectSelectedPlatformIds = (state: RootState) => state.platform.selectedPlatformIds;

/**
 * Derives the full PlatformConfig objects for currently selected platforms.
 * Memoized: only recomputes when selectedPlatformIds reference changes.
 */
export const selectSelectedPlatformConfigs = createSelector(
  [selectSelectedPlatformIds],
  (selectedIds): PlatformConfig[] => selectedIds.map((id) => PLATFORM_CONFIG[id])
);

/**
 * The "safe limit" — the minimum character limit across all selected
 * platforms, so a single post body is valid everywhere it's published.
 * Returns Infinity when no platforms are selected (no constraint yet).
 */
export const selectSafeCharacterLimit = createSelector(
  [selectSelectedPlatformConfigs],
  (configs): number => {
    if (configs.length === 0) return Infinity;
    return Math.min(...configs.map((c) => c.characterLimit));
  }
);

/**
 * The safe image count — minimum maxImages across selected platforms.
 */
export const selectSafeMaxImages = createSelector(
  [selectSelectedPlatformConfigs],
  (configs): number => {
    if (configs.length === 0) return Infinity;
    return Math.min(...configs.map((c) => c.maxImages));
  }
);

/**
 * The safe max image file size (MB) — minimum across selected platforms.
 */
export const selectSafeMaxImageSizeMB = createSelector(
  [selectSelectedPlatformConfigs],
  (configs): number => {
    if (configs.length === 0) return Infinity;
    return Math.min(...configs.map((c) => c.maxImageSizeMB));
  }
);

export { selectSelectedPlatformIds };