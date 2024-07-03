import { create } from 'zustand';
import { Steps } from './steps';

interface HackathonOrgState {
  status: Record<string, boolean>;
  step: string;
  onStepChange: (step: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  updateStatus: (step: string, status: boolean) => void;
  reset: () => void;
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
  onPrevious: () => set({ step: get().step }),
  onNext: () => set({ step: get().step }),
  updateStatus: (step, status) => set((state) => ({ status: { ...state.status, [step]: status } })),
  reset: () => set({ status: {}, step: Steps.BASIC_INFO })
}));
