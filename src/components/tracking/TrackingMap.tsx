'use client';

import * as React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { RentedVehicle } from '@/lib/types';
import Image from 'next/image';
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

// Component to handle map view changes
const ChangeView = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function TrackingMap({ vehicles, selectedVehicle, onVehicleSelect }: TrackingMapProps) {
  const mapCenter: [number, number] = selectedVehicle
    ? [selectedVehicle.location.lat, selectedVehicle.location.lng]
    : [38.685, -97.822]; // Center of US

  const zoomLevel = selectedVehicle ? 15 : 4;

  // Leaflet needs a defined height to render.
  // The parent container `w-full h-full` should provide this.
  return (
    <MapContainer center={mapCenter} zoom={zoomLevel} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
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

      {selectedVehicle && (
        <Popup position={[selectedVehicle.location.lat, selectedVehicle.location.lng]}>
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
        </Popup>
      )}
    </MapContainer>
  );
}