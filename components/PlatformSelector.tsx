// components/PlatformSelector.tsx
'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { togglePlatform } from '@/store/platformSlice';
import { PLATFORM_CONFIG, PLATFORM_IDS } from '@/config/platforms.config';
import type { PlatformId } from '@/types/platform';

function PlatformSelectorComponent() {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector((state) => state.platform.selectedPlatformIds);

  const handleToggle = useCallback(
    (id: PlatformId) => {
      dispatch(togglePlatform(id));
    },
    [dispatch]
  );

  return (
    <div className="flex flex-wrap gap-2">
      {PLATFORM_IDS.map((id) => {
        const config = PLATFORM_CONFIG[id];
        const isSelected = selectedIds.includes(id);
        return (
          // components/PlatformSelector.tsx — update button className inside the map

<button
  key={id}
  type="button"
  onClick={() => handleToggle(id)}
  className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-all ${
    isSelected
      ? 'text-white border-transparent shadow-sm scale-105'
      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
  }`}
  style={isSelected ? { backgroundColor: config.colorHex } : undefined}
  aria-pressed={isSelected}
>
  {config.label}
</button>
        );
      })}
    </div>
  );
}

export const PlatformSelector = PlatformSelectorComponent;