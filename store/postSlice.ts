// store/postSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '@/types/post';

interface PostState {
  posts: Post[];
  hasHydrated: boolean; // true once localStorage load has completed
}

const initialState: PostState = {
  posts: [],
  hasHydrated: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    hydratePosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.hasHydrated = true;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.posts[index] = action.payload;
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
});

export const { hydratePosts, addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;