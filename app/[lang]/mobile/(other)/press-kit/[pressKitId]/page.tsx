import React from 'react';
import About from '../components/PressKitRender/About';
import Articles from '../components/PressKitRender/Articles';
import Links from '../components/PressKitRender/Links';
import Logos from '../components/PressKitRender/Logos';
import Contact from '../components/PressKitRender/Contact';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import { Metadata } from 'next';
import { PressNav } from '@/app/[lang]/(web)/(base page)/(more)/press-kit/constants/type';

export async function generateMetadata(props: { params: { lang: string; pressKitId: string } }): Promise<Metadata> {
  const { lang, pressKitId } = props.params;

  return {
    title: 'HackQuest Press Kit',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.PRESS_KIT}/${pressKitId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.PRESS_KIT}/${pressKitId}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.PRESS_KIT}/${pressKitId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.PRESS_KIT}/${pressKitId}`
      }
    }
  };
}

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
