"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { recommendAdditionalItems } from "@/ai/flows/recommend-additional-items";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { menuData } from "@/lib/data";

export function AiRecommendations() {
  const { cartItems, addToCart } = useCart();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getRecommendations = async () => {
      if (cartItems.length > 0) {
        setIsLoading(true);
        try {
          const itemNames = cartItems.map((item) => item.name);
          const result = await recommendAdditionalItems(itemNames);
          setRecommendations(result);
        } catch (error) {
          console.error("AI recommendation error:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not get AI recommendations.",
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        setRecommendations([]);
      }
    };

    const timeoutId = setTimeout(getRecommendations, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [cartItems, toast]);

  const allProducts = menuData.flatMap((category) => category.items);

  const handleAddRecommendation = (itemName: string) => {
    const productToAdd = allProducts.find(p => p.name === itemName);
    if(productToAdd) {
        addToCart(productToAdd);
    } else {
        toast({
            variant: "destructive",
            title: "Item not found",
            description: `Could not find "${itemName}" in the menu.`,
        })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <p className="ml-2 text-muted-foreground">Getting recommendations...</p>
      </div>
    );
  }

  if (recommendations.length === 0 || cartItems.length === 0) {
    return null;
  }

  return (
    <div>
      <h4 className="font-semibold mb-2">You might also like...</h4>
      <div className="flex flex-wrap gap-2">
        {recommendations.map((rec) => (
          <Button
            key={rec}
            variant="outline"
            size="sm"
            onClick={() => handleAddRecommendation(rec)}
            className="bg-accent/20 border-accent text-accent-foreground hover:bg-accent/30"
          >
            <Plus className="mr-1 h-4 w-4" />
            {rec}
          </Button>
        ))}
      </div>
    </div>
  );
}
