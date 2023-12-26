'use client';
import { usePathname, useRouter } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
// import { isMobile } from 'react-device-detect';

interface MobileRedirectProps {
  children: ReactNode;
}

const MobileRedirect: FC<MobileRedirectProps> = ({ children }) => {
  const pathname = usePathname();
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
