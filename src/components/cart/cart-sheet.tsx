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
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export function CartSheet() {
  const { cartItems, totalPrice, isSheetOpen, setIsSheetOpen, cartCount } = useCart();

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="flex flex-col gap-4 py-4">
                {cartItems.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="p-6 sm:flex-col sm:gap-4">
                <div className="flex justify-between items-center w-full text-lg font-semibold">
                  <span>Total:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="#">Checkout</Link>
                </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center p-6">
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
