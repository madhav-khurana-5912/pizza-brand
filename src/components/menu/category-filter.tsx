"use client";

import type { Menu } from "@/lib/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Menu;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) {
  
  // Find a representative image for each category (first item's image)
  const categoryImages = categories.map(category => {
    const firstItem = category.items[0];
    return {
      name: category.name,
      image: firstItem?.image || 'https://picsum.photos/200/200',
      aiHint: firstItem?.aiHint || 'food category'
    }
  });

  return (
    <div>
        <h2 className="text-3xl font-bold mb-6">What's on your mind?</h2>
        <Carousel opts={{
            align: "start",
            dragFree: true,
        }}>
            <CarouselContent>
            {categoryImages.map((category) => (
                <CarouselItem key={category.name} className="basis-auto cursor-pointer" onClick={() => setSelectedCategory(category.name)}>
                    <div className="flex flex-col items-center gap-2">
                        <div className={cn(
                            "relative h-32 w-32 rounded-full overflow-hidden border-4 border-transparent transition-all",
                            selectedCategory === category.name && "border-primary"
                        )}>
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                sizes="128px"
                                className="object-cover"
                                data-ai-hint={category.aiHint}
                            />
                        </div>
                        <p className={cn(
                            "font-semibold text-lg text-center",
                             selectedCategory === category.name ? "text-primary" : "text-foreground"
                        )}>
                            {category.name}
                        </p>
                    </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex"/>
            <CarouselNext className="hidden md:flex"/>
        </Carousel>
    </div>
  );
}
