import { menuData } from '@/lib/data';
import { MenuDisplay } from '@/components/menu/menu-display';
import { Hero } from '@/components/layout/hero';
import { Sidebar } from '@/components/sidebar/sidebar';

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Hero />
      <div className="lg:grid lg:grid-cols-4 lg:gap-8 mt-8">
        <div className="lg:col-span-3">
          <MenuDisplay menu={menuData} />
        </div>
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
