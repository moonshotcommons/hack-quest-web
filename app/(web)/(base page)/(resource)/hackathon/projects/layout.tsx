import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { Metadata } from 'next';
import { FC, ReactNode } from 'react';

// interface SearchParamsType {
//   searchParams: {};
// }
export async function generateMetadata({
  searchParams
}: any): Promise<Metadata> {
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';

  const metadata: Metadata = {
    title: 'All Projects - Hackathons',
    alternates: {
      canonical: `https://www.hackquest.io/${MenuLink.PROJECTS}${query}`
    }
  };

  return metadata;
}

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default PageLayout;
