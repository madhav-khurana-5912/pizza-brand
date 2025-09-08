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

  // This is a simplified filtering logic.
  // In a real app, you'd likely have a more robust way to handle categories.
  const categories = menu.map(cat => cat.name);
  const itemsToDisplay = selectedCategory === 'All' 
    ? menu.flatMap(cat => cat.items)
    : menu.find(cat => cat.name === selectedCategory)?.items || [];


  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-baseline mb-6">
        <h2 className="text-3xl font-bold mb-4 sm:mb-0">Order our best food options</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {itemsToDisplay.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
