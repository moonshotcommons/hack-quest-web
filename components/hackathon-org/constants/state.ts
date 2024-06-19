import { create } from 'zustand';
import { Steps } from './steps';

interface HackathonOrgState {
  status: Record<string, boolean>;
  currentStep: number;
  onChangeStep: (step: number) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
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
  currentStep: Steps.BASIC_INFO,
  onChangeStep: (step) => set({ currentStep: step }),
  onPrevStep: () => set({ currentStep: get().currentStep - 1 }),
  onNextStep: () => set({ currentStep: get().currentStep + 1 }),
  updateStatus: (step, status) => set((state) => ({ status: { ...state.status, [step]: status } }))
}));
