import { create } from 'zustand';

interface Store {
  open: boolean;
  certificate: any;
  onOpen: (certificate: any) => void;
  onClose: () => void;
}

export const useMintCertificate = create<Store>((set) => ({
  open: false,
  certificate: null,
  onOpen: (certificate) => set({ open: true, certificate }),
  onClose: () => set({ open: false, certificate: null })
}));
