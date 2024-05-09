import { Lang, TransNs } from '@/i18n/config';
import React from 'react';
import FAQS from './FAQS';
import LandingFooter from '@/components/Web/Business/LandingFooter';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import { useTranslation } from '@/i18n/server';
import { SearchParamsType } from '../page';
import Filter from './Filter';
import { FaucetType } from '@/service/webApi/resourceStation/type';
import Step from './Step';
import List from './List';

interface FaucetsPageProp {
  searchParams: SearchParamsType;
  lang: Lang;
  list: FaucetType[];
}

const FaucetsPage: React.FC<FaucetsPageProp> = async ({ searchParams, lang, list }) => {
  const { t } = await useTranslation(lang, TransNs.RESOURCE);
  return (
    <div>
      <div className="container mx-auto">
        <CourseListPageHeader
          title={t('faucets.title')}
          description={t('faucets.desc')}
          coverImageUrl={'/images/hackathon/hackathon_cover.png'}
          coverWidth={486}
          coverHeight={386}
          buttonNode={<Step />}
          className="pb-[80px]"
        />
        <Filter searchParams={searchParams} />
        <List list={list} />
      </div>
      <div>
        <FAQS lang={lang} />
        <LandingFooter lang={lang} />
      </div>
    </div>
  );
};

export default FaucetsPage;
