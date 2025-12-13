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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Fuel, Gauge, Users, GitCommitHorizontal, Sparkles, Zap, Bike, Wrench, CalendarCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type VehicleDetailsPageProps = {
  vehicle: Vehicle;
};

const statusConfig = {
    Available: {
        color: "bg-green-500",
        icon: CalendarCheck,
        text: "Available",
    },
    Rented: {
        color: "bg-yellow-500",
        icon: Car,
        text: "Rented",
    },
    Maintenance: {
        color: "bg-orange-500",
        icon: Wrench,
        text: "Maintenance",
    },
};

export default function VehicleDetailsPage({ vehicle }: VehicleDetailsPageProps) {
  const specs = [
    { icon: Gauge, label: 'Engine', value: vehicle.specs.engine },
    { icon: vehicle.specs.fuelType === 'Electric' ? Zap : Fuel, label: 'Fuel Type', value: vehicle.specs.fuelType },
    { icon: Sparkles, label: 'Horsepower', value: `${vehicle.specs.horsepower} HP` },
    { icon: Users, label: 'Seats', value: vehicle.seats },
    { icon: GitCommitHorizontal, label: 'Transmission', value: vehicle.transmission },
  ];
  
  const currentStatus = statusConfig[vehicle.status];

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
                
                <Card className="w-full shadow-lg">
                    <CardHeader>
                        <CardTitle>Vehicle Status</CardTitle>
                        <CardDescription>Manage vehicle availability and maintenance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                            <div className={cn("w-3 h-3 rounded-full animate-pulse", currentStatus.color)}></div>
                            <currentStatus.icon className="w-6 h-6 text-foreground" />
                            <p className="text-lg font-semibold">{currentStatus.text}</p>
                        </div>
                    </CardContent>
                    <CardFooter className='flex gap-2'>
                        <Button variant="outline" className="w-full">Mark for Maintenance</Button>
                        <Button className="w-full">Edit Vehicle</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
