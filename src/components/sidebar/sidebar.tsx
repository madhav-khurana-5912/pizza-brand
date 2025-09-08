'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useCart } from '../cart/cart-provider';
import Link from 'next/link';
import { Separator } from '../ui/separator';

export function Sidebar() {
  const { cartItems, totalPrice } = useCart();

  return (
    <aside className="space-y-6">
      <Card className="rounded-2xl border-2 border-accent">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Refine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="search" className="font-medium">Search</Label>
            <Input id="search" placeholder="Find a pizza..." className="mt-1" />
          </div>
          <div>
            <h4 className="font-medium mb-2">Dietary</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="vegetarian" />
                <Label htmlFor="vegetarian" className="font-normal">Vegetarian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="vegan" />
                <Label htmlFor="vegan" className="font-normal">Vegan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="gluten-free" />
                <Label htmlFor="gluten-free" className="font-normal">Gluten-Free</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="rounded-2xl border-2 border-accent">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              <div className='space-y-2'>
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <div>
                      <p className="font-medium">{item.name} (M)</p>
                      <p className="text-xs text-muted-foreground">+ Extra Cheese</p>
                    </div>
                    <p className="font-medium">₹{item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between items-center font-bold text-base">
                <p>Total</p>
                <p>₹{totalPrice.toFixed(2)}</p>
              </div>
               <Button asChild className="w-full bg-[#F2811D] hover:bg-[#F26E22] text-white">
                  <Link href="/checkout">Checkout</Link>
                </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center">Your cart is empty.</p>
          )}
        </CardContent>
      </Card>
    </aside>
  );
}
