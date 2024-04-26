'use client';
import { useCustomPathname } from '@/hooks/router/useCheckPathname';
import { useRouter } from 'next-nprogress-bar';
import { FC, ReactNode, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
// import { isMobile } from 'react-device-detect';

interface MobileRedirectProps {
  children: ReactNode;
}

const MobileRedirect: FC<MobileRedirectProps> = ({ children }) => {
  const pathname = useCustomPathname();
  const router = useRouter();

  useEffect(() => {
    if (isMobile && !pathname.startsWith('/mobile')) {
      router.replace(`/mobile${pathname}`);
    }

    if (!isMobile && pathname.startsWith('/mobile')) {
      const newPathname = pathname.replace(/^\/mobile/, '');
      router.replace(newPathname);
    }
  }, []);

  return <>{children}</>;
};

export default MobileRedirect;
