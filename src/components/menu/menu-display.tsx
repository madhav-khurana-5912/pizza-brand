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
  const [selectedCategory, setSelectedCategory] = useState(menu[0].name);

  const selectedCategoryData = menu.find(
    (category) => category.name === selectedCategory
  );

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="md:w-1/4 lg:w-1/5">
        <h2 className="text-xl font-bold font-headline mb-4">Categories</h2>
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 -mx-4 px-4">
          {menu.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "ghost"}
                className={cn(
                  "justify-start whitespace-nowrap",
                  selectedCategory === category.name ? "bg-primary text-primary-foreground" : "text-foreground"
                  )}
                onClick={() => setSelectedCategory(category.name)}
              >
                <Icon className="mr-2 h-5 w-5" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </aside>
      <section className="flex-1">
        <h2 className="text-3xl font-bold font-headline mb-6">{selectedCategory}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {selectedCategoryData?.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
