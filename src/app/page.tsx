'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import VehicleList from '@/components/vehicles/VehicleList';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[50vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-headline font-bold !text-white drop-shadow-lg">
            Your Journey, Your Wheels. Made Easy.
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto !text-white/90 drop-shadow-md">
            Discover the freedom of the open road with Rideasy. Browse our collection of cars and motorcycles and book your ride in minutes.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="font-bold text-lg">
              <Link href="#vehicles">Browse Vehicles</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold text-lg bg-transparent hover:bg-white/10 border-white text-white">
                <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="vehicles" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-10">
            Our Fleet
          </h2>
          <VehicleList />
        </div>
      </section>
    </div>
  );
}
