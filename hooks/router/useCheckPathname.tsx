import { excludeLink } from '@/components/Web/Layout/BasePage/Navbar/data';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { getCourseLink } from '@/helper/utils';
import { locales } from '@/i18n/config';
import { CourseType } from '@/service/webApi/course/type';
import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const useCustomPathname = () => {
  const originPathname = usePathname();

  let pathname = originPathname;
  const lang = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (lang && pathname.startsWith(`/${lang}`)) {
    pathname = pathname.replace(`/${lang}`, '');
  }

  pathname = pathname.startsWith('/mobile') ? pathname.replace('/mobile', '') : pathname;

  if (!pathname.startsWith('/')) {
    pathname = '/' + pathname;
  }
  return pathname;
};

export const useCheckPathname = () => {
  const params = useParams();
  const pathname = useCustomPathname();
  const originPathname = usePathname();

  return useMemo(() => {
    const isLessonPage = !!params?.courseId && !!params.lessonId && pathname.includes('/learn/');

    const isPreviewPage = pathname.startsWith('/preview');

    const isLandingPage = ['/', ''].includes(pathname);

    const isMobileLink = originPathname.includes('/mobile');

    const isNavbarFullPage = isLessonPage || isPreviewPage;

    const isEcosystem = ~pathname.indexOf(MenuLink.ECOSYSTEM);

    const isBlog = ~pathname.indexOf(MenuLink.BLOG);

    const isGlossary = ~pathname.indexOf(MenuLink.GLOSSARY);

    const isGuidedProjectLessonPage = isLessonPage && pathname.startsWith(`${getCourseLink(CourseType.GUIDED_PROJECT)}`);

    const isMiniElectiveLessonPage = isLessonPage && pathname.startsWith(`${getCourseLink(CourseType.MINI)}`);

    const isSyntaxDetailPage = /^\/syntax\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pathname);
    const isPracticesDetailPage = /^\/practices\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pathname);
    const isElectiveDetailPage = /^\/electives\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pathname);
    const isLearningTrackDetailPage = /^\/learning-track\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pathname);

    const isCourseDetailPage = isSyntaxDetailPage || isPracticesDetailPage || isElectiveDetailPage || isLearningTrackDetailPage;

    const isExcludeBreadcrumbLink =
      isNavbarFullPage ||
      isCourseDetailPage ||
      isMobileLink ||
      isLandingPage ||
      isEcosystem ||
      isBlog ||
      isGlossary ||
      !!~excludeLink.indexOf(pathname as MenuLink);

    return {
      /** 是否是lesson page */
      isLessonPage,
      /** 是否是preview page */
      isPreviewPage,
      /** 是否是landing page */
      isLandingPage,
      /** 是否是ecosystem profile page */
      isEcosystem,
      /** 是否是移动端链接 */
      isMobileLink,
      /** 导航是否撑满 */
      isNavbarFullPage,
      /** 是否是忽略面包屑的link */
      isExcludeBreadcrumbLink,
      /** 是否是guided project的lesson page */
      isGuidedProjectLessonPage,
      /** 是否是mini elective的lesson page */
      isMiniElectiveLessonPage
    };
  }, [params, pathname, originPathname]);
};
