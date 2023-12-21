import { excludeLink } from '@/components/v2/Layout/Navbar/data';
import { MenuLink } from '@/components/v2/Layout/Navbar/type';
import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const useCheckPathname = () => {
  const params = useParams();
  const pathname = usePathname();

  return useMemo(() => {
    const isLessonPage =
      !!params?.courseId && !!params.lessonId && pathname.includes('/learn/');

    const isPreviewPage = pathname.startsWith('/preview');

    const isLandingPage = pathname === '/';

    const isMobileLink = pathname.startsWith('/mobile');

    const isNavbarFullPage = isLessonPage || isPreviewPage;

    const isEcosystem = ~pathname.indexOf(MenuLink.ECOSYSTEM);

    const isExcludeBreadcrumbLink =
      isNavbarFullPage ||
      isMobileLink ||
      isLandingPage ||
      isEcosystem ||
      !!~excludeLink.indexOf(pathname as MenuLink);

    return {
      /** 是否是lesson page */
      isLessonPage,
      /** 是否是preview page */
      isPreviewPage,
      /** 是否是landing page */
      isLandingPage,
      /** 是否是移动端链接 */
      isMobileLink,
      /** 导航是否撑满 */
      isNavbarFullPage,
      /** 是否是忽略面包屑的link */
      isExcludeBreadcrumbLink
    };
  }, [params, pathname]);
};
