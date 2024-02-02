import { create } from 'zustand';

export interface GlobalStateType {
  playgroundSelectModalOpen: boolean;
  setPlaygroundSelectModalOpen: (open: boolean) => void;
}

export const useGlobalStore = create<GlobalStateType>()((set) => ({
  playgroundSelectModalOpen: false,
  setPlaygroundSelectModalOpen(payload) {
    set((state) => ({ playgroundSelectModalOpen: payload }));
  }
}));
