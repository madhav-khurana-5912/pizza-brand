import type { Menu } from "@/lib/types";
import { ProductCard } from "./product-card";

interface FeaturedItemsProps {
  menu: Menu;
}

export function FeaturedItems({ menu }: FeaturedItemsProps) {
  return (
    <section>
      {menu.map((category) => {
        // Get top 3 most expensive items
        const topItems = [...category.items]
          .sort((a, b) => b.price - a.price)
          .slice(0, 3);

        if (topItems.length === 0) {
          return null;
        }

        return (
          <div key={category.name} className="mb-12">
            <h3 className="text-3xl font-bold mb-6 border-l-4 border-primary pl-4">{category.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
