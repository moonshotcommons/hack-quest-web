import Tags from '@/components/Common/Tags';
import CertificationCard from '@/components/Mobile/MobCertification/CertificationCard';
import { LearningTrackCatalogue } from '@/components/Mobile/MobDetailPageV2/Catalogue';
import CourseTag, { CourseTagType } from '@/components/Mobile/MobDetailPageV2/CourseTag';
import webApi from '@/service';
import { FC } from 'react';
import BackButton from '@/components/Mobile/MobDetailPageV2/BackButton';
import ExpandAllButton from './components/ExpandAllButton';
import LearningTrackDetailProvider from '@/components/Mobile/MobDetailPageV2/Provider/LearningTrackDetailProvider';
import KnowledgeGain from '@/components/Mobile/MobDetailPageV2/KnowledgeGain';
import IntendedLearners from '@/components/Mobile/MobDetailPageV2/IntendedLearners';
import Image from 'next/image';
import { LearningTrackStructure } from '@/components/Mobile/MobDetailPageV2/CourseStructure';
import { LearningTrackStatusButton } from '@/components/Mobile/MobDetailPageV2/StatusButton';
import { Metadata } from 'next';

interface LearningTrackDetailPageProps {
  params: {
    learningTrackId: string;
  };
  searchParams: {
    learningTrackId: string;
    menu: string;
  };
}

export async function generateMetadata(
  { params, searchParams }: LearningTrackDetailPageProps,
  parent: any
): Promise<Metadata> {
  // 读取路由参数
  const learningTrackId = params.learningTrackId;
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';
  const courseDetail = await webApi.learningTrackApi.fetchLearningTrackDetail(learningTrackId);

  const metadata: Metadata = {
    title: courseDetail.name,
    alternates: {
      canonical: `https://www.hackquest.io/learning-track/${learningTrackId}${query}`
    }
  };

  return metadata;
}

const LearningTrackDetailPage: FC<LearningTrackDetailPageProps> = async (props) => {
  const { params, searchParams } = props;
  const learningTrackId = params.learningTrackId;

  const learningTrackDetail = await webApi.learningTrackApi.fetchLearningTrackDetailAndCourses(learningTrackId);

  return (
    <LearningTrackDetailProvider learningTrackDetail={learningTrackDetail}>
      <div className="relative w-full bg-neutral-white">
        <div className="h-fit bg-neutral-off-white px-5 pb-10 pt-5">
          <BackButton type="learningTrack" />
          <div className="relative my-5 h-[196px] w-full overflow-hidden rounded-[16px] bg-neutral-white">
            <Image
              src={learningTrackDetail.image}
              alt={learningTrackDetail.name}
              fill
              className="object-contain"
            ></Image>
          </div>
          <Tags size="sm" className="caption-12pt text-neutral-rich-gray">
            {`Learning Track · ${learningTrackDetail.track}`}
          </Tags>
          <h1 className="text-h1-mob my-6">{learningTrackDetail.name}</h1>
          {/* <div className="body-xs flex items-center gap-2">
            <span>Certified by</span>
            <span>Mantle</span>
          </div> */}
          <p className="body-s my-5 text-neutral-rich-gray">{learningTrackDetail.description}</p>
          <div className="flex flex-wrap gap-6 [&>div]:w-[calc((100%-24px)/2)]">
            <CourseTag type={CourseTagType.LANGUAGE} value={learningTrackDetail.language}></CourseTag>
            <CourseTag type={CourseTagType.LEVEL} value={learningTrackDetail.level}></CourseTag>
            <CourseTag type={CourseTagType.DURATION} value={learningTrackDetail.duration + ''}></CourseTag>
          </div>
        </div>
        <div className="flex flex-col gap-10 px-5 pb-[8.75rem] pt-10">
          {learningTrackDetail.certificationId && (
            <CertificationCard certificationId={learningTrackDetail.certificationId} />
          )}
          {learningTrackDetail.intendedLearners && (
            <IntendedLearners intendedLearners={learningTrackDetail.intendedLearners} />
          )}
          <LearningTrackStructure detail={learningTrackDetail} />
          {learningTrackDetail.knowledgeGain && <KnowledgeGain knowledgeGain={learningTrackDetail.knowledgeGain} />}
          <Syllabus />
        </div>
        <div className="fixed bottom-10 z-[41] w-full px-5">
          <LearningTrackStatusButton learningTrackDetail={learningTrackDetail} />
        </div>
      </div>
    </LearningTrackDetailProvider>
  );

  function Syllabus() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="flex h-fit items-center gap-2">
            <div className="h-[22px] w-[5px] rounded-full bg-yellow-dark"></div>
            <h2 className="text-h3-mob text-neutral-black">{`Syllabus`}</h2>
          </div>
          <ExpandAllButton />
        </div>
        <LearningTrackCatalogue learningTrackDetail={learningTrackDetail} />
      </div>
    );
  }
};

export default LearningTrackDetailPage;
