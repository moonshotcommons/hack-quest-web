'use client';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useEffect } from 'react';

export const useNeedPCRedirect = () => {
  const setTipsModalOpenState = useGlobalStore((state) => state.setTipsModalOpenState);

  useEffect(() => {
    setTipsModalOpenState({
      open: true,
      isRedirect: true
    });
  }, []);
};
