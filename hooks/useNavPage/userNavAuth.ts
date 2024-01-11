'use client';
import { useEffect } from 'react';

import {
  V2_DASHBOARD_PATH,
  V2_LANDING_PATH,
  isLoginOrRegister,
  isNoNeedUserInfo
} from '@/constants/nav';
import { getToken } from '@/helper/user-token';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRedirect } from '../useRedirect';
import { useUserStore } from '@/store/zustand/userStore';

function useNavAuth(waitingUserData: boolean) {
  const userInfo = useUserStore((state) => state.userInfo);
  const { redirectToUrl } = useRedirect();
  const pathname = usePathname();
  const query = useSearchParams();

  useEffect(() => {
    if (waitingUserData) return;
    const redirect_url = query.get('redirect_url');
    // 已经登录了
    if (userInfo) {
      if (!isLoginOrRegister(pathname)) return;
      const token = getToken();
      if (redirect_url && token) {
        redirectToUrl(`${redirect_url}?token=${token}`);
      } else {
        redirectToUrl(V2_DASHBOARD_PATH);
      }
      return;
    }

    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      redirectToUrl(V2_LANDING_PATH);
    }
  }, [waitingUserData, userInfo, pathname]);
}

export default useNavAuth;
