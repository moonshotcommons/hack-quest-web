import WebService from '@/service/webService/webService';
import {
  LoginParamsType,
  LoginResponse,
  RegisterParamsType,
  RegisterResponse,
  AuthType,
  UserProfileType,
  UserExperienceType,
  UserPersonalType,
  PersonalLinksType
} from './type';
import { transformQueryString } from '@/helper/formate';

export enum UserApiType {
  CheckEmail = '/users/verify-email',
  UserRegister = '/users',
  UserLogin = '/users/signin',
  TokenVerify = '/users/token',
  UpdatePassword = '/users/update-password',
  ForgetPassword = '/users/forgot-password',
  UploadAvatar = '/users/upload-avatar',
  UserInfo = '/users/info',
  AuthGoogle = 'auth/google',
  AuthGithub = 'auth/github',
  googleVerify = 'auth/google/callback',
  githubVerify = 'auth/github/callback',
  CheckInViteCode = '/users/verify-inviteCode',
  WalletVerify = '/auth/wallet',
  UserProfile = '/users/profile',
  PersonalLinks = '/users/profile/personal-links'
}

class UserApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 检查邮箱是否存在 */
  checkEmailExists(email: string) {
    // const queryString = transformQueryString({ email });
    const url = `${UserApiType.CheckEmail}`;
    return this.service.post<{ exists: boolean; inWhitelist: boolean }>(url, {
      data: { email }
    });
  }

  /** 检查邀请码 */
  checkInviteCode(inviteCode: string) {
    return this.service.post<{ valid: boolean }>(UserApiType.CheckInViteCode, {
      data: { inviteCode }
    });
  }

  /** 检查邀请码 */
  checkInviteCodeByThirdParty(inviteCode: string, token: string) {
    return this.service.post<{ token: string }>('/users/invitee', {
      data: { inviteCode, token }
    });
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

  /** 上传头像 */
  uploadAvatar(file: FormData) {
    return this.service.post<{ avatar: string }>(UserApiType.UploadAvatar, {
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  /** 获取用户信息 */
  getUserInfo() {
    return this.service.get(UserApiType.UserInfo);
  }

  /**
   * 三方登录
   */
  getAuthUrl(type: AuthType) {
    const url =
      type === AuthType.GOOGLE
        ? UserApiType.AuthGoogle
        : UserApiType.AuthGithub;
    return this.service.get(url);
  }

  /** 谷歌验证 */
  googleVerify(code: string) {
    return this.service.get<LoginResponse>(
      `${UserApiType.googleVerify}?code=${code}`
    );
  }

  /** github验证 */
  githubVerify(code: string) {
    return this.service.get<LoginResponse>(
      `${UserApiType.githubVerify}?code=${code}`
    );
  }

  /** metamask验证 */
  walletVerify(account: string, type = 'metamask') {
    return this.service.post<LoginResponse>(UserApiType.WalletVerify, {
      data: {
        account,
        type
      }
    });
  }

  /** 获取用户信息 */
  getUserProfile() {
    return this.service.get<UserProfileType>(UserApiType.UserProfile);
  }

  /** 编辑用户信息 */
  editUserProfile(data: UserPersonalType) {
    return this.service.put<UserPersonalType>(UserApiType.UserProfile, {
      data
    });
  }

  /**上传背景图片 */
  uploadBackgroundImage(file: FormData) {
    return this.service.post(`${UserApiType.UserProfile}/background-image`, {
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  /**新增ex */
  addExperience(data: Omit<UserExperienceType, 'id'>) {
    return this.service.post<UserExperienceType>(
      `${UserApiType.UserProfile}/work-experience`,
      {
        data
      }
    );
  }

  /**编辑ex */
  editExperience(id: string, data: Omit<UserExperienceType, 'id'>) {
    return this.service.put<UserExperienceType>(
      `${UserApiType.UserProfile}/work-experience/${id}`,
      {
        data
      }
    );
  }

  /**删除ex */
  deleteExperience(id: string) {
    return this.service.delete(
      `${UserApiType.UserProfile}/work-experience/${id}`
    );
  }

  /** 更新personal links */
  updatePersonalLinks(personalLinks: PersonalLinksType) {
    return this.service.put(UserApiType.PersonalLinks, {
      data: personalLinks
    });
  }
}

export default UserApi;
