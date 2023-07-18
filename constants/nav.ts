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

export function isLoginOrRegister(pathname: string) {
  if (
    [
      LOGIN_PATHNAME,
      REGISTER_PATHNAME,
      FORGET_PASSWORD_PATHNAME,
      UPDATE_PASSWORD_PATHNAME,
      EMAIL_VERIFY_PATHNAME,
      EMAIL_CONFIRMED_PATHNAME
    ].includes(pathname)
  )
    return true;
  return false;
}

export function isNoNeedUserInfo(pathname: string) {
  if (
    [
      HOME_PATHNAME,
      LOGIN_PATHNAME,
      REGISTER_PATHNAME,
      ALL_COURSES_PATHNAME
    ].includes(pathname) ||
    !/\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/.test(pathname)
  )
    return true;
  return false;
}
