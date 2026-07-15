// app/providers.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { PersistenceGate } from './PersistenceGate';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistenceGate>{children}</PersistenceGate>
    </Provider>
  );
}