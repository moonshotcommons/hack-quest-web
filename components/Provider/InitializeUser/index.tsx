'use client';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import { useLoadUserInfo } from '@/hooks/auth/useGetUserInfo';
import useNavAuth from '@/hooks/router/userNavAuth';
import { useUserStore } from '@/store/zustand/userStore';
import { FC, ReactNode, useEffect } from 'react';
import { TOKEN_KEY, getToken } from '@/helper/user-token';
import { setCookie } from 'cookies-next';
import { useHandleNotification } from '@/hooks/notification/useHandleNotification';
import { useGetEcosystemData } from '@/hooks/ecosystem/useGetEcosystemData';

interface InitializeUserProviderProps {
  children: ReactNode;
}

const InitializeUserProvider: FC<InitializeUserProviderProps> = ({ children }) => {
  const { waitingLoadUserInfo } = useLoadUserInfo();
  useNavAuth(waitingLoadUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);
  const { updateMissionDataAll } = useGetMissionData();
  const { updateNotification } = useHandleNotification();
  const { getEcosystems } = useGetEcosystemData();

  useEffect(() => {
    getEcosystems();
    if (userInfo) {
      const token = getToken();
      token && setCookie(TOKEN_KEY, token);
      updateMissionDataAll();
      updateNotification();
    }
  }, [userInfo]);

  return <>{children}</>;
};

export default InitializeUserProvider;
