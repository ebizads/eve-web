import { create } from "zustand";

export interface Vehicle {
  name: string;
  driver: string;
  plateNo: string;
  driverContact: string;
  passengerName: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: "Available" | "Idle" | "On Trip";
  speed: number;
  battery: number;
  rating: number;
}

interface VehicleStore {
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
}

export const useVehicleStore = create<VehicleStore>((set) => ({
  selectedVehicle: null,
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
}));
