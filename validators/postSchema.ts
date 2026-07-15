// validators/postSchema.ts

import { z } from 'zod';
import { PLATFORM_CONFIG, PLATFORM_IDS } from '@/config/platforms.config';
const platformIdEnum  = z.enum(PLATFORM_IDS);
/**
 * Computes the safe character limit as the minimum limit
 * across all currently selected platforms.
 * Temporary placement here — will move to a Reselect selector
 * in the next milestone and be passed in instead of recomputed.
 */

export function buildPostSchema(safeLimit: number) {
  return z.object({
    content: z
      .string()
      .min(1, 'Post content cannot be empty')
      .max(safeLimit, `Content exceeds the safe limit of ${safeLimit} characters for selected platforms`),
    platforms: z
      .array(platformIdEnum)
      .min(1, 'Select at least one platform to publish to'),
  });
}

export type PostFormValues = z.infer<ReturnType<typeof buildPostSchema>>;