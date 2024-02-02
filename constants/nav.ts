import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

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

const isNoNeedUserInfoDetail = (pathname: string) => {
  if (pathname.startsWith('/mobile')) {
    pathname = pathname.replace('/mobile', '');
  }

  return [
    MenuLink.LEARNING_TRACK,
    MenuLink.ELECTIVES,
    MenuLink.HACKATHON,
    MenuLink.PROJECTS,
    MenuLink.PRACTICES,
    MenuLink.BLOG,
    MenuLink.GLOSSARY
  ].some((menu) => pathname.includes(menu));
};

export function isNoNeedUserInfo(pathname: string) {
  if (pathname.startsWith('/mobile')) {
    pathname = pathname.replace('/mobile', '');
  }

  if (
    [HOME_PATHNAME, ALL_COURSES_PATHNAME, PREVIEW_PATH].includes(pathname) ||
    pathname.startsWith(PREVIEW_PATH) ||
    isNoNeedUserInfoDetail(pathname)
  )
    return true;

  if (/\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/.test(pathname)) return false;
  if (pathname === DASHBOARD_PATHNAME) return false;
  if (pathname === MISSION_CENTER) return false;

  return false;
}
