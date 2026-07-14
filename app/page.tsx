'use client';

import { PostComposer } from '@/components/PostComposer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Social Publisher</h1>
      <PostComposer />
    </main>
  );
}