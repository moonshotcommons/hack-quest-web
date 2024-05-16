import { Lang, TransNs } from '@/i18n/config';
import React from 'react';
import FAQS from './FAQS';
import { useTranslation } from '@/i18n/server';
import { SearchParamsType } from '../page';
import Filter from './Filter';
import { FaucetType } from '@/service/webApi/resourceStation/type';
import Step from './Step';
import List from './List';
import MobLandingFooter from '@/components/Mobile/MobLandingFooter';
import MobCourseListPageHeader from '@/components/Mobile/MobCourseListPageHeader';

interface FaucetsPageProp {
  searchParams: SearchParamsType;
  lang: Lang;
  list: FaucetType[];
}

const FaucetsPage: React.FC<FaucetsPageProp> = async ({ searchParams, lang, list }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div>
      <MobCourseListPageHeader
        title={t('faucets.title')}
        description={t('faucets.desc')}
        coverImageUrl={'/images/hackathon/mob_hackathon_cover.png'}
        coverWidth={218}
        coverHeight={210}
        buttonNode={<Step />}
        className="bg-transparent pb-[3.75rem]"
      />
      <div className="px-[1.25rem] pb-[3.75rem]">
        <Filter searchParams={searchParams} />
        <List list={list} />
      </div>
      <div>
        <FAQS lang={lang} />
        <MobLandingFooter lang={lang} />
      </div>
    </div>
  );
};

export default FaucetsPage;
