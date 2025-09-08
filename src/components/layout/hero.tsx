import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-primary text-primary-foreground pb-16">
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
          <div className="bg-white rounded-lg shadow-lg p-2 max-w-xl mx-auto">
            <div className="flex">
              <Input
                type="text"
                placeholder="Search for a meal..."
                className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
              />
              <Button className="bg-[#F2811D] hover:bg-[#F26E22] text-white rounded-md">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
