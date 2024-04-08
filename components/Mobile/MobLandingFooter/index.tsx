import React from 'react';
import ConnectedUs from './ConnectedUs';
import Footer from './Footer';
import { Lang } from '@/i18n/config';

interface MobLandingFooterProp {
  lang: Lang;
}

const MobLandingFooter: React.FC<MobLandingFooterProp> = ({ lang }) => {
  return (
    <>
      <ConnectedUs lang={lang} />
      <Footer lang={lang} />
    </>
  );
};

export default MobLandingFooter;
