import React from 'react';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: { lang: string; pressKitId: string } }): Promise<Metadata> {
  const { lang, pressKitId } = props.params;
  console.info(props);
  return {
    title: 'HackQuest HackathonAudit',
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
interface HackathonAuditProp {
  params: { pressKitId: string; lang: Lang };
}

const HackathonAudit: React.FC<HackathonAuditProp> = ({ params }) => {
  const { pressKitId, lang } = params;

  return <>1111111</>;
};

export default HackathonAudit;
