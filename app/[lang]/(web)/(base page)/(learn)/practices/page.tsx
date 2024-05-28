import { FC } from 'react';
import { Metadata } from 'next';
import { Lang, TransNs } from '@/i18n/config';
import { initFilterParams, mergeFilterParams } from '@/components/Web/Business/CourseFilterList/constant';
import { useTranslation } from '@/i18n/server';
import webApi from '@/service';
import { CourseType, ProjectCourseType } from '@/service/webApi/course/type';
import { PageResult } from '@/service/webApi/type';
import { cn, toDoubleArray } from '@/helper/utils';
import Header from './components/Header';
import CourseSlider from '@/components/Web/Business/CourseSlider';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import CourseFilterListDefault from './components/CourseFilterListDefault';

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

  let groupTopCourse = toDoubleArray(topProjects, 4);

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
                        <PracticeCard course={course as ProjectCourseType} />
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
            courseList={projects.data}
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

export default PracticesPage;
