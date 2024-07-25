import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import { create } from 'zustand';

export interface HackathonManageStateType {
  hackathon: SimpleHackathonInfo;
  setHackathon: (payload: SimpleHackathonInfo) => void;
}

export const useHackathonManageStore = create<HackathonManageStateType>()((set) => ({
  hackathon: {} as SimpleHackathonInfo,
  setHackathon(payload) {
    set((state) => ({ hackathon: payload }));
  }
}));
