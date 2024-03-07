import Tags from '@/components/Common/Tags';
import CertificationCard from '@/components/Web/Business/Certification/CertificationCard';
import { SectionCatalogue } from '@/components/Web/DetailPageV2/Catalogue';
import CourseTag, {
  CourseTagType
} from '@/components/Web/DetailPageV2/CourseTag';
import webApi from '@/service';
import { FC } from 'react';
import BackButton from '@/components/Web/DetailPageV2/BackButton';
import ExpandAllButton from './components/ExpandAllButton';
import LearningTrackDetailProvider from '@/components/Web/DetailPageV2/Provider/LearningTrackDetailProvider';
import KnowledgeGain from '@/components/Web/DetailPageV2/KnowledgeGain';
import IntendedLearners from '@/components/Web/DetailPageV2/IntendedLearners';
import LearningTrackDetailCard from './components/LearningTrackDetailCard';
import CertificationCardProvider from '@/components/Web/Business/Certification/CertificationCard/CertificationCardProvider';
import { Metadata } from 'next';
import HeaderBg from '@/components/Web/DetailPageV2/HeaderBg';

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

  const courseDetail =
    await webApi.learningTrackApi.fetchLearningTrackDetail(learningTrackId);

  const metadata: Metadata = {
    title: courseDetail.name,
    alternates: {
      canonical: `https://www.hackquest.io/learning-track/${encodeURIComponent(learningTrackId)}`
    }
  };

  return metadata;
}

const LearningTrackDetailPage: FC<LearningTrackDetailPageProps> = async (
  props
) => {
  const { params, searchParams } = props;
  const learningTrackId = params.learningTrackId;

  const learningTrackDetail =
    await webApi.learningTrackApi.fetchLearningTrackDetailAndCourses(
      learningTrackId
    );

  let certification;

  if (learningTrackDetail.certificationId) {
    certification = await webApi.campaignsApi.fetchCertificationDetail(
      learningTrackDetail.certificationId
    );
  }

  return (
    <LearningTrackDetailProvider learningTrackDetail={learningTrackDetail}>
      <CertificationCardProvider certificationId={certification?.id}>
        <div className="relative w-full bg-neutral-white">
          {/* <div className="absolute left-0 top-0 min-h-[400px] w-full bg-neutral-off-white py-5"></div> */}
          <HeaderBg />
          <div className="container relative mx-auto flex h-fit pb-[100px]">
            <div className="w-[900px] max-w-[900px]">
              <div className="min-h-[400px] w-full py-5" id="detail-header">
                <BackButton type="learningTrack"></BackButton>
                <Tags
                  size="lg"
                  className="body-m mt-[2rem] text-neutral-rich-gray"
                >
                  {`Learning Track · ${learningTrackDetail.track}`}
                </Tags>
                <div className="mt-4 flex items-center gap-6">
                  <h1 className="text-h2">{learningTrackDetail.name}</h1>
                  {/* <div className="flex items-center gap-2">
                  <span>Certified by</span>
                  <span>Mantle</span>
                </div> */}
                </div>
                <p className="body-m mt-8 text-neutral-rich-gray">
                  {learningTrackDetail.description}
                </p>
                <div className="mt-8 flex gap-8">
                  <CourseTag
                    type={CourseTagType.LANGUAGE}
                    value={learningTrackDetail.language}
                  ></CourseTag>
                  <div className="h-[45px] w-[1px] bg-neutral-rich-gray"></div>
                  <CourseTag
                    type={CourseTagType.LEVEL}
                    value={learningTrackDetail.level}
                  ></CourseTag>
                  <div className="h-[45px] w-[1px] bg-neutral-rich-gray"></div>
                  <CourseTag
                    type={CourseTagType.DURATION}
                    value={learningTrackDetail.duration + ''}
                  ></CourseTag>
                </div>
              </div>

              <div className="mt-20  flex flex-col gap-20">
                {certification && (
                  <CertificationCard certification={certification} />
                )}
                {learningTrackDetail.intendedLearners && (
                  <IntendedLearners
                    intendedLearners={learningTrackDetail.intendedLearners}
                  />
                )}
                {learningTrackDetail.knowledgeGain && (
                  <KnowledgeGain
                    knowledgeGain={learningTrackDetail.knowledgeGain}
                  />
                )}
                <Syllabus />
              </div>
            </div>
            <div className="relative flex-1">
              <LearningTrackDetailCard
                learningTrackDetail={learningTrackDetail}
              />
            </div>
          </div>
        </div>
      </CertificationCardProvider>
    </LearningTrackDetailProvider>
  );

  function Syllabus() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="flex h-fit items-center gap-4">
            <div className="h-[34px] w-[5px] rounded-full bg-yellow-dark"></div>
            <h3 className="text-h3 text-neutral-black">{`Syllabus`}</h3>
          </div>
          <ExpandAllButton />
        </div>
        <SectionCatalogue learningTrackDetail={learningTrackDetail} />
      </div>
    );
  }
};

export default LearningTrackDetailPage;
