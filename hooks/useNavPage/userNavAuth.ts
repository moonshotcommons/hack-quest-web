'use client';
import { useEffect } from 'react';

import { V2_LANDING_PATH, isNoNeedUserInfo } from '@/constants/nav';
import { getToken } from '@/helper/user-token';
import { useRedirect } from '../useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useCheckPathname, useCustomPathname } from '../useCheckPathname';

function useNavAuth(waitingUserData: boolean) {
  const userInfo = useUserStore((state) => state.userInfo);
  const setAuthType = useUserStore((state) => state.setAuthType);
  const { redirectToUrl } = useRedirect();
  const pathname = useCustomPathname();
  const { isLandingPage } = useCheckPathname();
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );

  useEffect(() => {
    if (waitingUserData) return;
    const redirect_url = query.get('redirect_url');
    // 已经登录了
    if (userInfo) {
      if (!isLandingPage) return;
      const token = getToken();
      if (redirect_url && token) {
        redirectToUrl(`${redirect_url}?token=${token}`);
      } else {
        // router.push(
        //   `https://www.hackquest.io/learning-track/6d108f0d-dfb2-4dad-8f38-93b45573bc43?learningTrackId=6d108f0d-dfb2-4dad-8f38-93b45573bc43&menu=learningTrack&origin=mantle&token=${token}`
        // );
      }

      return;
    }

    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      redirectToUrl(V2_LANDING_PATH);
      setAuthType(AuthType.LOGIN);
    }
  }, [waitingUserData, userInfo, pathname]);
}

export default useNavAuth;
