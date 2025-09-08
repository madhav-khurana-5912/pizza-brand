import { menuData } from '@/lib/data';
import { MenuDisplay } from '@/components/menu/menu-display';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu',
  description: 'Explore our delicious menu of pizzas, burgers, sandwiches, and more.',
};

export default function MenuPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <MenuDisplay menu={menuData} />
    </div>
  );
}
