import { Metadata } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'All Projects - Hackathons'
};

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default PageLayout;
