'use client';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import { useLoadUserInfo } from '@/hooks/auth/useGetUserInfo';
import useNavAuth from '@/hooks/router/userNavAuth';
import { useUserStore } from '@/store/zustand/userStore';
import { FC, ReactNode, useEffect } from 'react';
import { TOKEN_KEY, setToken } from '@/helper/user-token';
import { setCookie } from 'cookies-next';
import { useHandleNotification } from '@/hooks/notification/useHandleNotification';

interface InitializeUserProviderProps {
  children: ReactNode;
}

const InitializeUserProvider: FC<InitializeUserProviderProps> = ({ children }) => {
  const { waitingLoadUserInfo } = useLoadUserInfo();
  useNavAuth(waitingLoadUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);
  const { updateMissionDataAll } = useGetMissionData();
  const { updateNotification } = useHandleNotification();

  useEffect(() => {
    if (userInfo) {
      const token = userInfo.token;
      token && setCookie(TOKEN_KEY, token);
      token && setToken(token);
      updateMissionDataAll();
      updateNotification();
    }
  }, [userInfo]);

  return <>{children}</>;
};

export default InitializeUserProvider;
