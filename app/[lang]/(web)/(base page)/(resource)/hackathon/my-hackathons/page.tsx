import * as React from 'react';
import { HackathonStats } from '@/components/hackathon/hackathon-stats';
import { VotingRole } from '@/components/hackathon/voting-role';
import { FollowDiscord } from '@/components/hackathon/follow-discord';
import { PageLayout } from '@/components/hackathon/page-layout';
import { HackathonContent } from './components/hackathon-content';
import { getHackathonVote, getJoinedHackathons } from '@/service/cach/resource/hackathon';
import { useTranslation } from '@/i18n/server';
import { Lang, TransNs } from '@/i18n/config';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest',
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

export default async function Page({ params }: { params: { lang: Lang } }) {
  const { t } = await useTranslation(params.lang, TransNs.HACKATHON);

  try {
    const { hackathons, stats } = await getJoinedHackathons();
    const votes = await getHackathonVote();
    return (
      <PageLayout
        lang={params.lang}
        slug="your_hackathons"
        title={t('dashboard.yourHackathons')}
        description={t('dashboard.description')}
      >
        <div className="mt-20 grid grid-cols-[1fr_320px] gap-10">
          <React.Suspense fallback={null}>
            <HackathonContent hackathons={hackathons} votes={votes} />
          </React.Suspense>
          <div className="flex flex-col gap-10">
            <div className="rounded-2xl bg-neutral-white p-6">
              <HackathonStats
                registered={stats.registered}
                submitted={stats.submitted}
                projectVoted={stats.projectVoted}
                winner={stats.winner}
              />
              <div className="my-5 h-px w-full bg-neutral-medium-gray" />
              <VotingRole votes={stats.votes} />
            </div>
            <FollowDiscord />
          </div>
        </div>
      </PageLayout>
    );
  } catch (err: any) {
    if (err.code === 401) {
      redirect('/');
    }
    throw new Error(err);
  }
}
