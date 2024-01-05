import { MenuLink } from '@/components/Web/Layout/Navbar/type';

/** 登录页 */
export const LOGIN_PATHNAME = '/auth/login';
/** 注册页 */
export const REGISTER_PATHNAME = '/auth/register';
/** 忘记密码 */
export const FORGET_PASSWORD_PATHNAME = '/auth/forget-password';
/** 忘记密码以后重置密码 */
export const UPDATE_PASSWORD_PATHNAME = '/auth/update-password';
/** 发送验证邮件页 */
export const EMAIL_VERIFY_PATHNAME = '/auth/email-verify';
/** 邮箱激活成功 */
export const EMAIL_CONFIRMED_PATHNAME = '/users/email-confirmed';

export const HOME_PATHNAME = '/';
export const ALL_COURSES_PATHNAME = '/courses';
export const DASHBOARD_PATHNAME = '/dashboard';
export const MISSION_CENTER = '/mission-center';
export const V2_LANDING_PATH = '/';
export const V2_DASHBOARD_PATH = '/dashboard';
export const PREVIEW_PATH = '/preview';
export const LEARNING_TRACK_DETAIL = `${MenuLink.LEARNING_TRACK}/[learningTrackId]`;
export const ELECTIVE_DETAIL = `${MenuLink.ELECTIVES}/[courseId]`;
export const HACKATHON_DETAIL = `${MenuLink.HACKATHON}/[hackathonId]`;
export const PROJECT_DETAIL = `${MenuLink.PROJECTS}/[projectId]`;

export function isLoginOrRegister(pathname: string) {
  if (
    [
      LOGIN_PATHNAME,
      REGISTER_PATHNAME,
      FORGET_PASSWORD_PATHNAME,
      UPDATE_PASSWORD_PATHNAME,
      EMAIL_VERIFY_PATHNAME,
      EMAIL_CONFIRMED_PATHNAME,
      V2_LANDING_PATH
    ].includes(pathname)
  )
    return true;
  return false;
}

const isNoNeedUserInfoDetail = (pathname: string) => {
  return [
    MenuLink.LEARNING_TRACK,
    MenuLink.ELECTIVES,
    MenuLink.HACKATHON,
    MenuLink.PROJECTS,
    MenuLink.PRACTICES,
    MenuLink.BLOG
  ].some((menu) => pathname.includes(menu));
};

export function isNoNeedUserInfo(pathname: string) {
  if (
    [
      HOME_PATHNAME,
      LOGIN_PATHNAME,
      REGISTER_PATHNAME,
      ALL_COURSES_PATHNAME,
      PREVIEW_PATH
    ].includes(pathname) ||
    pathname.startsWith(PREVIEW_PATH) ||
    isNoNeedUserInfoDetail(pathname)
  )
    return true;

  if (/\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/.test(pathname)) return false;
  if (pathname === DASHBOARD_PATHNAME) return false;
  if (pathname === MISSION_CENTER) return false;

  return false;
}
