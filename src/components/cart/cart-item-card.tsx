"use client";

import Image from "next/image";
import type { CartItem } from "@/lib/types";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X } from "lucide-react";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="80px"
          className="object-cover"
          data-ai-hint={item.aiHint}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            className="mx-2 h-7 w-12 text-center"
            min="0"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => removeFromCart(item.id)}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
