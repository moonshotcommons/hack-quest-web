'use client';
import { usePathname, useRouter } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

interface MobileRedirectProps {
  children: ReactNode;
}

const MobileRedirect: FC<MobileRedirectProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      typeof isMobile === 'boolean' &&
      isMobile &&
      !pathname.startsWith('/mobile')
    ) {
      router.replace(`/mobile${pathname}`);
    }

    if (
      typeof isMobile === 'boolean' &&
      !isMobile &&
      pathname.startsWith('/mobile')
    ) {
      const newPathname = pathname.replace(/^\/mobile/, '');
      router.replace(newPathname);
    }
  }, []);

  return <div>{children}</div>;
};

export default MobileRedirect;
