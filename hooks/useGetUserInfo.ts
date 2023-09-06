import webApi from '@/service';
import { AppRootState } from '@/store/redux';
import { setUserInfo } from '@/store/redux/modules/user';
import { useRequest } from 'ahooks';

import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export const useGetUserInfo = () => {
  const userInfo = useSelector((state: AppRootState) => {
    return state.user.userInfo;
  }, shallowEqual);
  return userInfo;
};

export const useGetUserUnLoginType = () => {
  const loginRouteType = useSelector((state: AppRootState) => {
    return state.user.loginRouteType;
  }, shallowEqual);
  return loginRouteType;
};

export const useLoadUserInfo = () => {
  const dispatch = useDispatch();
  const [waitingLoadUserInfo, setWaitingLoadUserInfo] = useState(true);

  const { run } = useRequest(
    async () => {
      const user = webApi.userApi.getUserInfo();
      return user;
    },

    {
      manual: true,
      onSuccess(user) {
        dispatch(setUserInfo(user));
      },
      onError(error: any) {
        console.log(error);
        // message.error(error.msg);
      },
      onFinally() {
        setWaitingLoadUserInfo(false);
      }
    }
  );

  const userInfo = useGetUserInfo();

  useEffect(() => {
    if (userInfo) {
      setWaitingLoadUserInfo(false);
      return;
    }
    run();
  }, [userInfo, run]);

  return { waitingLoadUserInfo: waitingLoadUserInfo };
};
