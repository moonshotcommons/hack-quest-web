import { NotificationType } from '@/service/webApi/user/type';
import { create } from 'zustand';

export interface NotificationStateType {
  notificationList: NotificationType[];
  setNotificationList: (payload: NotificationType[]) => void;
  notificationTotal: number;
  setNotificationTotal: (payload: number) => void;
  isUnRead: boolean;
  setIsUnRead: (payload: boolean) => void;
  notificationLoading: boolean;
  setNotificationLoading: (payload: boolean) => void;
}

export const notificationStore = create<NotificationStateType>()((set) => ({
  notificationList: [],
  setNotificationList(payload) {
    set(() => ({ notificationList: payload }));
  },
  notificationTotal: 0,
  setNotificationTotal(payload) {
    set(() => ({ notificationTotal: payload }));
  },
  isUnRead: false,
  setIsUnRead(payload) {
    set(() => ({ isUnRead: payload }));
  },
  notificationLoading: false,
  setNotificationLoading(payload) {
    set(() => ({ notificationLoading: payload }));
  }
}));
