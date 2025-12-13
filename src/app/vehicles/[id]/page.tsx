import { getVehicleById } from '@/lib/data';
import { notFound } from 'next/navigation';
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
