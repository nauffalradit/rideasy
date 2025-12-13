
export type VehicleImage = {
  imageUrl: string;
  description: string;
  imageHint: string;
};

export type Vehicle = {
  id: string;
  name: string;
  type: 'Car' | 'Motorcycle';
  pricePerDay: number;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  status: 'Available' | 'Rented' | 'Maintenance';
  image: VehicleImage;
  specs: {
    engine: string;
    fuelType: 'Gasoline' | 'Electric' | 'Hybrid';
    horsepower: number;
  };
  gallery: VehicleImage[];
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
  image: VehicleImage;
};

    