'use client';
import { useGetMissionData } from '@/hooks/useGetMissionData';
import { useGetUserInfo, useLoadUserInfo } from '@/hooks/useGetUserInfo';
import useNavAuth from '@/hooks/useNavPage/userNavAuth';
import { FC, ReactNode } from 'react';

interface InitializeUserProviderProps {
  children: ReactNode;
}

const InitializeUserProvider: FC<InitializeUserProviderProps> = ({
  children
}) => {
  const { waitingLoadUserInfo } = useLoadUserInfo();
  useNavAuth(waitingLoadUserInfo);
  const userInfo = useGetUserInfo();
  const { updateMissionDataAll } = useGetMissionData();

  if (userInfo) {
    updateMissionDataAll();
  }
  return <>{children}</>;
};

export default InitializeUserProvider;
