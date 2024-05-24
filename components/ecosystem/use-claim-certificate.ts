import { create } from 'zustand';

interface Store {
  open: boolean;
  step: number;
  onClose: () => void;
  onNext: () => void;
}

export const useClaimCertificate = create<Store>((set) => ({
  open: false,
  step: 1,
  onClose: () => set({ open: false }),
  onNext: () => set((state) => ({ step: state.step + 1 }))
}));
