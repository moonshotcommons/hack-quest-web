import { Metadata } from 'next';
import { ReactNode } from 'react';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}`
    }
  };
}

const MobileLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default MobileLayout;
