'use client';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import useNavAuth from '@/hooks/router/userNavAuth';
import { useUserStore } from '@/store/zustand/userStore';
import { FC, ReactNode, useEffect } from 'react';
import { useHandleNotification } from '@/hooks/notification/useHandleNotification';
import { useGetEcosystemData } from '@/hooks/ecosystem/useGetEcosystemData';
import { Lang } from '@/i18n/config';
import { LoginResponse } from '@/service/webApi/user/type';

interface InitializeUserProviderProps {
  children: ReactNode;
  lang: Lang;
  userInfo: Partial<LoginResponse> | null;
}

const InitializeUserProvider: FC<InitializeUserProviderProps> = ({ lang, children, userInfo }) => {
  useNavAuth(userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const { updateMissionDataAll } = useGetMissionData();
  const { updateNotification } = useHandleNotification();
  const { getEcosystems } = useGetEcosystemData();

  useEffect(() => {
    getEcosystems({ lang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
      setTimeout(() => {
        updateMissionDataAll();
        updateNotification();
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return <>{children}</>;
};

export default InitializeUserProvider;
