"use client";

import { useCart } from "@/components/cart/cart-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function OrderSummary() {
  const { cartItems, totalPrice } = useCart();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                            <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={item.aiHint}/>
                        </div>
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                            </p>
                        </div>
                    </div>
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                ))}
            </div>
            <Separator />
            <div className="space-y-2 text-base">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">Your cart is empty.</p>
        )}
      </CardContent>
    </Card>
  );
}
