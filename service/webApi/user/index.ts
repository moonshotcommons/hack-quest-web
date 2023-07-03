import request from '@/service/webService';

export enum UserApiType {
  VerifyUser = '/auth/verify',
  CheckEmail = '/users/search',
  Login = '/auth/signin'
}

/** verify token是否有效 */
export const apiUserVerify = () => {
  return request.get<{ username: string }>({
    url: UserApiType.VerifyUser
  });
};

/** 检索邮箱是否注册 */
export const apiUserSearch = (email: string) => {
  return request.get({
    url: `${UserApiType.CheckEmail}/?email=${email}`
  });
};

export const apiUserLogin = (loginParams: object) => {
  return request.post<{ username: string }>({
    url: UserApiType.Login,
    data: loginParams
  });
};
