import WebService from '@/service/webService/webService';
import {
  LoginParamsType,
  LoginResponse,
  RegisterParamsType,
  RegisterResponse
} from './type';

export enum UserApiType {
  CheckEmail = '/api/users/verify',
  UserRegister = '/api/users',
  UserLogin = '/api/users/signin',
  TokenVerify = '/api/users/token'
}

class UserApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 检查邮箱是否存在 */
  checkEmailExists(email: string) {
    const url = `${UserApiType.CheckEmail}?email=${email}`;
    return this.service.get(url);
  }

  /** 用户注册 */
  userRegister(params: RegisterParamsType) {
    const url = `${UserApiType.UserRegister}`;
    return this.service.post<RegisterResponse>(url, {
      data: params
    });
  }

  /** 用户登录 */
  userLogin(params: LoginParamsType) {
    const url = `${UserApiType.UserLogin}`;
    return this.service.post<LoginResponse | { isFail: boolean; msg: string }>(
      url,
      {
        data: params
      }
    );
  }

  tokenVerify(token: { token: string }) {
    return this.service.post<LoginResponse>(UserApiType.TokenVerify, {
      data: token
    });
  }
}

export default UserApi;
