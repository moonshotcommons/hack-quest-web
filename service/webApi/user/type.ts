export interface Response {
  id: string;
}

export interface RegisterParamsType {
  email: string;
  password: string;
  reenterPassword: string;
  inviteCode?: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  status: string;
  registerType: string;
}

export interface LoginParamsType {
  email: string;
  password: string;
  keepMeLoggedIn: boolean;
}

export interface LoginResponse {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  status: string;
  registerType: string;
}

export enum ForgetPasswordErrorStatusType {
  /** 发送邮件失败 */
  SEND_EMAIL_ERROR = 400,
  /** 邮箱不存在 */
  EMAIL_NOT_EXIST = 404
}

export enum AuthType {
  EMAIL = 'Email',
  GOOGLE = 'Google',
  GITHUB = 'Github'
}
