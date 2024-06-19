import { create } from 'zustand';
import { Steps } from './steps';

interface HackathonOrgState {
  status: Record<string, boolean>;
  step: number;
  onStepChange: (step: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  updateStatus: (step: number, status: boolean) => void;
}

export const useHackathonOrgState = create<HackathonOrgState>((set, get) => ({
  status: {
    [Steps.BASIC_INFO]: false,
    [Steps.JUDGING]: false,
    [Steps.LINKS]: false,
    [Steps.COVER]: false,
    [Steps.TIMELINE]: false,
    [Steps.REWARDS]: false,
    [Steps.APPLICATION]: false,
    [Steps.SUBMISSION]: false
  },
  step: Steps.BASIC_INFO,
  onStepChange: (step) => set({ step: step }),
  onPrevious: () => set({ step: get().step - 1 }),
  onNext: () => set({ step: get().step + 1 }),
  updateStatus: (step, status) => set((state) => ({ status: { ...state.status, [step]: status } }))
}));
