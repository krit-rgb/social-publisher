// app/page.tsx
'use client';

import Link from 'next/link';
import { PostComposer } from '@/components/PostComposer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-xl flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Social Publisher</h1>
          <p className="text-sm text-gray-500 mt-0.5">Compose once, publish everywhere</p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          Dashboard <span aria-hidden>→</span>
        </Link>
      </div>
      <PostComposer />
    </main>
  );
}