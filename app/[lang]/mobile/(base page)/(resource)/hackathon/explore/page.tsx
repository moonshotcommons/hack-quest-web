import { PageLayout } from '@/components/hackathon/page-layout';
import { getFeaturedProjects, getHackathonsList } from '@/service/cach/resource/hackathon';
import { HackathonStatusType, HackathonType } from '@/service/webApi/resourceStation/type';
import { ExploreContent } from './components/explore-content';
import { Lang, TransNs } from '@/i18n/config';
import { Metadata } from 'next';
import MenuLink from '@/constants/MenuLink';
import { useTranslation } from '@/i18n/server';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}${MenuLink.EXPLORE_HACKATHON}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE_HACKATHON}`,
        en: `https://www.hackquest.io/${Lang.EN}${MenuLink.EXPLORE_HACKATHON}`,
        zh: `https://www.hackquest.io/${Lang.ZH}${MenuLink.EXPLORE_HACKATHON}`
      }
    }
  };
}

export default async function Page({
  params: { slug = [], lang },
  searchParams
}: {
  params: { slug: string[]; lang: Lang };
  searchParams: { curTab?: HackathonStatusType };
}) {
  const { t } = await useTranslation(lang, TransNs.HACKATHON);
  const status = searchParams.curTab || HackathonStatusType.ON_GOING;
  const minPage = Number(slug[1]) < 1 ? 1 : Number(slug[1]);
  const page = slug[0] === 'p' ? minPage : 1;
  const params =
    searchParams.curTab === 'past'
      ? {
          status,
          page,
          limit: 12
        }
      : {
          status
        };
  const [featured, hackathon] = await Promise.all([getFeaturedProjects(), getHackathonsList(params)]);
  let miniHackathonList: HackathonType[] = [];
  if (status === HackathonStatusType.ON_GOING) {
    miniHackathonList = hackathon.data;
  } else {
    let res = await getHackathonsList({ status: HackathonStatusType.ON_GOING });
    miniHackathonList = res.data;
  }
  return (
    <PageLayout lang={lang} slug="explore_hackathons" title={t('explore.title')} description={t('explore.description')}>
      <ExploreContent
        featured={featured}
        hackathonList={hackathon.data}
        miniHackathonList={miniHackathonList}
        page={page}
        curTab={status}
        total={hackathon.total}
        limit={12}
      />
    </PageLayout>
  );
}
