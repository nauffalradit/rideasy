'use client';

import * as React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import type { RentedVehicle } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type TrackingMapProps = {
  vehicles: RentedVehicle[];
  selectedVehicle: RentedVehicle | null;
  onVehicleSelect: (vehicle: RentedVehicle | null) => void;
};

export default function TrackingMap({ vehicles, selectedVehicle, onVehicleSelect }: TrackingMapProps) {
  const mapCenter = selectedVehicle
    ? selectedVehicle.location
    : { lat: 38.685, lng: -97.822 }; // Center of US
  
  const mapRef = React.useRef(null);
  
  React.useEffect(() => {
    if (selectedVehicle && mapRef.current) {
      // @ts-ignore
      mapRef.current.panTo(selectedVehicle.location);
    }
  }, [selectedVehicle]);

  if (!API_KEY) {
    return (
        <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="text-center p-4">
                <h2 className="text-lg font-semibold">Google Maps API Key is missing.</h2>
                <p className="text-muted-foreground">Please add your key to the .env.local file to see the map.</p>
            </div>
        </div>
    )
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        ref={mapRef}
        defaultZoom={selectedVehicle ? 15 : 4}
        zoom={selectedVehicle ? 15 : 4}
        center={mapCenter}
        mapId="rideasy_map"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        className='w-full h-full'
        style={{ width: '100%', height: '100%' }}
      >
        {vehicles.map((vehicle) => (
          <AdvancedMarker
            key={vehicle.id}
            position={vehicle.location}
            onClick={() => onVehicleSelect(vehicle)}
          >
            <Pin background={'#77DD77'} glyphColor={'#FFF'} borderColor={'#FFF'} />
          </AdvancedMarker>
        ))}
        {selectedVehicle && (
          <InfoWindow
            position={selectedVehicle.location}
            onCloseClick={() => onVehicleSelect(null)}
          >
            <div className="p-1 max-w-xs">
              <div className="flex items-center gap-4">
                <Image
                  src={selectedVehicle.image.imageUrl}
                  alt={selectedVehicle.image.description}
                  width={80}
                  height={60}
                  className="rounded-md object-cover"
                  data-ai-hint={selectedVehicle.image.imageHint}
                />
                <div>
                  <h3 className="font-bold">{selectedVehicle.name}</h3>
                  <p className="text-sm">Plate: {selectedVehicle.plate}</p>
                  <p className="text-xs text-muted-foreground">
                    Lat: {selectedVehicle.location.lat.toFixed(4)}, Lng: {selectedVehicle.location.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}
