'use client';

import * as React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import type { RentedVehicle } from '@/lib/types';
import { icon } from 'leaflet';

const ICON = icon({
  iconUrl: "/marker.png",
  iconSize: [32, 32],
});

type TrackingMapProps = {
  vehicles: RentedVehicle[];
  selectedVehicle: RentedVehicle | null;
  onVehicleSelect: (vehicle: RentedVehicle | null) => void;
};

// This component will imperatively control the map's view (center and zoom).
function MapController({ vehicle }: { vehicle: RentedVehicle | null }) {
  const map = useMap();
  
  React.useEffect(() => {
    if (vehicle) {
      map.setView([vehicle.location.lat, vehicle.location.lng], 15);
    }
  }, [vehicle, map]);

  return null; // This component does not render anything itself.
}

export default function TrackingMap({ vehicles, selectedVehicle, onVehicleSelect }: TrackingMapProps) {
  // Set a default, static center for the initial map load.
  const initialCenter: [number, number] = [38.685, -97.822];
  const initialZoom = 4;

  return (
    <MapContainer 
        center={initialCenter} 
        zoom={initialZoom} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.id}
          position={[vehicle.location.lat, vehicle.location.lng]}
          icon={ICON}
          eventHandlers={{
            click: () => {
              onVehicleSelect(vehicle);
            },
          }}
        >
        </Marker>
      ))}
      {/* The MapController component will handle view changes without re-rendering MapContainer */}
      <MapController vehicle={selectedVehicle} />
    </MapContainer>
  );
}
