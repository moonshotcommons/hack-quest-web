import { useUserStore } from '@/store/zustand/userStore';
import { useEffect } from 'react';

export const useAuthRedirect = (callback: VoidFunction) => {
  const userInfo = useUserStore((state) => state.userInfo);

  useEffect(() => {
    if (!userInfo) {
      callback();
    }
  }, []);
};
