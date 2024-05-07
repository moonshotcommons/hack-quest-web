import { Lang } from '@/i18n/config';
import React from 'react';
import FAQS from './FAQS';
import LandingFooter from '@/components/Web/Business/LandingFooter';

interface FaucetsPageProp {
  searchParams: {};
  lang: Lang;
}

const FaucetsPage: React.FC<FaucetsPageProp> = async ({ searchParams, lang }) => {
  return (
    <div>
      <div className="container mx-auto"></div>
      <div>
        <FAQS lang={lang} />
        <LandingFooter lang={lang} />
      </div>
    </div>
  );
};

export default FaucetsPage;
