'use client';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import { useLoadUserInfo } from '@/hooks/auth/useGetUserInfo';
import useNavAuth from '@/hooks/router/userNavAuth';
import { useUserStore } from '@/store/zustand/userStore';
import { FC, ReactNode, useEffect } from 'react';

interface InitializeUserProviderProps {
  children: ReactNode;
}

const InitializeUserProvider: FC<InitializeUserProviderProps> = ({
  children
}) => {
  const { waitingLoadUserInfo } = useLoadUserInfo();
  useNavAuth(waitingLoadUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);
  const { updateMissionDataAll } = useGetMissionData();

  useEffect(() => {
    if (userInfo) {
      updateMissionDataAll();
    }
  }, [userInfo]);

  return <>{children}</>;
};

export default InitializeUserProvider;
