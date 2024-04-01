import Tags from '@/components/Common/Tags';
import { PracticeCatalogue } from '@/components/Mobile/MobDetailPageV2/Catalogue';
import CourseTag, { CourseTagType } from '@/components/Mobile/MobDetailPageV2/CourseTag';
import webApi from '@/service';
import { FC } from 'react';
import BackButton from '@/components/Mobile/MobDetailPageV2/BackButton';
import PracticeDetailProvider from '@/components/Mobile/MobDetailPageV2/Provider/PracticeDetailProvider';
import KnowledgeGain from '@/components/Mobile/MobDetailPageV2/KnowledgeGain';
import IntendedLearners from '@/components/Mobile/MobDetailPageV2/IntendedLearners';
import Image from 'next/image';
import { CourseStructure } from '@/components/Mobile/MobDetailPageV2/CourseStructure';
import { PracticeStatusButton } from '@/components/Mobile/MobDetailPageV2/StatusButton';
import { CourseDetailType } from '@/service/webApi/course/type';
import { getCoverImageByTrack } from '@/helper/utils';
import { Metadata } from 'next';
import Logo from '@/public/images/logo/logo.svg';

interface PracticeDetailPageProps {
  params: {
    courseId: string;
    lang: string;
  };
  searchParams: {
    menuCourseId: string;
    menu: string;
  };
}

export async function generateMetadata(
  { params, searchParams }: PracticeDetailPageProps,
  parent: any
): Promise<Metadata> {
  // 读取路由参数
  const { courseId, lang } = params;

  const courseDetail = await webApi.courseApi.fetchCourseDetail<CourseDetailType>(courseId);

  const metadata: Metadata = {
    title: courseDetail.title,
    alternates: {
      canonical: `https://www.hackquest.io${lang ? `/${lang}` : ''}/course-market/${courseId}`
    }
  };

  return metadata;
}

const PracticeDetailPage: FC<PracticeDetailPageProps> = async (props) => {
  const { params, searchParams } = props;
  const courseId = params.courseId;

  const courseDetail = await webApi.courseApi.fetchCourseDetail<CourseDetailType>(courseId, true);

  return (
    <PracticeDetailProvider courseId={courseId}>
      <div className="relative w-full bg-neutral-white">
        <div className="h-fit bg-neutral-off-white px-5 pb-10 pt-5">
          <BackButton type="learningTrack" />
          <div className="relative my-5 h-[196px] w-full overflow-hidden rounded-[16px] bg-neutral-white">
            {courseDetail.image && (
              <Image src={courseDetail.image} alt={courseDetail.title} fill className="object-cover"></Image>
            )}
            {!courseDetail.image && getCoverImageByTrack(courseDetail.track)}
          </div>
          <Tags size="sm" className="caption-12pt text-neutral-rich-gray">
            {`Project`}
          </Tags>
          <h1 className="text-h1-mob my-6">{courseDetail.title}</h1>
          {/* <div className="body-xs flex items-center gap-2">
            <span>Certified by</span>
            <span>Mantle</span>
          </div> */}
          <p className="body-s my-5 text-neutral-rich-gray">{courseDetail.description}</p>
          <div className="flex flex-wrap gap-6 [&>div]:w-[calc((100%-24px)/2)]">
            <CourseTag
              icon={
                <div className="relative h-8 w-8">
                  <Image
                    fill
                    src={courseDetail.creator?.profileImage || Logo}
                    alt={courseDetail.creator?.name || Logo}
                  ></Image>
                </div>
              }
              type={CourseTagType.CREATE_BY}
              value={courseDetail.creator?.name || 'Hackquest'}
            ></CourseTag>

            <CourseTag type={CourseTagType.LANGUAGE} value={courseDetail.language}></CourseTag>
            <CourseTag type={CourseTagType.LEVEL} value={courseDetail.level}></CourseTag>
            <CourseTag type={CourseTagType.DURATION} value={courseDetail.duration + ''}></CourseTag>
          </div>
        </div>
        <div className="flex flex-col gap-10 px-5 pb-[8.75rem] pt-10">
          {courseDetail.intendedLearners && <IntendedLearners intendedLearners={courseDetail.intendedLearners} />}
          <CourseStructure detail={courseDetail} />
          {courseDetail.knowledgeGain && <KnowledgeGain knowledgeGain={courseDetail.knowledgeGain} />}
          <Syllabus />
        </div>
        <div className="fixed bottom-10 w-full px-5">
          <PracticeStatusButton courseDetail={courseDetail} />
        </div>
      </div>
    </PracticeDetailProvider>
  );

  function Syllabus() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="flex h-fit items-center gap-2">
            <div className="h-[22px] w-[5px] rounded-full bg-yellow-dark"></div>
            <h2 className="text-h3-mob text-neutral-black">{`Syllabus`}</h2>
          </div>
          {/* <ExpandAllButton /> */}
        </div>
        <PracticeCatalogue courseDetail={courseDetail} />
      </div>
    );
  }
};

export default PracticeDetailPage;
