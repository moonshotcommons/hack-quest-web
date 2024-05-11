import { create } from 'zustand';

import { removeToken } from '@/helper/user-token';
import { LoginResponse } from '@/service/webApi/user/type';

export enum AuthType {
  LOGIN = 'login',
  SIGN_UP = 'sign-up',
  EMAIL_VERIFY = 'email-verify',
  FORGOT_PASSWORD = 'forgot-password',
  VERIFYING = 'verifying',
  VERIFYING_FAIL = 'verifying-fail',
  VERIFYING_SUCCESS = 'verifying-success',
  CHANGE_PASSWORD = 'change-password',
  INVITE_CODE = 'invite_code'
}

export const callbackMap = {
  [AuthType.VERIFYING]: AuthType.VERIFYING,
  [AuthType.CHANGE_PASSWORD]: AuthType.CHANGE_PASSWORD
};

interface AuthRouteType {
  type: AuthType;
  prevType?: AuthType;
  params: Record<string, any>;
}

export interface UserStateType {
  userInfo: Partial<LoginResponse> | null;
  settingsOpen: boolean;
  authRouteType: AuthRouteType;
  authModalOpen: boolean;
  setUserInfo: (payload: Partial<LoginResponse> | null) => void;
  userSignOut: () => void;
  setSettingsOpen: (payload: boolean) => void;
  setAuthType: (payload: AuthRouteType | AuthType) => void;
  setAuthModalOpen: (open: boolean) => void;
  notificationModalOpen: boolean;
  setNotificationModalOpen: (open: boolean) => void;
}

export const useUserStore = create<UserStateType>()((set) => ({
  userInfo: null,
  settingsOpen: false,
  authModalOpen: false,
  notificationModalOpen: false,
  authRouteType: {
    type: AuthType.LOGIN,
    prevType: AuthType.LOGIN,
    params: {}
  },

  setUserInfo(payload) {
    set((state) => ({ userInfo: payload }));
  },
  setAuthModalOpen(payload) {
    set((state) => ({ authModalOpen: payload }));
  },
  userSignOut() {
    removeToken();
    set((state) => ({ userInfo: null }));
  },

  setSettingsOpen(payload) {
    set((state) => ({ settingsOpen: payload }));
  },
  setNotificationModalOpen(payload) {
    set((state) => ({ notificationModalOpen: payload }));
  },

  setAuthType(payload) {
    if (!payload) return;
    set((state) => {
      const types = Object.values(AuthType);
      if (types.includes(payload as AuthType)) {
        payload = payload as AuthType;
        payload = {
          type: payload,
          prevType: state.authRouteType.type,
          params: {}
        };
      } else if (types.includes((payload as AuthRouteType)?.type)) {
        payload = payload as AuthRouteType;
        payload = {
          type: payload.type,
          prevType: state.authRouteType.type,
          params: payload.params || {}
        };
      }
      return { authRouteType: payload as AuthRouteType };
    });
  }
}));
