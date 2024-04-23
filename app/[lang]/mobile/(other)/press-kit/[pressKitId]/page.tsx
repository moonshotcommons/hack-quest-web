import React from 'react';
import { PressNav } from '../constants/type';
import About from '../components/PressKitRender/About';
import Articles from '../components/PressKitRender/Articles';
import Links from '../components/PressKitRender/Links';
import Logos from '../components/PressKitRender/Logos';
import Contact from '../components/PressKitRender/Contact';
import { Lang } from '@/i18n/config';

interface PressKitProp {
  params: { pressKitId: string; lang: Lang };
}

const PressKit: React.FC<PressKitProp> = ({ params }) => {
  const { pressKitId, lang } = params;
  switch (pressKitId) {
    case PressNav.ARTICLES:
      return <Articles lang={lang} />;
    case PressNav.LOGOS:
      return <Logos lang={lang} />;
    case PressNav.LINKS:
      return <Links lang={lang} />;
    case PressNav.CONTACT:
      return <Contact lang={lang} />;
    default:
      return <About lang={lang} />;
  }
};

export default PressKit;
