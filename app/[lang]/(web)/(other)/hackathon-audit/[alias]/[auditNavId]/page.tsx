import React from 'react';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import { Metadata } from 'next';
import { HackathonAuditType } from '../../constants/type';
import Overview from './components/Overview';
import Application from './components/Application';
import Submission from './components/Submission';

interface HackathonAuditProp {
  params: { alias: string; auditNavId: string; lang: Lang };
}
export async function generateMetadata(props: HackathonAuditProp): Promise<Metadata> {
  const { lang, alias, auditNavId } = props.params;
  return {
    title: 'HackQuest HackathonAudit',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON_AUDIT}/${alias}/${auditNavId}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_AUDIT}/${alias}/${auditNavId}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_AUDIT}/${alias}/${auditNavId}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON_AUDIT}/${alias}/${auditNavId}`
      }
    }
  };
}

const HackathonAudit: React.FC<HackathonAuditProp> = ({ params }) => {
  const { auditNavId, lang } = params;
  switch (auditNavId) {
    case HackathonAuditType.OVERVIEW:
      return <Overview />;
    case HackathonAuditType.APPLICATION:
      return <Application />;
    case HackathonAuditType.SUBMISSION:
      return <Submission />;
    default:
      return <Overview />;
  }
};

export default HackathonAudit;
