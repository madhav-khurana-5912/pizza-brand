import { menuData } from '@/lib/data';
import { MenuDisplay } from '@/components/menu/menu-display';
import type { Metadata } from 'next';
import { WednesdayOffers } from '@/components/layout/offers';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Explore our delicious menu of pizzas, burgers, sandwiches, and more.',
};

interface MenuPageProps {
  searchParams?: {
    search?: string;
  };
}

export default function MenuPage({ searchParams }: MenuPageProps) {
  return (
    <>
      <div className="overflow-x-hidden">
        <WednesdayOffers />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MenuDisplay menu={menuData} searchTerm={searchParams?.search} />
      </div>
    </>
  );
}
