"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AiRecommendations } from "@/components/ai/ai-recommendations";
import { ShoppingCart } from "lucide-react";

export function CartSheet() {
  const { cartItems, totalPrice, isSheetOpen, setIsSheetOpen, cartCount } = useCart();

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-4 p-6">
                {cartItems.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <div className="p-6">
              <AiRecommendations />
            </div>
            <Separator />
            <SheetFooter className="p-6 sm:justify-between">
                <div className="text-lg font-semibold">
                  <span>Total: </span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full sm:w-auto" size="lg">
                  Checkout
                </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-20 w-20 text-muted-foreground" strokeWidth={1} />
            <SheetTitle>Your cart is empty</SheetTitle>
            <SheetDescription>
              Looks like you haven't added anything to your cart yet.
            </SheetDescription>
            <Button onClick={() => setIsSheetOpen(false)}>Start an order</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
