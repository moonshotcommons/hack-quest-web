'use client';
import { useRouter } from 'next-nprogress-bar';
import { useCallback } from 'react';
import useGetDevice from '../utils/useGetDevice';

export const useRedirect = () => {
  const router = useRouter();
  const isMobile = useGetDevice();
  const redirectToUrl = useCallback((url: string, isReplace = false) => {
    if (isMobile) {
      if (isReplace) router.replace(`/mobile${url}`);
      else router.push(`/mobile${url}`);
      return;
    }
    if (isReplace) {
      router.replace(url);
    } else {
      router.push(url);
    }
  }, []);

  return {
    redirectToUrl
  };
};
