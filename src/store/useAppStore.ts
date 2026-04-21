import { create } from 'zustand';

interface AppState {
  currentLocation: string | null;
  destination: string | null;
  setCurrentLocation: (loc: string) => void;
  setDestination: (dest: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentLocation: null,
  destination: null,
  setCurrentLocation: (loc) => set({ currentLocation: loc }),
  setDestination: (dest) => set({ destination: dest }),
}));