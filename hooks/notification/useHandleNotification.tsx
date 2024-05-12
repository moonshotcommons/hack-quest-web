import webApi from '@/service';
import { notificationStore } from '@/store/zustand/notificationStore';
import { useShallow } from 'zustand/react/shallow';
export const useHandleNotification = () => {
  const { setNotificationList, setIsUnRead, setNotificationLoading, setNotificationTotal } = notificationStore(
    useShallow((state) => ({
      setNotificationList: state.setNotificationList,
      setIsUnRead: state.setIsUnRead,
      setNotificationLoading: state.setNotificationLoading,
      setNotificationTotal: state.setNotificationTotal
    }))
  );

  const updateNotification = async (param?: { page?: number; limit?: number }) => {
    const pageInfo = {
      page: param?.page || 1,
      limit: param?.limit || 10
    };
    setNotificationLoading(true);
    let res = await webApi.userApi.getNotifications(pageInfo);
    setNotificationLoading(false);
    setNotificationList(res.data || []);
    setNotificationTotal(res.total);
    setIsUnRead(res.data.some((v) => !v.isRead));
  };

  return { updateNotification };
};
