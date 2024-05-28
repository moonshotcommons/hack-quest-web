import { FC } from 'react';
import CourseSlider from '@/components/Web/Business/CourseSlider';
import webApi from '@/service';
import ElectiveCard from '@/components/Web/Business/ElectiveCard';
import { ElectiveCourseType, ElectiveListDataType } from '@/service/webApi/elective/type';
// import CourseFilterListSearch from '../CourseFilterListSearch';
// import CourseFilterListDefault from '../CourseFilterListDefault';
import { Metadata } from 'next';
import { CourseType } from '@/service/webApi/course/type';
import { useTranslation } from '@/i18n/server';
import { Lang, TransNs } from '@/i18n/config';
import Header from './components/Header';
import { cn, toDoubleArray } from '@/helper/utils';
import CourseFilterListDefault from './components/CourseFilterListDefault';
import { initFilterParams, mergeFilterParams } from '@/components/Web/Business/CourseFilterList/constant';

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

  let groupTopCourse = toDoubleArray(topElectives, 4);

  return (
    <div className="h-full overflow-auto">
      <div className="container mx-auto ">
        <Header lang={lang} keyword={keyword || ''} />
        {!keyword && (
          <CourseSlider title={t('electives.topElectives')} groupList={groupTopCourse}>
            {groupTopCourse.map((group, index) => {
              return (
                <div key={index} className="flex w-[1360px] gap-[20px] p-[2px]">
                  {group.map((course) => {
                    return (
                      <div key={course.id} className="w-[calc((100%-60px)/4)]">
                        <ElectiveCard course={course as ElectiveCourseType}></ElectiveCard>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </CourseSlider>
        )}
        <div className={cn(!keyword ? '' : 'mt-[60px]')}>
          <CourseFilterListDefault
            courseList={electives.data}
            filters={filters}
            keyword={keyword || ''}
            sorts={sorts}
            title={keyword ? t('courses.searchResultFor', { keyword }) : t('electives.exploreWeb3')}
          ></CourseFilterListDefault>
        </div>
      </div>
    </div>
  );
};

export default ElectivesPage;
