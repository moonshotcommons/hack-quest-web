import { IntlEnum } from '@/components/Web/Layout/LaunchPage/Navbar/type';
import { create } from 'zustand';

interface TipsModalOpenStateType {
  open: boolean;
  isRedirect: boolean;
}

export interface GlobalStateType {
  tipsModalOpenState: TipsModalOpenStateType;
  playgroundSelectModalOpen: boolean;
  setTipsModalOpenState: (open: TipsModalOpenStateType | boolean) => void;
  setPlaygroundSelectModalOpen: (open: boolean) => void;
  intl: IntlEnum;
  setIntl: (intl: IntlEnum) => void;
}

export const useGlobalStore = create<GlobalStateType>()((set) => ({
  tipsModalOpenState: {
    open: false,
    isRedirect: false
  },
  playgroundSelectModalOpen: false,
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
  },
  setPlaygroundSelectModalOpen(payload) {
    set((state) => ({ playgroundSelectModalOpen: payload }));
  },
  intl: IntlEnum.EN,
  setIntl(intl) {
    set(() => ({ intl }));
  }
}));
