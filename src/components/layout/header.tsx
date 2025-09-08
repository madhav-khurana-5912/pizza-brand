"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { CartSheet } from "@/components/cart/cart-sheet";
import { cn } from "@/lib/utils";
import { Menu, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const { cartCount, setIsSheetOpen } = useCart();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F2811D] text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Pizza Brand
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild 
              className={cn("hover:bg-foreground hover:text-background", { "bg-transparent text-white font-bold": pathname === link.href })}>
              <Link href={link.href}>
                {link.label}
              </Link>
            </Button>
          ))}
          <Button variant="ghost" onClick={() => setIsSheetOpen(true)} className="hover:bg-foreground hover:text-background">
            Cart ({cartCount})
          </Button>
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(true)}>
            <ShoppingCart />
            <span className="sr-only">Open Cart</span>
          </Button>
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-3/4 bg-[#F2811D] text-white pt-16">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={cn("text-lg p-2 rounded-md",
                    { "font-bold bg-white/20": pathname === link.href }
                  )}>
                      {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <CartSheet />
    </header>
  );
}
