import React from 'react';
import ConnectedUs from './ConnectedUs';
import Footer from './Footer';
import { Lang } from '@/i18n/config';

interface LandingFooterProp {
  lang: Lang;
}

const LandingFooter: React.FC<LandingFooterProp> = ({ lang }) => {
  return (
    <>
      <ConnectedUs lang={lang} />
      <Footer lang={lang} />
    </>
  );
};

export default LandingFooter;
