import { PLATFORM_CONFIG } from '@/config/platforms.config';

export default function Home() {
  console.log(PLATFORM_CONFIG.x.characterLimit); // sanity check, should log 280

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        Social Publisher
      </h1>
    </main>
  );
}