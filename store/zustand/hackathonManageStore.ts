import { HackathonJugingInfoType, SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import { create } from 'zustand';

export interface HackathonManageStateType {
  hackathon: SimpleHackathonInfo;
  setHackathon: (payload: SimpleHackathonInfo) => void;
  judgeInfo: HackathonJugingInfoType;
  setJudgeInfo: (payload: HackathonJugingInfoType) => void;
}

export const useHackathonManageStore = create<HackathonManageStateType>()((set) => ({
  hackathon: {} as SimpleHackathonInfo,
  setHackathon(payload) {
    set((state) => ({ hackathon: payload }));
  },
  judgeInfo: {} as HackathonJugingInfoType,
  setJudgeInfo(payload) {
    set((state) => ({ judgeInfo: payload }));
  }
}));
