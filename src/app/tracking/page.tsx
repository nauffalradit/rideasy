'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import type { RentedVehicle } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MapPin, Loader2, X } from 'lucide-react';
import { useVehicles } from '@/context/VehicleContext';
import { Button } from '@/components/ui/button';

// Dynamically import the map component to ensure it's client-side only
const TrackingMap = dynamic(() => import('@/components/tracking/TrackingMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <Loader2 className="animate-spin h-8 w-8 text-primary" />
      <p className="ml-2">Memuat peta...</p>
    </div>
  ),
});

// This component will manage the state and logic for tracking
function VehicleTracker() {
  const { vehicles } = useVehicles();

  // Filter for only rented vehicles to track them
  const rentedVehicles: RentedVehicle[] = React.useMemo(() => 
    vehicles
      .filter(v => v.status === 'Rented')
      .map(v => ({
        id: v.id,
        vehicleId: v.id,
        name: v.name,
        plate: `RD-${v.id.padStart(3, '0')}`,
        // Initial location - will be updated by the simulation
        location: { lat: 34.052235 - Math.random() * 20, lng: -118.243683 - Math.random() * 20 },
        image: v.image,
      })),
    [vehicles]
  );
  
  const [selectedVehicle, setSelectedVehicle] = React.useState<RentedVehicle | null>(null);
  const [vehiclePositions, setVehiclePositions] = React.useState<Record<string, { lat: number; lng: number }>>({});

  // Initialize positions when rentedVehicles are available
  React.useEffect(() => {
    if (rentedVehicles.length > 0) {
      setVehiclePositions(
        rentedVehicles.reduce((acc, v) => ({ ...acc, [v.id]: v.location }), {})
      );
      if (!selectedVehicle) {
        setSelectedVehicle(rentedVehicles[0]);
      }
    }
  }, [rentedVehicles, selectedVehicle]);


  // Simulate vehicle movement
  React.useEffect(() => {
    const interval = setInterval(() => {
      setVehiclePositions((prev) => {
        const newPositions = { ...prev };
        for (const id in newPositions) {
          newPositions[id] = {
            lat: newPositions[id].lat + (Math.random() - 0.5) * 0.005,
            lng: newPositions[id].lng + (Math.random() - 0.5) * 0.005,
          };
        }
        return newPositions;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const vehiclesWithUpdatedPositions = React.useMemo(() => 
    rentedVehicles.map(v => ({ ...v, location: vehiclePositions[v.id] || v.location })),
    [rentedVehicles, vehiclePositions]
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="w-full md:w-1/3 lg:w-1/4 h-full border-r">
        <Card className="h-full rounded-none border-0 border-r">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin /> Rented Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-10rem)]">
              <div className="space-y-2 p-4 pt-0">
                {rentedVehicles.length === 0 ? (
                    <p className="p-4 text-center text-muted-foreground">No rented vehicles to track.</p>
                ) : (
                    vehiclesWithUpdatedPositions.map((vehicle) => (
                    <button
                        key={vehicle.id}
                        onClick={() => setSelectedVehicle(vehicle)}
                        className={cn(
                        'flex items-center w-full p-2 rounded-lg text-left transition-colors',
                        selectedVehicle?.id === vehicle.id
                            ? 'bg-primary/20'
                            : 'hover:bg-muted'
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
                        <p className="text-sm text-muted-foreground">
                            Plate: {vehicle.plate}
                        </p>
                        </div>
                    </button>
                    ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-2/3 lg:w-3/4 h-full relative">
        <TrackingMap
          vehicles={vehiclesWithUpdatedPositions}
          selectedVehicle={selectedVehicle}
          onVehicleSelect={setSelectedVehicle}
        />
        {selectedVehicle && (
          <Card className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-sm shadow-2xl z-[1000]">
             <CardHeader className="p-4">
                <div className="flex items-center gap-4">
                    <Image
                        src={selectedVehicle.image.imageUrl}
                        alt={selectedVehicle.image.description}
                        width={100}
                        height={75}
                        className="rounded-lg object-cover"
                        data-ai-hint={selectedVehicle.image.imageHint}
                    />
                    <div>
                        <CardTitle className="text-lg">{selectedVehicle.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Plate: {selectedVehicle.plate}</p>
                         <p className="text-xs text-muted-foreground mt-1">
                            Lat: {selectedVehicle.location.lat.toFixed(4)}, Lng: {selectedVehicle.location.lng.toFixed(4)}
                        </p>
                    </div>
                </div>
            </CardHeader>
             <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 z-10"
                onClick={() => setSelectedVehicle(null)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

// The main page component is now simpler
export default function TrackingPage() {
    return <VehicleTracker />;
}
