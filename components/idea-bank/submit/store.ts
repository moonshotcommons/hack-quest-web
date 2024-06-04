import { create } from 'zustand';

type Store = {
  open: boolean;
  step: number;
  values: Record<string, any>;
  onOpen: () => void;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  setValues: (values: Record<string, any>) => void;
};

export const useSubmitModal = create<Store>((set) => ({
  open: false,
  step: 0,
  values: {},
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
  onNext: () => set((state) => ({ step: state.step + 1 })),
  onBack: () => set((state) => ({ step: state.step - 1 })),
  setValues: (values) => set((state) => ({ values: { ...state.values, ...values } }))
}));
