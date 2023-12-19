'use client';
import { redirect, usePathname } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

interface MobileRedirectProps {
  children: ReactNode;
}

const MobileRedirect: FC<MobileRedirectProps> = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (
      typeof isMobile === 'boolean' &&
      isMobile &&
      !pathname.startsWith('/mobile')
    ) {
      redirect(`/mobile${pathname}`);
    }

    if (
      typeof isMobile === 'boolean' &&
      !isMobile &&
      pathname.startsWith('/mobile')
    ) {
      const newPathname = pathname.replace(/^\/mobile/, '');
      redirect(newPathname);
    }
  }, []);

  return <div>{children}</div>;
};

export default MobileRedirect;
