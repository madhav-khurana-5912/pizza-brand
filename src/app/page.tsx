import { menuData } from '@/lib/data';
import { MenuDisplay } from '@/components/menu/menu-display';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <MenuDisplay menu={menuData} />
    </div>
  );
}
