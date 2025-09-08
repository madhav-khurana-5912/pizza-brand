"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { Plus } from "lucide-react";
import { ProductDialog } from "./product-dialog";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card
        className="flex flex-col overflow-hidden rounded-lg border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="relative h-48 w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={product.aiHint}
          />
        </div>
        <CardHeader className="pb-2 flex-grow">
          <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
          <CardDescription className="text-sm text-gray-600 line-clamp-2 h-[40px]">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Content can be added here if needed */}
        </CardContent>
        <CardFooter className="flex justify-between items-center p-4 mt-auto">
          <p className="text-lg font-bold text-foreground">
            ₹{product.price.toFixed(2)}
          </p>
          <Button
            onClick={(e) => {
              e.stopPropagation(); // Prevent dialog from opening when clicking button
              addToCart(product);
            }}
            className="bg-[#F2811D] hover:bg-[#F26E22] text-white"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
      <ProductDialog product={product} isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </>
  );
}
