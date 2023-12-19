'use client';
import { useEffect } from 'react';

import {
  V2_HOME_PATH,
  V2_LANDING_PATH,
  isLoginOrRegister,
  isNoNeedUserInfo
} from '@/constants/nav';
import { getToken } from '@/helper/user-token';
import { useParams, usePathname } from 'next/navigation';
import { useGetUserInfo } from '../useGetUserInfo';
import { useRedirect } from '../useRedirect';

function useNavAuth(waitingUserData: boolean) {
  const userInfo = useGetUserInfo();
  const { redirectToUrl } = useRedirect();
  const pathname = usePathname();
  const params = useParams();

  useEffect(() => {
    if (waitingUserData) return;
    const { redirect_url } = params;
    // 已经登录了
    if (userInfo) {
      if (!isLoginOrRegister(pathname)) return;
      const token = getToken();
      if (redirect_url && token) {
        redirectToUrl(`${redirect_url}?token=${token}`);
      } else {
        redirectToUrl(V2_HOME_PATH);
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
