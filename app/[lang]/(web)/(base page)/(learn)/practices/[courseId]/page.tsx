import Tags from '@/components/Common/Tags';
import { UnitCatalogue } from '@/components/Web/DetailPageV2/Catalogue';
import CourseTag, { CourseTagType } from '@/components/Web/DetailPageV2/CourseTag';
import webApi from '@/service';
import { FC } from 'react';

import BackButton from '@/components/Web/DetailPageV2/BackButton';
import IntendedLearners from '@/components/Web/DetailPageV2/IntendedLearners';
import KnowledgeGain from '@/components/Web/DetailPageV2/KnowledgeGain';
import PracticeDetailCard from './components/PracticeDetailCard';
import CourseDetailProvider from '@/components/Web/DetailPageV2/Provider/CourseDetailProvider';
import { Metadata } from 'next';
import { CourseDetailType } from '@/service/webApi/course/type';
import HeaderBg from '@/components/Web/DetailPageV2/HeaderBg';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import { ViewButton } from '@/components/Web/Documentation/view-button';

interface PracticePageProps {
  params: {
    courseId: string;
    lang: Lang;
  };
  searchParams: {
    menuCourseId: string;
    menu: string;
  };
}

export async function generateMetadata({ params, searchParams }: PracticePageProps, parent: any): Promise<Metadata> {
  // 读取路由参数
  const courseId = params.courseId;
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';
  const lang = params.lang;

  const courseDetail = await webApi.courseApi.fetchCourseDetail<CourseDetailType>(courseId);

  const metadata: Metadata = {
    title: courseDetail.title,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/practices/${courseId}${query}`,
      languages: {
        'x-default': `https://www.hackquest.io/${Lang.EN}/practices/${courseId}${query}`,
        en: `https://www.hackquest.io/${Lang.EN}/practices/${courseId}${query}`,
        zh: `https://www.hackquest.io/${Lang.ZH}/practices/${courseId}${query}`
      }
    }
  };

  return metadata;
}

const PracticePage: FC<PracticePageProps> = async (props) => {
  const { params, searchParams } = props;
  const { courseId, lang } = params;

  const { t } = await useTranslation(lang, TransNs.LEARN);

  const courseDetail = await webApi.courseApi.fetchCourseDetail(courseId, true);

  return (
    <CourseDetailProvider courseId={courseId} includeUnits>
      <div className="relative min-h-[100%] w-full bg-neutral-white">
        <HeaderBg />
        <div className="container relative mx-auto flex h-fit pb-[100px]">
          <div className="w-[900px] max-w-[900px]">
            <div className="min-h-[400px] w-full py-5" id="detail-header">
              <BackButton type="practices" lang={lang}></BackButton>
              <Tags size="lg" className="body-m mt-[2rem] text-neutral-rich-gray">
                {t('practiceDetail.tag')}
              </Tags>
              <div className="mt-4 flex items-center gap-6">
                <h1 className="text-h2">{courseDetail.title}</h1>
                {/* <div className="flex items-center gap-2">
                  <span>Certified by</span>
                  <span>Mantle</span>
                </div> */}
              </div>
              <p className="body-m mt-8 text-neutral-rich-gray">{courseDetail.description}</p>
              <div className="mt-8 flex gap-8">
                <CourseTag type={CourseTagType.LANGUAGE} value={courseDetail.language} lang={lang}></CourseTag>
                <div className="h-[45px] w-[1px] bg-neutral-rich-gray"></div>
                <CourseTag type={CourseTagType.LEVEL} value={courseDetail.level} lang={lang}></CourseTag>
                <div className="h-[45px] w-[1px] bg-neutral-rich-gray"></div>
                <CourseTag type={CourseTagType.DURATION} value={courseDetail.duration + ''} lang={lang}></CourseTag>
              </div>
            </div>

            <div className="mt-20 flex flex-col gap-20">
              {/* <CertificationCard  /> */}
              {courseDetail.intendedLearners && (
                <IntendedLearners intendedLearners={courseDetail.intendedLearners} lang={lang} />
              )}
              {courseDetail.knowledgeGain && <KnowledgeGain knowledgeGain={courseDetail.knowledgeGain} lang={lang} />}
              <Syllabus />
            </div>
          </div>
          <div className="relative flex-1">
            <PracticeDetailCard courseDetail={courseDetail} />
          </div>
        </div>
      </div>
    </CourseDetailProvider>
  );

  function Syllabus() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex h-fit items-center gap-4">
            <div className="h-[34px] w-[5px] rounded-full bg-yellow-dark"></div>
            <h3 className="text-h3 text-neutral-black">{t('courses.syllabus')}</h3>
          </div>
          {courseDetail.documentationId && <ViewButton placement="center" id={courseDetail.documentationId} />}
        </div>
        <UnitCatalogue courseDetail={courseDetail} />
      </div>
    );
  }
};

export default PracticePage;
