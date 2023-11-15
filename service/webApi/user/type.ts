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
  // registerType: string;
  inviteCode: string;
  token: string;
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
  GITHUB = 'Github',
  METAMASK = 'Metamask'
}

export enum WorkExperienceType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACTOR = 'CONTRACTOR',
  INTERNSHIP = 'INTERNSHIP'
}
export interface UserExperienceType {
  id: string;
  title: string;
  companyName: string;
  employmentType: WorkExperienceType;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrentWork: boolean;
  description: string;
}
export interface UserProfileType {
  id: string;
  location: string;
  experience: number;
  techStack: string[];
  backgroundImage?: string;
  personalLinks: Record<string, string>;
  githubActivity: any;
  onChainActivity: any;
  workExperience: UserExperienceType[];
}

export interface UserPersonalType {
  location: string;
  experience: number;
  techStack: string[];
}
