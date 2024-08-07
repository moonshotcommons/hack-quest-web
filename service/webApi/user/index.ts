import WebService from '@/service/webService/webService';
import {
  LoginParamsType,
  LoginResponse,
  RegisterParamsType,
  RegisterResponse,
  ThirdPartyAuthType,
  UserProfileType,
  UserExperienceType,
  UserPersonalType,
  PersonalLinksType,
  GithubActivityType,
  UserHackathonType,
  UserLearnedCountType,
  ConnectType,
  NotificationType,
  DailyChallengeType,
  CreateAttestationInput,
  AttestationType
} from './type';
import { transformQueryString } from '@/helper/formate';
import { ThirdPartyMediaType } from '@/helper/thirdPartyMedia';
import { cache } from 'react';

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
  AuthDiscord = '/auth/discord',
  googleVerify = 'auth/google/callback',
  githubVerify = 'auth/github/callback',
  CheckInViteCode = '/users/verify-inviteCode',
  WalletVerify = '/auth/wallet',
  UserProfile = '/users/profile',
  PersonalLinks = '/users/profile/personal-links',
  UserLearnedCount = '/users/learned-count',
  /** 绑定discord */
  DiscordVerify = '/auth/discord/callback',
  /* 获取discord的绑定信息 */
  GetDiscordInfo = '/auth/discord/info',
  BindWallet = '/auth/wallet/bind',
  GetTwitterAuthLink = '/auth/twitter',
  TwitterVerify = '/auth/twitter/callback',
  CheckDiscordJoin = '/auth/discord/check-join',
  CheckTwitterFollow = '/auth/twitter/check-follow',
  Notifications = '/notifications',
  UploadResume = '/users/profile/resume',
  CreateAttestation = '/users/profile/attestation'
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

  /** 激活用户 */
  activateUser(token: string) {
    return this.service.post('/users/activate', {
      data: {
        token
      }
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
    return this.service.post<LoginResponse | { isFail: boolean; msg: string }>(url, {
      data: params
    });
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
    const cacheFn = cache(async () => {
      return this.service.get<LoginResponse>(UserApiType.UserInfo);
    });
    return cacheFn();
  }

  /**
   * 三方登录
   */
  getAuthUrl(type: ThirdPartyAuthType, params?: object) {
    const url = type === ThirdPartyAuthType.GOOGLE ? UserApiType.AuthGoogle : UserApiType.AuthGithub;
    return this.service.get(url, { params });
  }

  /** 谷歌验证 */
  googleVerify(code: string) {
    return this.service.get<LoginResponse>(`${UserApiType.googleVerify}?code=${code}`);
  }

  /** github验证 */
  githubVerify(code: string) {
    return this.service.get<LoginResponse>(`${UserApiType.githubVerify}?code=${code}`);
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

  getUserProfileByUsername(username: string) {
    return this.service.get<UserProfileType>(`${UserApiType.UserProfile}/${username}`);
  }

  updateUsername(username: string) {
    return this.service.patch<void>(UserApiType.UserRegister, {
      data: { username }
    });
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
    return this.service.post<UserExperienceType>(`${UserApiType.UserProfile}/work-experience`, {
      data
    });
  }

  /**编辑ex */
  editExperience(id: string, data: Omit<UserExperienceType, 'id'>) {
    return this.service.put<UserExperienceType>(`${UserApiType.UserProfile}/work-experience/${id}`, {
      data
    });
  }

  /**删除ex */
  deleteExperience(id: string) {
    return this.service.delete(`${UserApiType.UserProfile}/work-experience/${id}`);
  }

  /**新增hackathon */
  addHackathon(data: Omit<UserHackathonType, 'id'>) {
    return this.service.post<UserHackathonType>(`${UserApiType.UserProfile}/hackathon-experience`, {
      data
    });
  }

  /**编辑hackathon */
  editHackathon(id: string, data: Omit<UserHackathonType, 'id'>) {
    return this.service.put<UserHackathonType>(`${UserApiType.UserProfile}/hackathon-experience/${id}`, {
      data
    });
  }

  /**删除hackathon */
  deleteHackathon(id: string) {
    return this.service.delete(`${UserApiType.UserProfile}/hackathon-experience/${id}`);
  }
  /** 获取user profile github 授权url */
  getGithubConnectUrl() {
    return this.service.get<{ url: string }>(`${UserApiType.AuthGithub}?type=connect`);
  }

  /** 更新personal links */
  updatePersonalLinks(personalLinks: PersonalLinksType) {
    return this.service.put(UserApiType.PersonalLinks, {
      data: personalLinks
    });
  }

  linkGithub(code: string) {
    return this.service.get<GithubActivityType>(`${UserApiType.UserProfile}/link-github?code=${code}`);
  }

  unLinkGithub() {
    return this.service.get(`${UserApiType.UserProfile}/unlink-github`);
  }

  /** on-Chain Activity  link*/
  linkChain(address: `0x${string}`) {
    return this.service.post<{
      address: string;
      balance: number;
      transactionCount: number;
    }>(`${UserApiType.UserProfile}/link-chain`, {
      data: {
        address
      }
    });
  }

  /** on-Chain Activity unLink */
  unLinkChain() {
    return this.service.get(`${UserApiType.UserProfile}/unlink-chain`);
  }

  /** on-Chain Activity unLink */
  refreshChain() {
    return this.service.get(`${UserApiType.UserProfile}/refresh-chain`);
  }

  /** dashboard user count */
  getUserLearnedCount() {
    return this.service.get<UserLearnedCountType>(`${UserApiType.UserLearnedCount}`);
  }

  getConnectUrlByDiscord() {
    return this.service.get<{ url: string }>(UserApiType.AuthDiscord);
  }

  linkDiscord(type: string, accessToken: string) {
    return this.service.get(UserApiType.DiscordVerify, {
      params: {
        type,
        token: accessToken
      }
    });
  }

  getDiscordInfo() {
    return this.service.get<{ isConnect: boolean; thirdUser: any }>(UserApiType.GetDiscordInfo);
  }

  disconnect(type: ThirdPartyMediaType) {
    return this.service.delete(`/auth/${type}/disconnect`);
  }

  getConnectInfo() {
    return this.service.get<{ username: string; thirdPartyName: ConnectType }[]>(`/auth`);
  }

  /** 绑定钱包 */
  connectWallet(address: `0x${string}`) {
    return this.service.get(`${UserApiType.BindWallet}`, {
      params: { address }
    });
  }

  /** 获取推特授权链接 */
  getConnectUrlByTwitter() {
    return this.service.get<{ url: string }>(UserApiType.GetTwitterAuthLink);
  }

  /** 绑定推特 */
  connectTwitter(code: string) {
    return this.service.get(UserApiType.TwitterVerify, { params: { code } });
  }

  checkDiscordJoin() {
    return this.service.get<{ isJoin: boolean }>(UserApiType.CheckDiscordJoin);
  }

  checkTwitterFollow() {
    return this.service.get<{ isFollow: boolean }>(UserApiType.CheckTwitterFollow);
  }

  /** 获取所有nitification */
  getNotifications(params: object) {
    return this.service.get<{ total: number; data: NotificationType[] }>(UserApiType.Notifications, {
      params
    });
  }

  notificationReadById(id: string) {
    return this.service.get(`${UserApiType.Notifications}/${id}/read`);
  }
  notificationReadAll() {
    return this.service.get(`${UserApiType.Notifications}/read-all`);
  }
  notificationDeteleById(id: string) {
    return this.service.delete(`${UserApiType.Notifications}/${id}`);
  }

  /** 获取用户总数 */
  getUserCount() {
    return this.service.get<{ total: number }>(`/users/count`);
  }

  async fetchUserCount(): ReturnType<typeof this.getUserCount> {
    const cacheFn = cache(async () => {
      return this.getUserCount();
    });
    return cacheFn();
  }

  getDailyChallenge() {
    return this.service.get<DailyChallengeType>('/daily-challenge');
  }

  async fetchDailyChallenge(): ReturnType<typeof this.getDailyChallenge> {
    const cacheFn = cache(async () => {
      return this.getDailyChallenge();
    });
    return cacheFn();
  }

  updateDailyChallenge(correct: boolean) {
    return this.service.patch('/daily-challenge', {
      data: { correct }
    });
  }

  uploadResume(formData: FormData) {
    return this.service.post<void>(UserApiType.UploadResume, {
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  removeResume(resumeId: string) {
    return this.service.delete(`${UserApiType.UploadResume}/${resumeId}`);
  }

  createAttestation(data: CreateAttestationInput) {
    return this.service.post<AttestationType>(UserApiType.CreateAttestation, {
      data
    });
  }
}

export default UserApi;
