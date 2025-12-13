'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { rentedVehicles as initialRentedVehicles } from '@/lib/data';
import type { RentedVehicle } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MapPin, Loader2 } from 'lucide-react';

const TrackingMap = dynamic(() => import('@/components/tracking/TrackingMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <Loader2 className="animate-spin h-8 w-8 text-primary" />
      <p className="ml-2">Memuat peta...</p>
    </div>
  ),
});

export default function TrackingPage() {
  const [rentedVehicles] = React.useState<RentedVehicle[]>(initialRentedVehicles);
  const [selectedVehicle, setSelectedVehicle] = React.useState<RentedVehicle | null>(rentedVehicles[0] || null);
  
  // This would typically come from an API call
  const [vehiclePositions, setVehiclePositions] = React.useState<Record<string, {lat: number, lng: number}>>(
    rentedVehicles.reduce((acc, v) => ({ ...acc, [v.id]: v.location }), {})
  );

  React.useEffect(() => {
    // In a real app, you might use WebSockets for real-time updates.
    // For this demo, we simulate vehicle movement.
    const interval = setInterval(() => {
        setVehiclePositions(prev => {
            const newPositions = {...prev};
            for(const id in newPositions) {
                // Simulate slight random movement
                newPositions[id] = {
                    lat: newPositions[id].lat + (Math.random() - 0.5) * 0.001,
                    lng: newPositions[id].lng + (Math.random() - 0.5) * 0.001,
                }
            }
            return newPositions;
        })
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="w-full md:w-1/3 lg:w-1/4 h-full border-r">
        <Card className="h-full rounded-none border-0 border-r">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MapPin />Rented Vehicles</CardTitle>
          </CardHeader>
          <CardContent className='p-0'>
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="space-y-2 p-4 pt-0">
                {rentedVehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    className={cn(
                      "flex items-center w-full p-2 rounded-lg text-left transition-colors",
                      selectedVehicle?.id === vehicle.id ? 'bg-primary/20' : 'hover:bg-muted'
                    )}
                  >
                    <Image
                      src={vehicle.image.imageUrl}
                      alt={vehicle.image.description}
                      width={64}
                      height={48}
                      className="rounded-md object-cover mr-4"
                      data-ai-hint={vehicle.image.imageHint}
                    />
                    <div>
                      <p className="font-semibold">{vehicle.name}</p>
                      <p className="text-sm text-muted-foreground">Plate: {vehicle.plate}</p>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-2/3 lg:w-3/4 h-full relative">
        <TrackingMap 
          vehicles={rentedVehicles.map(v => ({...v, location: vehiclePositions[v.id]}))}
          selectedVehicle={selectedVehicle} 
          onVehicleSelect={setSelectedVehicle}
        />
      </div>
    </div>
  );
}
