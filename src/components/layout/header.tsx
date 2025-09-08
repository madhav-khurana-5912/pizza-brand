"use client";

import Link from "next/link";
import { Pizza, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { CartSheet } from "@/components/cart/cart-sheet";

export function Header() {
  const { cartCount, setIsSheetOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Pizza className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-primary-foreground">Pizza Brand</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="transition-colors hover:text-primary-foreground/80 text-primary-foreground/60"
          >
            Menu
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-primary-foreground/80 text-primary-foreground/60"
          >
            Contact
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-primary-foreground hover:bg-card/20 hover:text-primary-foreground"
            onClick={() => setIsSheetOpen(true)}
            aria-label={`Open cart with ${cartCount} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>
      <CartSheet />
    </header>
  );
}
