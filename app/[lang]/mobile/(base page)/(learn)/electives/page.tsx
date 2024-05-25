import { FC } from 'react';
import { Metadata } from 'next';
import { Lang, TransNs } from '@/i18n/config';
import Header from './components/Header';
import { initFilterParams, mergeFilterParams } from '@/components/Web/Business/CourseFilterList/constant';
import { useTranslation } from '@/i18n/server';
import webApi from '@/service';
import { ElectiveCourseType, ElectiveListDataType } from '@/service/webApi/elective/type';
import { CourseType } from '@/service/webApi/course/type';
import { cn } from '@/helper/utils';
import MobCourseFilterListDefault from './components/MobCourseFilterListDefault';
import ViewMoreTopList from './components/ViewMoreTopList';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Electives',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/electives`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/electives`,
        en: `https://www.hackquest.io/${Lang.EN}/electives`,
        zh: `https://www.hackquest.io/${Lang.ZH}/electives`
      }
    }
  };
}

interface ElectivesPageProps {
  searchParams: Partial<Api.Courses.CourseSearchParams>;
  params: {
    lang: Lang;
  };
}

const ElectivesPage: FC<ElectivesPageProps> = async ({ searchParams = {}, params: { lang } }) => {
  const { filters, sorts } = initFilterParams(searchParams);
  const { keyword } = searchParams;

  const { t } = await useTranslation(lang, TransNs.LEARN);

  const electives = await webApi.courseApi.fetchCourseList<ElectiveListDataType>({
    ...mergeFilterParams(filters, sorts, keyword),
    type: `${CourseType.MINI},${CourseType.UGC}`
  });
  const topElectives = await webApi.courseApi.fetchTopCourses<ElectiveCourseType>({
    type: `${CourseType.MINI},${CourseType.UGC}`
  });

  return (
    <div className="h-full w-full">
      <div className="relative mx-auto w-full">
        <Header lang={lang} keyword={keyword || ''} />
        <div className="absolute left-0 top-[15.5rem] z-[10] flex w-full flex-col rounded-t-[2rem] bg-neutral-off-white px-[1.25rem] py-[2.5rem]">
          {!keyword && (
            <div className="flex flex-col">
              <h2 className="text-h2-mob mb-5 text-neutral-black">{t('electives.topElectives')}</h2>
              <ViewMoreTopList topElectives={topElectives} />
            </div>
          )}

          <div className={cn(!keyword ? 'pt-[40px]' : '')}>
            <MobCourseFilterListDefault
              courseList={electives.data}
              filters={filters}
              keyword={keyword || ''}
              sorts={sorts}
              title={keyword ? t('courses.searchResultFor', { keyword }) : t('electives.exploreWeb3')}
            />
          </div>
        </div>
        {/*
        <SelectiveCoursesBox
          loadNum={loadNum}
          setApiStatus={(status) => setApiStatus(status)}
          apiStatus={apiStatus}
        /> */}
      </div>
    </div>
  );
};

export default ElectivesPage;
