import { Hero } from '@/components/layout/hero';
import type { Metadata } from 'next';
import { TopPicks } from '@/components/menu/top-picks';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <>
      <Hero />
      <TopPicks />
    </>
  );
}
