import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Eye, Zap } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-accent text-accent-foreground rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Hot. Fresh. Unforgettable.
        </h1>
        <p className="text-lg mb-8">
          Order your favorite pizzas with customizable sizes and toppings. Fast delivery and exclusive deals every day.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <Button size="lg" className="bg-[#F2811D] hover:bg-[#F26E22] text-white">
            <Zap size={20} className="mr-2" />
            Start Order
          </Button>
          <Button size="lg" variant="outline" className="bg-white/30 border-white text-white hover:bg-white/50">
            <Eye size={20} className="mr-2" />
            View Deals
          </Button>
        </div>
      </div>
      <div className="md:w-1/2">
        <Image
          src="https://picsum.photos/600/350"
          alt="Delicious pizzas"
          width={600}
          height={350}
          className="rounded-lg shadow-lg"
          data-ai-hint="sliced pizza"
        />
      </div>
    </section>
  );
}
