
'use client';

import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { Vehicle } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

// The data structure for a new vehicle, omitting the ID.
type NewVehicleData = Omit<Vehicle, 'id'>;

interface VehicleContextType {
  vehicles: Vehicle[];
  isLoading: boolean;
  addVehicle: (vehicle: NewVehicleData) => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
  const firestore = useFirestore();
  
  const vehiclesCollection = useMemoFirebase(
    () => collection(firestore, 'vehicles'),
    [firestore]
  );
  
  const { data: vehicles, isLoading } = useCollection<Omit<Vehicle, 'id'>>(vehiclesCollection);

  const addVehicle = (vehicleData: NewVehicleData) => {
    addDocumentNonBlocking(vehiclesCollection, vehicleData);
  };

  const vehicleList = useMemo(() => {
    return vehicles ? vehicles.map(v => ({ ...v, id: v.id })) : [];
  }, [vehicles]);


  return (
    <VehicleContext.Provider value={{ vehicles: vehicleList, addVehicle, isLoading }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};

    