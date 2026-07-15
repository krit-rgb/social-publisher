// app/PersistenceGate.tsx
'use client';

import { usePostPersistence } from '@/hooks/usePostPersistence';

export function PersistenceGate({ children }: { children: React.ReactNode }) {
  usePostPersistence();
  return <>{children}</>;
}