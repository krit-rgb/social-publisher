// utils/postStorage.ts

import type { Post } from '@/types/post';

const STORAGE_KEY = 'social-publisher:posts';

export function loadPostsFromStorage(): Post[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Post[];
  } catch {
    // Corrupted or unreadable data — fail safe rather than crash the app
    return [];
  }
}

export function savePostsToStorage(posts: Post[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // Likely quota exceeded (large base64 images) — silently skip for now.
    // Milestone 7+ can surface a toast via uiSlice here.
  }
}