import { getVehicleById } from '@/lib/data';
import { notFound } from 'next/navigation';
import VehicleDetailsPage from '@/components/vehicles/VehicleDetailsPage';

type VehiclePageProps = {
  params: {
    id: string;
  };
};

export default function VehiclePage({ params }: VehiclePageProps) {
  const vehicle = getVehicleById(params.id);

  if (!vehicle) {
    notFound();
  }

  return <VehicleDetailsPage vehicle={vehicle} />;
}

export async function generateMetadata({ params }: VehiclePageProps) {
  const vehicle = getVehicleById(params.id);

  if (!vehicle) {
    return { title: 'Vehicle Not Found' };
  }

  return {
    title: `${vehicle.name} - Rideasy`,
    description: `Rent the ${vehicle.name}. See details, specs, and availability.`,
  };
}
