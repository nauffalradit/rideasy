
'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { useVehicles } from '@/context/VehicleContext';
import { Skeleton } from '../ui/skeleton';

export default function VehicleList() {
  const { vehicles, isLoading } = useVehicles();
  const [filter, setFilter] = useState('All');

  const filteredVehicles = vehicles.filter(
    (vehicle) => filter === 'All' || vehicle.type === filter
  );
  
  if (isLoading) {
    return (
        <Card className="p-4">
            <div className="space-y-3">
                <Skeleton className="h-8 w-1/3 mx-auto" />
                <Skeleton className="h-[50px] border-b" />
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4 p-2">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/4" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                ))}
            </div>
        </Card>
    );
  }

  return (
    <Tabs defaultValue="All" onValueChange={setFilter} className="w-full">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 md:mb-4">
        <TabsTrigger value="All">All</TabsTrigger>
        <TabsTrigger value="Car">Cars</TabsTrigger>
        <TabsTrigger value="Motorcycle">Motorcycles</TabsTrigger>
      </TabsList>

      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Seats</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={vehicle.name}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={vehicle.image.imageUrl}
                    width="64"
                    data-ai-hint={vehicle.image.imageHint}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <Link
                    href={`/vehicles/${vehicle.id}`}
                    className="hover:underline"
                  >
                    {vehicle.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{vehicle.type}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  ${vehicle.pricePerDay}/day
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {vehicle.seats}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/vehicles/${vehicle.id}`}>
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Tabs>
  );
}

    