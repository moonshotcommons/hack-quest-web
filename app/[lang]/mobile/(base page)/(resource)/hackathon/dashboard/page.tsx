import * as React from 'react';
import { getHackathonVote, getJoinedHackathons } from '@/service/cach/resource/hackathon';
import { DashboardContent } from './components/dashboard-content';
import { PageLayout } from '@/components/hackathon/page-layout';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.HACKATHON_DASHBOARD}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_DASHBOARD}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.HACKATHON_DASHBOARD}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.HACKATHON_DASHBOARD}`
      }
    }
  };
}

export default async function Page({ params: { lang } }: { params: { lang: Lang } }) {
  const { t } = await useTranslation(lang, TransNs.HACKATHON);
  const { hackathons, stats } = await getJoinedHackathons();
  const votes = await getHackathonVote();
  return (
    <PageLayout
      lang={lang}
      slug="your_hackathons"
      title={t('dashboard.yourHackathons')}
      description={t('dashboard.description')}
    >
      <React.Suspense fallback={null}>
        <DashboardContent stats={stats} hackathons={hackathons} votes={votes} />
      </React.Suspense>
    </PageLayout>
  );
}
