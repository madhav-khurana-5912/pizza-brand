"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { recommendPizzaCustomization } from "@/ai/flows/recommend-pizza-customization";
import type { RecommendPizzaCustomizationOutput } from "@/ai/flows/recommend-pizza-customization";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface AiCustomizationProps {
  product: Product;
}

export function AiCustomization({ product }: AiCustomizationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendPizzaCustomizationOutput | null>(null);
  const { toast } = useToast();

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await recommendPizzaCustomization({
        currentSelections: product.ingredients || [product.name],
      });
      setRecommendation(result);
    } catch (error) {
      console.error("AI customization error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get AI recommendations. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-4">
      <Button onClick={handleGetRecommendations} disabled={isLoading} className="w-full" variant="outline">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Get AI Customization Ideas
      </Button>

      {recommendation && (
         <div className="mt-4">
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base font-semibold">AI Suggestions</AccordionTrigger>
                    <AccordionContent>
                        <p className="text-sm text-muted-foreground mb-3">{recommendation.reasoning}</p>
                        <div className="flex flex-wrap gap-2">
                        {recommendation.suggestedCustomizations.map(customization => (
                            <Badge key={customization} variant="outline" className="text-sm bg-accent/20 border-accent text-accent-foreground">
                            + {customization}
                            </Badge>
                        ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
         </div>
      )}
    </div>
  );
}
