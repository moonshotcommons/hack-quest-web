import { HackathonType } from '@/service/webApi/resourceStation/type';
import { create } from 'zustand';

export interface HackathonManageStateType {
  hackathon: HackathonType | null;
  setHackathon: (payload: HackathonType) => void;
}

export const useHackathonManageStore = create<HackathonManageStateType>()((set) => ({
  hackathon: null,
  setHackathon(payload) {
    set((state) => ({ hackathon: payload }));
  }
}));
