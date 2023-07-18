import { useEffect } from 'react';

import {
  ALL_COURSES_PATHNAME,
  LOGIN_PATHNAME,
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
        router.push(ALL_COURSES_PATHNAME);
      }
      return;
    }

    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      router.push(LOGIN_PATHNAME);
    }
  }, [waitingUserData, userInfo, pathname, router]);
}

export default useNavAuth;
