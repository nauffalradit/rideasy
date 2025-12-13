import { Vehicle, RentedVehicle } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    throw new Error(`Image with id "${id}" not found.`);
  }
  return image;
};

export const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Urban Cruiser',
    type: 'Car',
    pricePerDay: 55,
    seats: 4,
    transmission: 'Automatic',
    status: 'Available',
    image: findImage('car-1'),
    specs: {
      engine: '1.5L 4-Cylinder',
      fuelType: 'Gasoline',
      horsepower: 120,
    },
    gallery: [findImage('gallery-car-1-1'), findImage('gallery-car-1-2')],
  },
  {
    id: '2',
    name: 'Family Explorer',
    type: 'Car',
    pricePerDay: 70,
    seats: 7,
    transmission: 'Automatic',
    status: 'Rented',
    image: findImage('car-2'),
    specs: {
      engine: '2.0L Turbo',
      fuelType: 'Gasoline',
      horsepower: 240,
    },
    gallery: [findImage('car-2'), findImage('gallery-car-1-1')],
  },
  {
    id: '3',
    name: 'Asphalt Phantom',
    type: 'Car',
    pricePerDay: 150,
    seats: 2,
    transmission: 'Manual',
    status: 'Maintenance',
    image: findImage('car-3'),
    specs: {
      engine: '4.0L V8',
      fuelType: 'Gasoline',
      horsepower: 550,
    },
    gallery: [findImage('car-3'), findImage('gallery-car-1-2')],
  },
  {
    id: '4',
    name: 'Eco Mover',
    type: 'Car',
    pricePerDay: 60,
    seats: 8,
    transmission: 'Automatic',
    status: 'Available',
    image: findImage('car-4'),
    specs: {
      engine: 'Electric Motor',
      fuelType: 'Electric',
      horsepower: 200,
    },
    gallery: [findImage('car-4'), findImage('gallery-car-1-1')],
  },
  {
    id: '5',
    name: 'Speed Demon 500',
    type: 'Motorcycle',
    pricePerDay: 45,
    seats: 2,
    transmission: 'Manual',
    status: 'Rented',
    image: findImage('moto-1'),
    specs: {
      engine: '500cc V-Twin',
      fuelType: 'Gasoline',
      horsepower: 60,
    },
    gallery: [findImage('gallery-moto-1-1'), findImage('gallery-moto-1-2')],
  },
  {
    id: '6',
    name: 'Highway King',
    type: 'Motorcycle',
    pricePerDay: 65,
    seats: 2,
    transmission: 'Manual',
    status: 'Available',
    image: findImage('moto-2'),
    specs: {
      engine: '1200cc Parallel-Twin',
      fuelType: 'Gasoline',
      horsepower: 95,
    },
    gallery: [findImage('moto-2'), findImage('gallery-moto-1-1')],
  },
  {
    id: '7',
    name: 'City Hopper',
    type: 'Motorcycle',
    pricePerDay: 30,
    seats: 1,
    transmission: 'Automatic',
    status: 'Rented',
    image: findImage('moto-3'),
    specs: {
      engine: '150cc Single-Cylinder',
      fuelType: 'Gasoline',
      horsepower: 15,
    },
    gallery: [findImage('moto-3'), findImage('gallery-moto-1-2')],
  },
  {
    id: '8',
    name: 'Dune Dasher',
    type: 'Motorcycle',
    pricePerDay: 80,
    seats: 1,
    transmission: 'Manual',
    status: 'Available',
    image: findImage('moto-4'),
    specs: {
      engine: '800cc Boxer',
      fuelType: 'Gasoline',
      horsepower: 85,
    },
    gallery: [findImage('moto-4'), findImage('gallery-moto-1-1')],
  },
];

export const rentedVehicles: RentedVehicle[] = [
    {
        id: 'rent-1',
        vehicleId: '2',
        name: 'Family Explorer',
        plate: 'RD-001',
        location: { lat: 34.052235, lng: -118.243683 }, // Los Angeles
        image: findImage('car-2'),
    },
    {
        id: 'rent-2',
        vehicleId: '5',
        name: 'Speed Demon 500',
        plate: 'RD-002',
        location: { lat: 40.712776, lng: -74.005974 }, // New York
        image: findImage('moto-1'),
    },
    {
        id: 'rent-3',
        vehicleId: '7',
        name: 'City Hopper',
        plate: 'RD-003',
        location: { lat: 37.774929, lng: -122.419418 }, // San Francisco
        image: findImage('moto-3'),
    }
];

export const getVehicleById = (id: string) => {
    return vehicles.find(v => v.id === id);
}
