
"use client";

import { useState, useMemo } from "react";
import type { Menu } from "@/lib/types";
import { ProductCard } from "./product-card";
import { CategoryFilter } from "./category-filter";

interface MenuDisplayProps {
  menu: Menu;
  searchTerm?: string;
}

export function MenuDisplay({ menu, searchTerm }: MenuDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState("Pizzas");

  const itemsToDisplay = useMemo(() => {
    let items = selectedCategory === 'All' 
      ? menu.flatMap(cat => cat.items)
      : menu.find(cat => cat.name === selectedCategory)?.items || [];

    if (searchTerm) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return items;
  }, [menu, selectedCategory, searchTerm]);

  return (
    <section>
       <CategoryFilter 
          categories={menu}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      <div className="flex flex-col sm:flex-row justify-between items-baseline mb-6 mt-8">
        <h2 className="text-3xl font-bold mb-4 sm:mb-0">
          {searchTerm ? `Search results for "${searchTerm}"` : "Order our best food options"}
        </h2>
      </div>
      
      {itemsToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itemsToDisplay.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          No items found {searchTerm && `for "${searchTerm}"`}.
        </p>
      )}
    </section>
  );
}
