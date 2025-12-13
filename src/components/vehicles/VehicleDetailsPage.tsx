'use client';

import Image from 'next/image';
import type { Vehicle } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Fuel, Gauge, Users, GitCommitHorizontal, Sparkles, Zap, Bike } from 'lucide-react';
import BookingForm from './BookingForm';

type VehicleDetailsPageProps = {
  vehicle: Vehicle;
};

export default function VehicleDetailsPage({ vehicle }: VehicleDetailsPageProps) {
  const specs = [
    { icon: Gauge, label: 'Engine', value: vehicle.specs.engine },
    { icon: vehicle.specs.fuelType === 'Electric' ? Zap : Fuel, label: 'Fuel Type', value: vehicle.specs.fuelType },
    { icon: Sparkles, label: 'Horsepower', value: `${vehicle.specs.horsepower} HP` },
    { icon: Users, label: 'Seats', value: vehicle.seats },
    { icon: GitCommitHorizontal, label: 'Transmission', value: vehicle.transmission },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
        <div className="md:col-span-3">
          <Carousel className="w-full">
            <CarouselContent>
              {[vehicle.image, ...vehicle.gallery].map((img, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <div className="relative aspect-video">
                      <Image
                        src={img.imageUrl}
                        alt={img.description}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        data-ai-hint={img.imageHint}
                        priority={index === 0}
                      />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
          <div className="mt-8">
            <h2 className="text-2xl font-bold font-headline mb-4">Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specs.map((spec) => (
                <Card key={spec.label}>
                    <CardContent className="p-4 flex flex-col items-start gap-2">
                        <spec.icon className="w-6 h-6 text-primary" />
                        <p className="text-sm text-muted-foreground">{spec.label}</p>
                        <p className="font-semibold">{spec.value}</p>
                    </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
            <div className='sticky top-24'>
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-4xl font-bold font-headline">{vehicle.name}</h1>
                    <Badge variant="secondary" className="flex items-center gap-2 text-lg py-1 px-3">
                        {vehicle.type === 'Car' ? <Car size={20} /> : <Bike size={20} />}
                        {vehicle.type}
                    </Badge>
                </div>
                <div className="mb-6">
                    <span className="text-4xl font-bold text-primary">${vehicle.pricePerDay}</span>
                    <span className="text-xl text-muted-foreground">/day</span>
                </div>
                
                <BookingForm vehicle={vehicle} />
            </div>
        </div>
      </div>
    </div>
  );
}
