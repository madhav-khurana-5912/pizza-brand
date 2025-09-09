import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export function Hero() {
  const serviceCards = [
    {
      title: "FOOD DELIVERY",
      subtitle: "FROM RESTAURANTS",
      offer: "UPTO 50% OFF",
      image: "https://picsum.photos/seed/hero-food/200/150",
      aiHint: "food delivery plate",
    },
    {
      title: "INSTAMART",
      subtitle: "INSTANT GROCERY",
      offer: "UPTO 50% OFF",
      image: "https://picsum.photos/seed/hero-grocery/200/150",
      aiHint: "grocery basket",
    },
    {
      title: "DINEOUT",
      subtitle: "EAT OUT & SAVE MORE",
      offer: "UPTO 50% OFF",
      image: "https://picsum.photos/seed/hero-dineout/200/150",
      aiHint: "restaurant dining",
    }
  ];

  return (
    <section className="relative bg-orange-500 text-white overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-1/4 z-10">
            <Image 
                src="https://picsum.photos/seed/veg-bg/400/600"
                alt="Vegetables"
                fill
                className="object-cover opacity-80"
                data-ai-hint="fresh vegetables"
            />
             <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-500/80 to-transparent"></div>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/4 z-10">
             <Image 
                src="https://picsum.photos/seed/sushi-bg/400/600"
                alt="Sushi"
                fill
                className="object-cover opacity-80"
                data-ai-hint="sushi platter"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-orange-500 via-orange-500/80 to-transparent"></div>
        </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 z-20">
        <div className="max-w-4xl mx-auto">
          <div className='mb-8'>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Order food & groceries. Discover
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold">
                best restaurants. Swiggy it!
            </h2>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-2 flex items-center gap-2">
            <div className="flex items-center flex-grow">
                <MapPin className="h-5 w-5 mx-2 text-orange-500"/>
                <Input
                    type="text"
                    placeholder="Enter your delivery location"
                    className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-gray-700"
                />
                <ChevronDown className="h-5 w-5 text-gray-500"/>
            </div>
            <Separator />
            <div className="flex items-center flex-grow">
                 <Search className="h-5 w-5 mx-2 text-gray-500"/>
                <Input
                    type="text"
                    placeholder="Search for restaurant, item or more"
                    className="flex-grow border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-gray-700"
                />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-black">
            {serviceCards.map(card => (
              <Card key={card.title} className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-bold">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.subtitle}</p>
                    <p className="text-sm font-semibold text-orange-600 mt-1">{card.offer}</p>
                  </div>
                  <div className='relative h-32 mt-4'>
                    <Image src={card.image} alt={card.title} fill className="object-contain" data-ai-hint={card.aiHint}/>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function Separator() {
    return <div className="w-px h-6 bg-gray-200"></div>
}
