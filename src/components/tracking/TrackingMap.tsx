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

// Component to handle map view changes without re-rendering the whole map
const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function TrackingMap({ vehicles, selectedVehicle, onVehicleSelect }: TrackingMapProps) {
  const mapCenter: [number, number] = selectedVehicle
    ? [selectedVehicle.location.lat, selectedVehicle.location.lng]
    : [38.685, -97.822]; // Default to center of US if no vehicle is selected

  const zoomLevel = selectedVehicle ? 15 : 4;

  return (
    <MapContainer 
        key="tracking-map"
        center={mapCenter} 
        zoom={zoomLevel} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        // placeholder component to prevent re-initialization issues
        // placeholder={<div className="w-full h-full bg-muted animate-pulse" />}
    >
       <ChangeView center={mapCenter} zoom={zoomLevel} />
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
    </MapContainer>
  );
}
