import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.hackquest.io'
  }
};

const MobileLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default MobileLayout;
