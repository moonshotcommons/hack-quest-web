import { FC } from 'react';
import { Metadata } from 'next';
import { Lang, TransNs } from '@/i18n/config';
import Header from './components/Header';
import { initFilterParams, mergeFilterParams } from '@/components/Web/Business/CourseFilterList/constant';
import { useTranslation } from '@/i18n/server';
import webApi from '@/service';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { PageResult } from '@/service/webApi/type';
import ViewMoreTopList from './components/ViewMoreTopList';
import MobCourseFilterListDefault from './components/MobCourseFilterListDefault';
import { cn } from '@/helper/utils';

export async function generateMetadata(props: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = props.params;

  return {
    title: 'HackQuest Projects',
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/practices`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/practices`,
        en: `https://www.hackquest.io/${Lang.EN}/practices`,
        zh: `https://www.hackquest.io/${Lang.ZH}/practices`
      }
    }
  };
}
interface PracticesPageProps {
  searchParams: Partial<Api.Courses.CourseSearchParams>;
  params: {
    lang: Lang;
  };
}

const PracticesPage: FC<PracticesPageProps> = async ({ searchParams = {}, params: { lang } }) => {
  const { filters, sorts } = initFilterParams(searchParams);
  const { keyword } = searchParams;

  const { t } = await useTranslation(lang, TransNs.LEARN);

  const projects = await webApi.courseApi.fetchCourseList<PageResult<ProjectCourseType>>({
    ...mergeFilterParams(filters, sorts, keyword),
    type: CourseType.GUIDED_PROJECT
  });
  const topProjects = await webApi.courseApi.fetchTopCourses<ProjectCourseType>({
    type: CourseType.GUIDED_PROJECT
  });

  return (
    <div className="h-full w-full">
      <div className="relative mx-auto w-full">
        <Header lang={lang} keyword={keyword || ''} />
        <div className="absolute left-0 top-[15.5rem] z-[10] flex w-full flex-col rounded-t-[2rem] bg-neutral-off-white px-[1.25rem] py-[2.5rem]">
          {/* {type === CourseFilterListType.DEFAULT && (
            <div className="flex flex-col">
              <h2 className="text-h2-mob mb-5 text-neutral-black">{t('practice.topProjects')}</h2>
              <MobViewMoreList
                list={topProjects}
                limit={2}
                renderItem={(item) => {
                  return <MobPracticeCard course={item}></MobPracticeCard>;
                }}
              ></MobViewMoreList>
            </div>
          )} */}
          <ViewMoreTopList topCourses={topProjects} />
          <div className={cn(!keyword ? '' : 'mt-[40px]')}>
            <MobCourseFilterListDefault
              courseList={projects.data}
              filters={filters}
              keyword={keyword || ''}
              sorts={sorts}
              title={keyword ? t('courses.searchResultFor', { keyword }) : t('electives.exploreWeb3')}
            ></MobCourseFilterListDefault>
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

export default PracticesPage;
