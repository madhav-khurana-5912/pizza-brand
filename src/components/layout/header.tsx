"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-provider";
import { CartSheet } from "@/components/cart/cart-sheet";
import { cn } from "@/lib/utils";
import { Menu, ShoppingCart, UtensilsCrossed, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { AuthDialog } from "../auth/auth-dialog";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function Header() {
  const { cartCount, setIsSheetOpen } = useCart();
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/contact", label: "Contact" },
  ];

  const getInitials = (email?: string | null) => {
    return email ? email.charAt(0).toUpperCase() : '?';
  };


  return (
    <header className="sticky top-0 z-50 w-full bg-white text-neutral-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <UtensilsCrossed className="h-7 w-7" />
          Pizza Brand
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "font-medium text-neutral-600 hover:text-primary transition-colors",
                { "text-primary font-semibold": pathname === link.href }
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button onClick={() => setIsSheetOpen(true)} variant="outline" className="rounded-full border-2">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Cart ({cartCount})
          </Button>
          {user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {getInitials(user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setIsAuthDialogOpen(true)} className="rounded-full bg-neutral-900 text-white hover:bg-neutral-700">
              Sign In
            </Button>
          )}
        </nav>

        {/* Mobile Navigation */}
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
            <SheetContent side="left" className="w-3/4 bg-white pt-16">
              <nav className="flex flex-col gap-6 px-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={cn(
                      "text-lg font-medium text-neutral-600 hover:text-primary transition-colors",
                      { "text-primary font-bold": pathname === link.href }
                    )}
                  >
                      {link.label}
                  </Link>
                ))}
                 {user ? (
                   <Button onClick={signOut} variant="outline">
                     Sign Out
                   </Button>
                  ) : (
                    <Button onClick={() => setIsAuthDialogOpen(true)} className="bg-neutral-900 text-white hover:bg-neutral-700">
                      Sign In
                    </Button>
                  )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <CartSheet />
      <AuthDialog isOpen={isAuthDialogOpen} setIsOpen={setIsAuthDialogOpen} />
    </header>
  );
}
