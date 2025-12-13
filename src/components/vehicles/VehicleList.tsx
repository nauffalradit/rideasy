'use client';

import { useState } from 'react';
import { vehicles } from '@/lib/data';
import VehicleCard from './VehicleCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function VehicleList() {
  const [filter, setFilter] = useState('All');

  const filteredVehicles = vehicles.filter(
    (vehicle) => filter === 'All' || vehicle.type === filter
  );

  return (
    <Tabs defaultValue="All" onValueChange={setFilter} className="w-full">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
        <TabsTrigger value="All">All</TabsTrigger>
        <TabsTrigger value="Car">Cars</TabsTrigger>
        <TabsTrigger value="Motorcycle">Motorcycles</TabsTrigger>
      </TabsList>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </Tabs>
  );
}
