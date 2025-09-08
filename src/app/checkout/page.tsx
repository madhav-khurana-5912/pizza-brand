import type { Metadata } from 'next';
import { OrderSummary } from '@/components/checkout/order-summary';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order by providing your delivery details.',
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Checkout</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Please fill in your details to complete the order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
          <Separator className="mb-6" />
          <CheckoutForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Order</h2>
          <Separator className="mb-6" />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
