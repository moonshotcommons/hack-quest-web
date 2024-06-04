import { FC } from 'react';
import MissionCenter from './components';
import { Metadata } from 'next';
import PageRetentionTime from '@/components/Common/PageRetentionTime';
import { Lang } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';

interface MissionCenterPageProps {
  params: {
    lang: Lang;
  };
}

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Mission',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/${MenuLink.MISSION_CENTER}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/${MenuLink.MISSION_CENTER}`,
        en: `https://www.hackquest.io/${Lang.EN}/${MenuLink.MISSION_CENTER}`,
        zh: `https://www.hackquest.io/${Lang.ZH}/${MenuLink.MISSION_CENTER}`
      }
    }
  };
}

const MissionCenterPage: FC<MissionCenterPageProps> = (props) => {
  return (
    <div className="min-h-full bg-neutral-white">
      <MissionCenter />
      <PageRetentionTime trackName="mission-center-页面留存时间"></PageRetentionTime>
    </div>
  );
};

export default MissionCenterPage;
