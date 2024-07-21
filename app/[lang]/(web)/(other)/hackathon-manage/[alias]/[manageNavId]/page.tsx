import React from 'react';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import { Metadata } from 'next';
import { HackathonManageType } from '../../constants/type';
import Overview from './components/Overview';
import Application from './components/Application';
import Submission from './components/Submission';

interface HackathonManageProp {
  params: { alias: string; manageNavId: string; lang: Lang };
}
export async function generateMetadata(props: HackathonManageProp): Promise<Metadata> {
  const { lang, alias, manageNavId } = props.params;
  return {
    title: 'HackQuest Hackathon Audit',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON_MANAGER}/${alias}/${manageNavId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_MANAGER}/${alias}/${manageNavId}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_MANAGER}/${alias}/${manageNavId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON_MANAGER}/${alias}/${manageNavId}`
      }
    }
  };
}

const HackathonManage: React.FC<HackathonManageProp> = ({ params }) => {
  const { manageNavId, lang } = params;
  switch (manageNavId) {
    case HackathonManageType.OVERVIEW:
      return <Overview />;
    case HackathonManageType.APPLICATION:
      return <Application />;
    case HackathonManageType.SUBMISSION:
      return <Submission />;
    default:
      return <Overview />;
  }
};

export default HackathonManage;
