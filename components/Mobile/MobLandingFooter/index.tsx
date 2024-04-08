import React from 'react';
import ConnectedUs from './ConnectedUs';
import Footer from './Footer';

interface MobLandingFooterProp {}

const MobLandingFooter: React.FC<MobLandingFooterProp> = () => {
  return (
    <>
      <ConnectedUs />
      <Footer />
    </>
  );
};

export default MobLandingFooter;
