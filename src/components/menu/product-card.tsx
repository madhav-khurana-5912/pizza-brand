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
import { ProductDialog } from "./product-dialog";
import { useCart } from "@/components/cart/cart-provider";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addToCart } = useCart();

  return (
    <>
      <Card
        className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full"
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
        <CardHeader className="flex-grow">
          <CardTitle className="font-headline text-lg">{product.name}</CardTitle>
          <CardDescription className="text-sm">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between items-center mt-auto pt-0 p-4">
          <p className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            Add
          </Button>
        </CardFooter>
      </Card>
      <ProductDialog
        product={product}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </>
  );
}
