import type { PlaceHolderImages } from "./placeholder-images";

export type Vehicle = {
  id: string;
  name: string;
  type: 'Car' | 'Motorcycle';
  pricePerDay: number;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  status: 'Available' | 'Rented' | 'Maintenance';
  image: (typeof PlaceHolderImages)[number];
  specs: {
    engine: string;
    fuelType: 'Gasoline' | 'Electric' | 'Hybrid';
    horsepower: number;
  };
  gallery: (typeof PlaceHolderImages)[number][];
};

export type RentedVehicle = {
  id: string;
  vehicleId: string;
  name: string;
  plate: string;
  location: {
    lat: number;
    lng: number;
  };
  image: (typeof PlaceHolderImages)[number];
};
