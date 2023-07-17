import WebService from '@/service/webService/webService';
import {
  LoginParamsType,
  LoginResponse,
  RegisterParamsType,
  RegisterResponse
} from './type';
import { transformQueryString } from '@/helper/formate';

export enum UserApiType {
  CheckEmail = '/api/users/verify',
  UserRegister = '/api/users',
  UserLogin = '/api/users/signin',
  TokenVerify = '/api/users/token',
  UpdatePassword = '/api/users/update-password',
  ForgetPassword = '/api/users/forgot-password',
  UploadAvatar = '/api/users/upload-avatar'
}

class UserApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 检查邮箱是否存在 */
  checkEmailExists(email: string) {
    const queryString = transformQueryString({ email });
    const url = `${UserApiType.CheckEmail}?${queryString}`;
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

  /** 邮箱链接点击以后验证token */
  tokenVerify(token: { token: string }) {
    return this.service.post<LoginResponse>(UserApiType.TokenVerify, {
      data: token
    });
  }

  /** 更新密码 */
  updatePassword(params: {
    token?: string;
    password?: string;
    newPassword: string;
    reenterPassword: string;
    isForgot?: boolean;
  }) {
    return this.service.post(UserApiType.UpdatePassword, {
      data: params
    });
  }

  forgetPassword(email: string) {
    const queryString = transformQueryString({ email });
    const url = `${UserApiType.ForgetPassword}?${queryString}`;
    return this.service.get(url);
  }

  uploadAvatar(file: FormData) {
    return this.service.post(UserApiType.UploadAvatar, {
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export default UserApi;
