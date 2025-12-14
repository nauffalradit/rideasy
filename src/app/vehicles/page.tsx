
'use client';

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
import { useTranslation } from '@/hooks/use-translation';

export default function VehiclesPage() {
  const { t } = useTranslation();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{t('dashboard')}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t('vehicles')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t('vehicleFleet')}</h2>
          <p className="text-muted-foreground">
            {t('vehicleFleetDesc')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/vehicles/new">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('addVehicle')}
            </Link>
          </Button>
        </div>
      </div>
      <VehicleList />
    </div>
  );
}
