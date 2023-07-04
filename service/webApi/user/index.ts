import WebService from '@/service/webService/webService';

export enum UserApiType {
  VerifyUser = '/auth/verify',
  CheckEmail = '/users/search',
  Login = '/auth/signin'
}

// /** verify token是否有效 */
// export const apiUserVerify = () => {
//   return request.get<{ username: string }>({
//     url: UserApiType.VerifyUser
//   });
// };

// /** 检索邮箱是否注册 */
// export const apiUserSearch = (email: string) => {
//   return request.get({
//     url: `${UserApiType.CheckEmail}/?email=${email}`
//   });
// };

// export const apiUserLogin = (loginParams: object) => {
//   return request.post<{ username: string }>({
//     url: UserApiType.Login,
//     data: loginParams
//   });
// };

class UserApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 检索邮箱是否注册 */
  checkEmail(email: string) {
    return this.service.get<any>(`${UserApiType.CheckEmail}/?email=${email}`);
  }

  /** 用户登录 */
  login(loginParams: object) {
    return this.service.post<{ username: string }>(UserApiType.Login, {
      data: loginParams
    });
  }
}

export default UserApi;
