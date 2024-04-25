import { create } from 'zustand';

export interface PressKitStateType {
  sidebarOpen: boolean;
  setSidebarOpen: (payload: boolean) => void;
}

export const usePressKitStore = create<PressKitStateType>()((set) => ({
  sidebarOpen: false,
  setSidebarOpen(payload) {
    set((state) => ({ sidebarOpen: payload }));
  }
}));
