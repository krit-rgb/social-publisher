// hooks/usePostPersistence.ts
'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { hydratePosts } from '@/store/postSlice';
import { loadPostsFromStorage, savePostsToStorage } from '@/utils/postStorage';

/**
 * Loads posts from localStorage once on mount, then keeps localStorage
 * in sync whenever the posts slice changes thereafter.
 * Mount this once near the app root (e.g. in Providers or a top-level layout component).
 */
export function usePostPersistence() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.post.posts);
  const hasHydrated = useAppSelector((state) => state.post.hasHydrated);
  const isFirstRun = useRef(true);

  // Load once on mount
  useEffect(() => {
    const stored = loadPostsFromStorage();
    dispatch(hydratePosts(stored));
  }, [dispatch]);

  // Save on every change AFTER hydration completes
  // (prevents immediately overwriting storage with an empty array on mount)
  useEffect(() => {
    if (!hasHydrated) return;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    savePostsToStorage(posts);
  }, [posts, hasHydrated]);
}