'use client';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import { useLoadUserInfo } from '@/hooks/auth/useGetUserInfo';
import useNavAuth from '@/hooks/router/userNavAuth';
import { useUserStore } from '@/store/zustand/userStore';
import { FC, ReactNode, useEffect } from 'react';
import { TOKEN_KEY, setToken } from '@/helper/user-token';
import { setCookie } from 'cookies-next';
import { useHandleNotification } from '@/hooks/notification/useHandleNotification';
import { useGetEcosystemData } from '@/hooks/ecosystem/useGetEcosystemData';
import { Lang } from '@/i18n/config';

interface InitializeUserProviderProps {
  children: ReactNode;
  lang: Lang;
}

const InitializeUserProvider: FC<InitializeUserProviderProps> = ({ lang, children }) => {
  const { waitingLoadUserInfo } = useLoadUserInfo();
  useNavAuth(waitingLoadUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);
  const { updateMissionDataAll } = useGetMissionData();
  const { updateNotification } = useHandleNotification();
  const { getEcosystems } = useGetEcosystemData();

  useEffect(() => {
    getEcosystems({ lang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (userInfo) {
      const token = userInfo.token;
      token && setCookie(TOKEN_KEY, token);
      token && setToken(token);
      updateMissionDataAll();
      updateNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return <>{children}</>;
};

export default InitializeUserProvider;
