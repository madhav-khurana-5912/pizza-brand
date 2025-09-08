"use client";

import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/use-auth';
import { firestore } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot, collection } from 'firebase/firestore';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Effect to sync cart with Firestore
  useEffect(() => {
    let unsubscribe: () => void = () => {};
    
    if (user) {
      const cartRef = doc(firestore, 'carts', user.uid);
      unsubscribe = onSnapshot(cartRef, (snapshot) => {
        if (snapshot.exists()) {
          setCartItems(snapshot.data().items || []);
        } else {
          // If no remote cart exists, create one with the local cart items
          setDoc(cartRef, { items: cartItems });
        }
      }, (error) => {
        console.error("Firestore snapshot error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not sync your cart.",
        });
      });
    } else {
      // If user logs out, clear the cart.
      setCartItems([]);
    }

    return () => unsubscribe();
  }, [user, toast]);


  const updateRemoteCart = useCallback(async (newCartItems: CartItem[]) => {
    if (user) {
      try {
        const cartRef = doc(firestore, 'carts', user.uid);
        await setDoc(cartRef, { items: newCartItems }, { merge: true });
      } catch (error) {
        console.error("Error updating firestore cart: ", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not update your cart. Please try again."
        });
      }
    }
  }, [user, toast]);

  const addToCart = (product: Product) => {
    const updatedCart = [...cartItems];
    const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    
    setCartItems(updatedCart);
    if (user) {
      updateRemoteCart(updatedCart);
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    setIsSheetOpen(true);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    if (user) {
      updateRemoteCart(updatedCart);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      const updatedCart = cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      setCartItems(updatedCart);
      if (user) {
        updateRemoteCart(updatedCart);
      }
    }
  };
  
  const clearCart = () => {
    const updatedCart: CartItem[] = [];
    setCartItems(updatedCart);
    if (user) {
      updateRemoteCart(updatedCart);
    }
  }

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    totalPrice,
    isSheetOpen,
    setIsSheetOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
