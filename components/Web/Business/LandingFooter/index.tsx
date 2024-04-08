import React from 'react';
import ConnectedUs from './ConnectedUs';
import Footer from './Footer';

interface LandingFooterProp {}

const LandingFooter: React.FC<LandingFooterProp> = () => {
  return (
    <>
      <ConnectedUs />
      <Footer />
    </>
  );
};

export default LandingFooter;
