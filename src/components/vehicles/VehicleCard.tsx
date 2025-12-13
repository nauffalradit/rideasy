import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Vehicle } from '@/lib/types';
import { ArrowRight, Car, Bike } from 'lucide-react';

type VehicleCardProps = {
  vehicle: Vehicle;
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out">
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={vehicle.image.imageUrl}
            alt={vehicle.image.description}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={vehicle.image.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-headline mb-2">{vehicle.name}</CardTitle>
            <Badge variant="secondary" className="flex items-center gap-1">
                {vehicle.type === 'Car' ? <Car size={16} /> : <Bike size={16} />}
                {vehicle.type}
            </Badge>
        </div>
        <p className="text-muted-foreground text-sm">{vehicle.transmission} &bull; {vehicle.seats} seats</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-muted/50">
        <div>
          <span className="text-2xl font-bold">${vehicle.pricePerDay}</span>
          <span className="text-muted-foreground">/day</span>
        </div>
        <Button asChild>
          <Link href={`/vehicles/${vehicle.id}`}>
            Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
