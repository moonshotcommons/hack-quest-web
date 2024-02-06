import Tags from '@/components/Common/Tags';
import { PracticeCatalogue } from '@/components/Web/DetailPageV2/Catalogue';
import CourseTag, {
  CourseTagType
} from '@/components/Web/DetailPageV2/CourseTag';
import webApi from '@/service';
import { FC } from 'react';

import BackButton from '@/components/Web/DetailPageV2/BackButton';
import IntendedLearners from '@/components/Web/DetailPageV2/IntendedLearners';
import WillLearn from '@/components/Web/DetailPageV2/WillLearn';
import { PracticeDetailCard } from '@/components/Web/DetailPageV2/DetailCard';
import PracticeDetailProvider from '@/components/Web/DetailPageV2/Provider/PracticeDetailProvider';

interface PracticePageProps {
  params: {
    courseId: string;
  };
  searchParams: {
    menuCourseId: string;
    menu: string;
  };
}

const PracticePage: FC<PracticePageProps> = async (props) => {
  const { params, searchParams } = props;
  const courseId = params.courseId;

  const courseDetail = await webApi.courseApi.fetchCourseDetail(courseId, true);
  // console.log(courseDetail);

  return (
    <PracticeDetailProvider courseId={courseId}>
      <div className="relative w-full bg-neutral-white">
        <div className="absolute left-0 top-0 min-h-[400px] w-full bg-neutral-off-white py-5"></div>
        <div className="container relative mx-auto flex h-fit pb-[100px]">
          <div className="max-w-[900px]">
            <div className="h-[400px] w-full py-5">
              <BackButton type="practices"></BackButton>
              <Tags
                size="lg"
                className="body-m mt-[2rem] text-neutral-rich-gray"
              >
                Project
              </Tags>
              <div className="mt-4 flex items-center gap-6">
                <h2 className="text-h2">{courseDetail.name}</h2>
                <div className="flex items-center gap-2">
                  <span>Certified by</span>
                  <span>Mantle</span>
                </div>
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
                  type={CourseTagType.LEVEL}
                  value={courseDetail.level}
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
              <IntendedLearners />
              <WillLearn />
              <Syllabus />
            </div>
          </div>
          <div className="relative flex-1">
            <PracticeDetailCard courseDetail={courseDetail} />
          </div>
        </div>
      </div>
    </PracticeDetailProvider>
  );

  function Syllabus() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex h-fit items-center gap-4">
          <div className="h-[34px] w-[5px] rounded-full bg-yellow-dark"></div>
          <h3 className="text-h3 text-neutral-black">{`Syllabus`}</h3>
        </div>
        <PracticeCatalogue courseDetail={courseDetail} />
      </div>
    );
  }
};

export default PracticePage;
