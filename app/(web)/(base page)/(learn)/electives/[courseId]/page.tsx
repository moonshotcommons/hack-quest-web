import Tags from '@/components/Common/Tags';
import { ElectiveCatalogue } from '@/components/Web/DetailPageV2/Catalogue';
import CourseTag, {
  CourseTagType
} from '@/components/Web/DetailPageV2/CourseTag';
import webApi from '@/service';
import Image from 'next/image';
import { FC } from 'react';

import BackButton from '@/components/Web/DetailPageV2/BackButton';
import IntendedLearners from '@/components/Web/DetailPageV2/IntendedLearners';
import KnowledgeGain from '@/components/Web/DetailPageV2/KnowledgeGain';
import { ElectiveDetailCard } from '@/components/Web/DetailPageV2/DetailCard';
import { ElectiveCourseDetailType } from '@/service/webApi/elective/type';
import ElectiveDetailProvider from '@/components/Web/DetailPageV2/Provider/ElectiveDetailProvider';
import HeaderBg from '@/components/Web/DetailPageV2/HeaderBg';

interface ElectivePageProps {
  params: {
    courseId: string;
  };
  searchParams: {
    menuCourseId: string;
    menu: string;
  };
}

const ElectivePage: FC<ElectivePageProps> = async (props) => {
  const { params, searchParams } = props;
  const courseId = params.courseId;

  const courseDetail =
    await webApi.courseApi.fetchCourseDetail<ElectiveCourseDetailType>(
      courseId,
      false,
      true
    );

  return (
    <ElectiveDetailProvider courseId={courseId}>
      <div className="relative min-h-[100%] w-full bg-neutral-white">
        {/* <div className="absolute left-0 top-0 min-h-[400px] w-full bg-neutral-off-white py-5"></div> */}
        <HeaderBg />
        <div className="container relative mx-auto flex h-fit pb-[100px]">
          <div className="w-[900px] max-w-[900px]">
            <div className="min-h-[400px] w-full py-5" id="detail-header">
              <BackButton type="electives"></BackButton>
              <Tags
                size="lg"
                className="body-m mt-[2rem] text-neutral-rich-gray"
              >
                {`Elective`}
              </Tags>
              <div className="mt-4 flex items-center gap-6">
                <h2 className="text-h2">{courseDetail.name}</h2>
                {/* <div className="flex items-center gap-2">
                  <span>Certified by</span>
                  <span>Mantle</span>
                </div> */}
              </div>
              <p className="body-m mt-8 text-neutral-rich-gray">
                {courseDetail.description}
              </p>
              <div className="mt-8 flex gap-8">
                <CourseTag
                  type={CourseTagType.LANGUAGE}
                  value={courseDetail.language}
                ></CourseTag>
                <div className="h-[45px] w-[1px] bg-neutral-rich-gray"></div>
                <CourseTag
                  icon={
                    <div className="relative h-8 w-8">
                      <Image
                        fill
                        src={courseDetail.creator?.profileImage || ''}
                        alt={courseDetail.creator?.name || ''}
                      ></Image>
                    </div>
                  }
                  type={CourseTagType.CREATE_BY}
                  value={courseDetail.creator?.name}
                ></CourseTag>
                <div className="h-[45px] w-[1px] bg-neutral-rich-gray"></div>
                <CourseTag
                  type={CourseTagType.DURATION}
                  value={courseDetail.duration + ''}
                ></CourseTag>
              </div>
            </div>

            <div className="mt-20  flex flex-col gap-20">
              {/* <CertificationCard  /> */}
              {courseDetail.intendedLearners && (
                <IntendedLearners
                  intendedLearners={courseDetail.intendedLearners}
                />
              )}
              {courseDetail.knowledgeGain && (
                <KnowledgeGain knowledgeGain={courseDetail.knowledgeGain} />
              )}
              <Syllabus />
            </div>
          </div>
          <div className="relative flex-1">
            <ElectiveDetailCard courseDetail={courseDetail} />
          </div>
        </div>
      </div>
    </ElectiveDetailProvider>
  );

  function Syllabus() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex h-fit items-center gap-4">
          <div className="h-[34px] w-[5px] rounded-full bg-yellow-dark"></div>
          <h3 className="text-h3 text-neutral-black">{`Syllabus`}</h3>
        </div>
        <ElectiveCatalogue courseDetail={courseDetail} />
      </div>
    );
  }
};

export default ElectivePage;
