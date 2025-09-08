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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("Medium");

  const sizes = ["Small", "Medium", "Large"];
  const extraToppings = product.ingredients?.slice(0, 3) || [];

  return (
    <Card
      className="flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full"
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
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex justify-start gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "secondary" : "outline"}
              size="sm"
              className="rounded-full text-xs"
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
        <div className="flex justify-start gap-2 flex-wrap">
          {extraToppings.map((topping) => (
             <Button key={topping} variant="outline" size="sm" className="rounded-full text-xs">
                <Plus size={12} className="mr-1" />
                {topping}
             </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto p-4">
        <p className="text-lg font-bold text-foreground">
          ${product.price.toFixed(2)}
        </p>
        <Button
          onClick={() => addToCart(product)}
          className="bg-[#F2811D] hover:bg-[#F26E22] text-white"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
