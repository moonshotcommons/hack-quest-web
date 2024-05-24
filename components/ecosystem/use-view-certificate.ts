import { create } from 'zustand';

interface Store {
  open: boolean;
  onClose: () => void;
}

export const useViewCertificate = create<Store>((set) => ({
  open: false,
  onClose: () => set({ open: false })
}));
