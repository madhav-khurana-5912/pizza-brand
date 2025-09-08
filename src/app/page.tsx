import { menuData } from '@/lib/data';
import { MenuDisplay } from '@/components/menu/menu-display';
import { Hero } from '@/components/layout/hero';
import type { Metadata } from 'next';
import { WednesdayOffers } from '@/components/layout/offers';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <>
      <Hero />
      <WednesdayOffers />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MenuDisplay menu={menuData} />
      </div>
    </>
  );
}
