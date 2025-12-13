
import VehicleList from '@/components/vehicles/VehicleList';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function VehiclesPage() {
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
            <BreadcrumbPage>Vehicles</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Vehicle Fleet</h2>
          <p className="text-muted-foreground">
            Manage your vehicles here.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Vehicle
          </Button>
        </div>
      </div>
      <VehicleList />
    </div>
  );
}
