"use client";

import { useState } from "react";
import type { Menu } from "@/lib/types";
import { ProductCard } from "./product-card";
import { CategoryFilter } from "./category-filter";

interface FeaturedItemsProps {
  menu: Menu;
}

export function FeaturedItems({ menu }: FeaturedItemsProps) {
  const [selectedCategory, setSelectedCategory] = useState("Pizzas");

  const itemsToDisplay =
    menu.find((cat) => cat.name === selectedCategory)?.items || [];
  
  const topItems = [...itemsToDisplay]
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);

  return (
    <section>
      <CategoryFilter
        categories={menu}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {topItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
