import { useEffect } from 'react';

import {
  V2_HOME_PATH,
  V2_LANDING_PATH,
  isLoginOrRegister,
  isNoNeedUserInfo
} from '@/constants/nav';
import { useRouter } from 'next/router';
import { useGetUserInfo } from '../useGetUserInfo';

function useNavAuth(waitingUserData: boolean) {
  const userInfo = useGetUserInfo();
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (waitingUserData) return;

    // 已经登录了
    if (userInfo) {
      if (isLoginOrRegister(pathname)) {
        console.log('跳转');
        router.push(V2_HOME_PATH);
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
