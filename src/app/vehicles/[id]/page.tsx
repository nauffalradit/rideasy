'use client';

import { getVehicleById } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import VehicleDetailsPage from '@/components/vehicles/VehicleDetailsPage';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { useVehicles } from '@/context/VehicleContext';
import { useEffect, useState } from 'react';
import type { Vehicle } from '@/lib/types';

// This is a workaround for generating metadata in a client component.
// In a real app, this might be a server component fetching data.
export async function generateMetadata() {
  return {
    title: 'Vehicle Details - Rideasy',
    description: 'Details for a specific vehicle.',
  };
}

export default function VehiclePage() {
  const params = useParams();
  const { vehicles } = useVehicles();
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    if (id && vehicles.length > 0) {
      const foundVehicle = vehicles.find((v) => v.id === id);
      setVehicle(foundVehicle);
    }
    setLoading(false);
  }, [id, vehicles]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/vehicles">Vehicles</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{vehicle.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <VehicleDetailsPage vehicle={vehicle} />
    </div>
  );
}
