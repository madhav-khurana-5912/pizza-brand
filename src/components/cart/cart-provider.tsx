"use client";

import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/use-auth';
import { firestore } from '@/lib/firebase';
import { doc, getDoc, setDoc, onSnapshot, collection, writeBatch } from 'firebase/firestore';

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
  const [isSyncing, setIsSyncing] = useState(false);

  const getCartRef = useCallback((uid: string) => {
    return doc(collection(firestore, 'carts'), uid);
  }, []);
  
  const mergeCarts = useCallback(async (localCart: CartItem[], uid: string) => {
    if (isSyncing) return;
    setIsSyncing(true);

    try {
        const cartRef = getCartRef(uid);
        const cartSnap = await getDoc(cartRef);
        const remoteCart: CartItem[] = cartSnap.exists() ? cartSnap.data().items : [];

        const mergedCart = [...remoteCart];

        localCart.forEach(localItem => {
            const remoteItemIndex = mergedCart.findIndex(item => item.id === localItem.id);
            if (remoteItemIndex > -1) {
                mergedCart[remoteItemIndex].quantity += localItem.quantity;
            } else {
                mergedCart.push(localItem);
            }
        });
        
        await setDoc(cartRef, { items: mergedCart });
        setCartItems(mergedCart);
    } catch(error) {
        console.error("Error merging carts:", error);
    } finally {
        setIsSyncing(false);
    }
}, [getCartRef, isSyncing]);

useEffect(() => {
    if (user) {
      const localCart = [...cartItems];
      setCartItems([]); // Clear local cart immediately for better UX
      
      if (localCart.length > 0) {
        mergeCarts(localCart, user.uid);
      }

      const cartRef = getCartRef(user.uid);
      const unsubscribe = onSnapshot(cartRef, (doc) => {
        if (doc.exists()) {
          setCartItems(doc.data().items || []);
        } else {
          setCartItems([]);
        }
      });
      return () => unsubscribe();
    } else {
      // User logged out, retain local cart for now, or clear it.
      // Clearing is simpler to avoid complexity when they log back in.
      setCartItems([]);
    }
  }, [user, getCartRef, mergeCarts]);

  const updateRemoteCart = async (newCartItems: CartItem[]) => {
    if (user && !isSyncing) {
        setIsSyncing(true);
        try {
            const cartRef = getCartRef(user.uid);
            await setDoc(cartRef, { items: newCartItems });
        } catch(error) {
            console.error("Error updating firestore cart: ", error);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Could not update your cart. Please try again."
            })
        } finally {
            setIsSyncing(false);
        }
    }
  };

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
    setCartItems([]);
    if (user) {
      updateRemoteCart([]);
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
