// types/post.ts

import type { PlatformId } from './platform';

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface PostImage {
  id: string;
  fileName: string;
  sizeBytes: number;
  mimeType: string;
  /** Object URL or base64 preview — not persisted to localStorage as-is */
  previewUrl: string;
}

export interface Post {
  id: string;
  content: string;
  platforms: PlatformId[];
  images: PostImage[];
  status: PostStatus;
  createdAt: string; // ISO string
  updatedAt: string;
  scheduledFor?: string;
}

export interface PostValidationError {
  platformId: PlatformId;
  field: 'content' | 'images';
  message: string;
}