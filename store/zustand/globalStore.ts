import { create } from 'zustand';

interface TipsModalOpenStateType {
  open: boolean;
  isRedirect: boolean;
}

export interface GlobalStateType {
  tipsModalOpenState: TipsModalOpenStateType;
  setTipsModalOpenState: (open: TipsModalOpenStateType | boolean) => void;
}

export const useGlobalStore = create<GlobalStateType>()((set) => ({
  tipsModalOpenState: {
    open: false,
    isRedirect: false
  },
  setTipsModalOpenState(payload) {
    set((state) => {
      if (typeof payload === 'boolean') {
        return {
          tipsModalOpenState: {
            open: payload,
            isRedirect: false
          }
        };
      }
      return {
        tipsModalOpenState: {
          open: payload.open,
          isRedirect: payload.isRedirect
        }
      };
    });
  }
}));
