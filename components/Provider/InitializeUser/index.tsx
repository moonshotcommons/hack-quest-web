'use client';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import useNavAuth from '@/hooks/router/userNavAuth';
import { useUserStore } from '@/store/zustand/userStore';
import { FC, ReactNode, useEffect } from 'react';
import { useHandleNotification } from '@/hooks/notification/useHandleNotification';
import { useGetEcosystemData } from '@/hooks/ecosystem/useGetEcosystemData';
import { Lang } from '@/i18n/config';
import { LoginResponse } from '@/service/webApi/user/type';
import { useLoadUserInfo } from '@/hooks/auth/useGetUserInfo';

interface InitializeUserProviderProps {
  children: ReactNode;
  lang: Lang;
  userInfo: Partial<LoginResponse> | null;
}

const InitializeUserProvider: FC<InitializeUserProviderProps> = ({ lang, children, userInfo: propUserInfo }) => {
  const { waitingLoadUserInfo } = useLoadUserInfo(propUserInfo);
  useNavAuth(propUserInfo, waitingLoadUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);
  const { updateMissionDataAll } = useGetMissionData();
  const { updateNotification } = useHandleNotification();
  const { getEcosystems } = useGetEcosystemData();

  useEffect(() => {
    getEcosystems({ lang });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  console.log(propUserInfo, userInfo);
  useEffect(() => {
    if (propUserInfo || userInfo) {
      updateMissionDataAll();
      updateNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propUserInfo, userInfo]);

  return <>{children}</>;
};

export default InitializeUserProvider;
