'use server';

/**
 * @fileOverview This file defines a Genkit flow for recommending additional items to complement a pizza order.
 *
 * It includes:
 * - `recommendAdditionalItems`: An async function that takes a list of pizza items and returns recommended additional items.
 * - `RecommendAdditionalItemsInput`: The input type for the `recommendAdditionalItems` function.
 * - `RecommendAdditionalItemsOutput`: The output type for the `recommendAdditionalItems` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendAdditionalItemsInputSchema = z.array(
  z.string().describe('Name of pizza item in the order.')
).describe('List of pizza items currently in the order.');

export type RecommendAdditionalItemsInput = z.infer<typeof RecommendAdditionalItemsInputSchema>;

const RecommendAdditionalItemsOutputSchema = z.array(
  z.string().describe('Name of recommended additional item.')
).describe('List of recommended additional items.');

export type RecommendAdditionalItemsOutput = z.infer<typeof RecommendAdditionalItemsOutputSchema>;

export async function recommendAdditionalItems(input: RecommendAdditionalItemsInput): Promise<RecommendAdditionalItemsOutput> {
  return recommendAdditionalItemsFlow(input);
}

const recommendAdditionalItemsPrompt = ai.definePrompt({
  name: 'recommendAdditionalItemsPrompt',
  input: {schema: RecommendAdditionalItemsInputSchema},
  output: {schema: RecommendAdditionalItemsOutputSchema},
  prompt: `Based on the current pizza order: {{#each this}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}, recommend additional items (sides, drinks, desserts) that would complement the order based on popular combinations and other user preferences. Return a list of item names.`,  
});

const recommendAdditionalItemsFlow = ai.defineFlow(
  {
    name: 'recommendAdditionalItemsFlow',
    inputSchema: RecommendAdditionalItemsInputSchema,
    outputSchema: RecommendAdditionalItemsOutputSchema,
  },
  async input => {
    const {output} = await recommendAdditionalItemsPrompt(input);
    return output!;
  }
);
