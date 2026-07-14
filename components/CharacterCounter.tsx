// components/CharacterCounter.tsx
import { memo } from 'react';

interface CharacterCounterProps {
  current: number;
  max: number;
}

function CharacterCounterComponent({ current, max }: CharacterCounterProps) {
  const isOverLimit = current > max;
  const displayMax = Number.isFinite(max) ? max : '∞';

  return (
    <span
      className={`text-sm font-mono ${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}
      aria-live="polite"
    >
      {current} / {displayMax}
    </span>
  );
}

export const CharacterCounter = memo(CharacterCounterComponent);