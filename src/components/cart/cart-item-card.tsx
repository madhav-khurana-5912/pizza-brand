"use client";

import Image from "next/image";
import type { CartItem } from "@/lib/types";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";

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
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="64px"
          className="object-cover"
          data-ai-hint={item.aiHint}
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-base">{item.name}</h3>
        <p className="text-sm font-medium text-foreground">₹{item.price.toFixed(2)}</p>
        <div className="mt-2 flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
            className="mx-2 h-6 w-10 text-center px-1"
            min="0"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={() => removeFromCart(item.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
