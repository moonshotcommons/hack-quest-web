import NotificationIcon from '@/components/Common/Icon/NotificationIcon';
import { useHandleNotification } from '@/hooks/notification/useHandleNotification';
import { notificationStore } from '@/store/zustand/notificationStore';
import { useUserStore } from '@/store/zustand/userStore';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';

interface NotificationProp {}

const Notification: React.FC<NotificationProp> = () => {
  const { updateNotification } = useHandleNotification();
  const { notificationModalOpen, setNotificationModalOpen } = useUserStore(
    useShallow((state) => ({
      notificationModalOpen: state.notificationModalOpen,
      setNotificationModalOpen: state.setNotificationModalOpen
    }))
  );
  const { isUnRead } = notificationStore(
    useShallow((state) => ({
      isUnRead: state.isUnRead
    }))
  );
  return (
    <div
      onClick={() => {
        setNotificationModalOpen(!notificationModalOpen);
        if (!notificationModalOpen) updateNotification();
      }}
      className={`relative flex items-center rounded-[8px] p-[6px] hover:bg-neutral-off-white ${notificationModalOpen && 'bg-neutral-off-white'}`}
    >
      <NotificationIcon />
      {isUnRead && (
        <div className="absolute right-[3px] top-[3px] h-[12px] w-[12px] rounded-[50%] bg-yellow-dark"></div>
      )}
    </div>
  );
};

export default Notification;
