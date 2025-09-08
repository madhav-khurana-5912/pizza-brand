"use client";

import { useState } from "react";
import type { Menu } from "@/lib/types";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MenuDisplayProps {
  menu: Menu;
}

export function MenuDisplay({ menu }: MenuDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState("Pizzas");

  const categories = ["All", "Classic", "Veggie", "Meat Lovers", "Specials"];

  // Note: The filtering logic here is simplified.
  // A real app would have better category mapping.
  const filteredItems = menu
    .find(cat => cat.name === 'Pizzas')
    ?.items || [];

  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-baseline mb-6">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Popular Categories</h2>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
           {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-full",
                   selectedCategory === category ? 'bg-accent text-accent-foreground' : 'bg-secondary'
                )}
              >
                {category}
              </Button>
            ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
