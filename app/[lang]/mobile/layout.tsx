import { Lang } from '@/i18n/config';
import { Metadata } from 'next';
import { ReactNode } from 'react';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}`,
        en: `https://www.hackquest.io/${Lang.EN}`,
        zh: `https://www.hackquest.io/${Lang.ZH}`
      }
    }
  };
}

const MobileLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default MobileLayout;
