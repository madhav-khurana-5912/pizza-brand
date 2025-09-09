import { FeaturedItems } from '@/components/menu/featured-items';
import { menuData } from '@/lib/data';
import type { Metadata } from 'next';
import { Hero } from '@/components/layout/hero';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Our Top Picks</h2>
          <p className="text-lg text-muted-foreground mt-2">A selection of our finest dishes, curated for you.</p>
        </div>
        <FeaturedItems menu={menuData} />
      </div>
    </>
  );
}
