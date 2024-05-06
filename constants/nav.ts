'use client';
import MenuLink from '@/constants/MenuLink';
import { locales } from '@/i18n/config';

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
    MenuLink.GLOSSARY,
    MenuLink.ADVOCATE,
    MenuLink.COURSE_MARKET,
    MenuLink.LAUNCH,
    MenuLink.EVENTS,
    MenuLink.EVENTS_PAST,
    MenuLink.HACKDEGALAXY,
    MenuLink.PARTNERS,
    MenuLink.PRESS_KIT,
    MenuLink.NTU_COURSE,
    MenuLink.DOCS,
    '/hackquest/'
  ].some((menu) => pathname.includes(menu));
};

export function isNoNeedUserInfo(pathname: string) {
  // let lang = getLang();

  // if (lang && pathname.startsWith(`/${lang}`)) {
  //   pathname = pathname.replace(`/${lang}`, '');
  // } else if (!lang) {
  const lang = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (lang && pathname.startsWith(`/${lang}`)) {
    pathname = pathname.replace(`/${lang}`, '');
  }
  // }

  if (pathname.startsWith('/mobile')) {
    pathname = pathname.replace('/mobile', '');
  }

  if (!pathname.startsWith('/')) {
    pathname = '/' + pathname;
  }

  if (
    [HOME_PATHNAME, ALL_COURSES_PATHNAME, PREVIEW_PATH].includes(pathname) ||
    pathname.startsWith(PREVIEW_PATH) ||
    isNoNeedUserInfoDetail(pathname)
  ) {
    return true;
  }

  if (/\/[^/]+\/\[courseId\]\/learn\/\[lessonId\]/.test(pathname)) return false;
  if (pathname === DASHBOARD_PATHNAME) return false;
  if (pathname === MISSION_CENTER) return false;

  return false;
}
