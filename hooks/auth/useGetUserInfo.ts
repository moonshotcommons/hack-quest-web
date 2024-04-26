import webApi from '@/service';
import { useUserStore } from '@/store/zustand/userStore';
import { useRequest } from 'ahooks';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';

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

export const useLoadUserInfo = () => {
  const [waitingLoadUserInfo, setWaitingLoadUserInfo] = useState(true);
  const { setUserInfo, userInfo } = useUserStore(
    useShallow((state) => ({
      setUserInfo: state.setUserInfo,
      userInfo: state.userInfo
    }))
  );
  const { run } = useRequest(
    async () => {
      const user = webApi.userApi.getUserInfo();
      return user;
    },

    {
      manual: true,
      onSuccess(user) {
        setUserInfo(user);
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
    if (userInfo) {
      setWaitingLoadUserInfo(false);
      return;
    }
    run();
  }, [userInfo, run]);

  return { waitingLoadUserInfo: waitingLoadUserInfo };
};
