import { create } from 'zustand';
import { NavType } from '@/components/Mobile/MobLayout/constant';
interface TipsModalOpenStateType {
  open: boolean;
  isRedirect: boolean;
}

export interface GlobalStateType {
  tipsModalOpenState: TipsModalOpenStateType;
  playgroundSelectModalOpen: boolean;
  setTipsModalOpenState: (open: TipsModalOpenStateType | boolean) => void;
  setPlaygroundSelectModalOpen: (open: boolean) => void;
  mobileNavModalToggleOpenHandle: {
    toggleOpen: () => void;
    isOpen: boolean;
    setNavType: (payload: NavType) => void;
    setModuleProps: (payload: object) => void;
  };
  setMobileNavModalToggleOpenHandle: (payload: {
    toggleOpen: () => void;
    isOpen: boolean;
    setNavType: (payload: NavType) => void;
    setModuleProps: (payload: object) => void;
  }) => void;
}

export const useGlobalStore = create<GlobalStateType>()((set) => ({
  tipsModalOpenState: {
    open: false,
    isRedirect: false
  },
  playgroundSelectModalOpen: false,
  mobileNavModalToggleOpenHandle: {
    isOpen: false,
    setNavType() {},
    setModuleProps() {},
    toggleOpen() {}
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
  },
  setPlaygroundSelectModalOpen(payload) {
    set((state) => ({ playgroundSelectModalOpen: payload }));
  },
  setMobileNavModalToggleOpenHandle(payload) {
    set((state) => ({ mobileNavModalToggleOpenHandle: payload }));
  }
}));
