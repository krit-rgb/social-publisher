'use client';
import Link from 'next/link';
import { PostComposer } from '@/components/PostComposer';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <div className="w-full max-w-xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Social Publisher</h1>
        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline">
          Dashboard →
        </Link>
      </div>
      <PostComposer />
    </main>
  );
}