"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { CartSheet } from "@/components/cart/cart-sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const { setIsSheetOpen } = useCart();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/cart", label: "Cart" },
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
              className={cn("hover:bg-foreground/80 hover:text-background", { "bg-primary text-white": pathname === link.href || (link.href === '/menu' && pathname === '/') })}>
              <Link href={link.href === '/cart' ? '#' : link.href} onClick={link.href === '/cart' ? () => setIsSheetOpen(true) : undefined}>
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="md:hidden">
          {/* Mobile menu could be implemented here */}
        </div>
      </div>
      <CartSheet />
    </header>
  );
}
