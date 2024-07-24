import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import { create } from 'zustand';

export interface HackathonManageStateType {
  hackathon: SimpleHackathonInfo | null;
  setHackathon: (payload: SimpleHackathonInfo) => void;
}

export const useHackathonManageStore = create<HackathonManageStateType>()((set) => ({
  hackathon: null,
  setHackathon(payload) {
    set((state) => ({ hackathon: payload }));
  }
}));
