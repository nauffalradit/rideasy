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
            <div className="text-center p-8 border rounded-lg bg-background shadow-md">
                <h2 className="text-xl font-bold text-destructive">Konfigurasi Peta Diperlukan</h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Untuk menampilkan peta, Anda perlu menambahkan Google Maps API Key. Silakan buat file `.env.local` di root proyek Anda dan tambahkan baris berikut:
                </p>
                <pre className="mt-4 p-2 rounded-md bg-gray-100 text-sm text-left dark:bg-gray-800">
                  <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=KUNCI_API_ANDA_DISINI</code>
                </pre>
                 <p className="text-muted-foreground mt-2 text-xs">
                  Pastikan untuk mengganti `KUNCI_API_ANDA_DISINI` dengan kunci API Anda yang sebenarnya dan restart server pengembangan.
                </p>
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
