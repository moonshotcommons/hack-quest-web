import webApi from '@/service';
import { useUserStore } from '@/store/zustand/userStore';
import { useRequest } from 'ahooks';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';
import { LoginResponse } from '@/service/webApi/user/type';
import { useRouter } from 'next/navigation';

// export const useGetUserInfo = () => {
//   const userInfo = useSelector((state: AppRootState) => {
//     return state.user.userInfo;
//   }, shallowEqual);
//   return userInfo;
// };

// export const useGetUserUnLoginType = () => {
//   const loginRouteType = useSelector((state: AppRootState) => {
//     return state.user.loginRouteType;
//   }, shallowEqual);
//   return loginRouteType;
// };

export const useLoadUserInfo = (propUserInfo: Partial<LoginResponse> | null) => {
  const [waitingLoadUserInfo, setWaitingLoadUserInfo] = useState(true);
  const { setUserInfo, userInfo } = useUserStore(
    useShallow((state) => ({
      setUserInfo: state.setUserInfo,
      userInfo: state.userInfo
    }))
  );
  const router = useRouter();
  const { run } = useRequest(
    async () => {
      const user = webApi.userApi.getUserInfo();
      return user;
    },

    {
      manual: true,
      onSuccess(user) {
        setUserInfo(user);
        router.refresh();
      },
      onError(error: any) {
        // errorMessage(error);
      },
      onFinally() {
        setWaitingLoadUserInfo(false);
      }
    }
  );

  useEffect(() => {
    if (userInfo || propUserInfo) {
      setWaitingLoadUserInfo(false);
      propUserInfo && setUserInfo(propUserInfo);
      return;
    }

    run();
  }, [userInfo, run, propUserInfo]);

  return { waitingLoadUserInfo: waitingLoadUserInfo };
};
