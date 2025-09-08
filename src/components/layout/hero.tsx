import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-primary text-primary-foreground">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/1600/600"
          alt="Abstract background"
          fill
          className="object-cover opacity-20"
          data-ai-hint="abstract geometric"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Order Food
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
            Discover the best restaurants and stores near you.
          </p>
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-xl mx-auto">
            <p className="text-neutral-800">Search meal</p>
          </div>
        </div>
      </div>
    </section>
  );
}
