import { create } from 'zustand';

type Store = {
  step: number;
  values: Record<string, any>;
  onNext: () => void;
  onBack: () => void;
  setValues: (values: Record<string, any>) => void;
  reset: () => void;
};

export const useJobStore = create<Store>((set) => ({
  step: 0,
  values: {
    // companyLogo: 'https://assets.dev.hackquest.io/jobs/xHbrr063HYZ-5LEE86NfR.png'
  },
  onNext: () => set((state) => ({ step: state.step + 1 })),
  onBack: () => set((state) => ({ step: state.step - 1 })),
  setValues: (values) => set((state) => ({ values: { ...state.values, ...values } })),
  reset: () => set({ values: {}, step: 0 })
}));
