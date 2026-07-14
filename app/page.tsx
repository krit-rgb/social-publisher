'use client';
import { useAppSelector } from '@/hooks/redux';

export default function Home() {
  const selected = useAppSelector((state) => state.platform.selectedPlatformIds);
  return <main>{JSON.stringify(selected)}</main>;
}