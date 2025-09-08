"use client";

import Image from "next/image";
import type { Product } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { Badge } from "@/components/ui/badge";
import { AiCustomization } from "../ai/ai-customization";

interface ProductDialogProps {
  product: Product;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function ProductDialog({
  product,
  isOpen,
  setIsOpen,
}: ProductDialogProps) {
  const { addToCart } = useCart();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-64 md:h-auto w-full rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.aiHint}
            />
          </div>
          <div className="flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-3xl font-semibold">{product.name}</DialogTitle>
              <DialogDescription className="text-base pt-2">
                {product.description}
              </DialogDescription>
            </DialogHeader>

            {product.ingredients && product.ingredients.length > 0 && (
              <div className="my-4">
                <h4 className="font-semibold mb-2">Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient) => (
                    <Badge key={ingredient} variant="secondary">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <AiCustomization product={product} />
            
            <DialogFooter className="mt-auto pt-4">
              <div className="w-full flex justify-between items-center">
                <p className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
                <Button size="lg" onClick={() => {
                  addToCart(product);
                  setIsOpen(false);
                }}
                className="bg-[#F2811D] hover:bg-[#F26E22] text-white"
                >
                  Add to Cart
                </Button>
              </div>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
