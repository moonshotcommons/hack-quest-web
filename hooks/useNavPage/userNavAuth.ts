import { useEffect } from 'react';

import {
  V2_HOME_PATH,
  V2_LANDING_PATH,
  isLoginOrRegister,
  isNoNeedUserInfo
} from '@/constants/nav';
import { getToken } from '@/helper/user-token';
import { useRouter } from 'next/router';
import { useGetUserInfo } from '../useGetUserInfo';

function useNavAuth(waitingUserData: boolean) {
  const userInfo = useGetUserInfo();
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (waitingUserData) return;
    const { redirect_url } = router.query;
    // 已经登录了
    if (userInfo) {
      if (!isLoginOrRegister(pathname)) return;
      const token = getToken();
      if (redirect_url && token) {
        router.push(`${redirect_url}?token=${token}`);
      } else {
        router.push(
          '/learning-track/6d108f0d-dfb2-4dad-8f38-93b45573bc43?learningTrackId=6d108f0d-dfb2-4dad-8f38-93b45573bc43&menu=learningTrack'
        );
      }
      return;
    }

    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      router.push(V2_LANDING_PATH);
    }
  }, [waitingUserData, userInfo, pathname, router]);
}

export default useNavAuth;
