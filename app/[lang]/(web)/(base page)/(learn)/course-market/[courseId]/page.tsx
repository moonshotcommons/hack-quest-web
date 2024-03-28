import Tags from '@/components/Common/Tags';
import { UnitCatalogue } from '@/components/Web/DetailPageV2/Catalogue';
import CourseTag, { CourseTagType } from '@/components/Web/DetailPageV2/CourseTag';
import webApi from '@/service';
import { FC } from 'react';
import Logo from '@/public/images/logo/logo.svg';
import BackButton from '@/components/Web/DetailPageV2/BackButton';
import IntendedLearners from '@/components/Web/DetailPageV2/IntendedLearners';
import KnowledgeGain from '@/components/Web/DetailPageV2/KnowledgeGain';
import PracticeDetailCard from './components/CourseMarketDetailCard';
import CourseDetailProvider from '@/components/Web/DetailPageV2/Provider/CourseDetailProvider';
import { Metadata } from 'next';
import { CourseDetailType } from '@/service/webApi/course/type';
import Image from 'next/image';
import UgcCourseCard from '@/components/Web/Business/UgcCourseCard';
import LinkArrow from '@/components/Common/LinkArrow';
import MenuLink from '@/constants/MenuLink';
import Link from 'next/link';

interface PracticePageProps {
  params: {
    courseId: string;
  };
  searchParams: {
    menuCourseId: string;
    menu: string;
  };
}

export async function generateMetadata({ params, searchParams }: PracticePageProps, parent: any): Promise<Metadata> {
  // 读取路由参数
  const courseId = params.courseId;

  const courseDetail = await webApi.courseApi.fetchCourseDetail<CourseDetailType>(courseId);

  const metadata: Metadata = {
    title: courseDetail.title,
    alternates: {
      canonical: `https://www.hackquest.io/practices/${courseId}`
    }
  };

  return metadata;
}

const PracticePage: FC<PracticePageProps> = async (props) => {
  const { params, searchParams } = props;
  const courseId = params.courseId;

  const courseDetail = await webApi.courseApi.fetchCourseDetail(courseId, true);
  let otherCourses = null;

  try {
    otherCourses = await webApi.courseApi.fetchCoursesByCreator(courseId);
  } catch (e) {}

  return (
    <CourseDetailProvider courseId={courseId} includeUnits>
      <div className="relative min-h-[100%] w-full bg-neutral-white">
        <div className="absolute left-0 top-0 min-h-[400px] w-full bg-neutral-off-white py-5"></div>
        <div className="container relative mx-auto flex h-fit pb-[100px]">
          <div className="w-[900px] max-w-[900px]">
            <div className="h-[400px] w-full py-5">
              <BackButton type="practices"></BackButton>
              <Tags size="lg" className="body-m mt-[2rem] text-neutral-rich-gray">
                Development
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
                <CourseTag
                  icon={
                    <div className="relative h-8 w-8">
                      <Image
                        fill
                        src={courseDetail.creator?.profileImage || Logo}
                        alt={courseDetail.creator?.name || `Hackquest`}
                      ></Image>
                    </div>
                  }
                  type={CourseTagType.CREATE_BY}
                  value={courseDetail.creator?.name || `Hackquest`}
                ></CourseTag>
                <div className="h-[45px] w-[1px] bg-neutral-rich-gray"></div>
                <CourseTag type={CourseTagType.LANGUAGE} value={courseDetail.language}></CourseTag>
                <div className="h-[45px] w-[1px] bg-neutral-rich-gray"></div>
                <CourseTag type={CourseTagType.LEVEL} value={courseDetail.level}></CourseTag>
                <div className="h-[45px] w-[1px] bg-neutral-rich-gray"></div>
                <CourseTag type={CourseTagType.DURATION} value={courseDetail.duration + ''}></CourseTag>
              </div>
            </div>

            <div className="mt-20  flex flex-col gap-20">
              {/* <CertificationCard  /> */}
              {courseDetail.intendedLearners && <IntendedLearners intendedLearners={courseDetail.intendedLearners} />}
              {courseDetail.knowledgeGain && <KnowledgeGain knowledgeGain={courseDetail.knowledgeGain} />}
              <Syllabus />
            </div>
          </div>
          <div className="relative flex-1">
            <PracticeDetailCard courseDetail={courseDetail} />
          </div>
        </div>
        {courseDetail.creator?.name && !!otherCourses?.length && (
          <div className="w-full bg-neutral-off-white py-[60px]">
            <div className="container mx-auto flex flex-col gap-[30px] ">
              <div className="flex items-center justify-between">
                <h3 className="text-h3 text-neutral-black">
                  More Courses By {courseDetail.creator?.name || `Hackquest`}
                </h3>
                <Link href={`${MenuLink.COURSE_MARKET}?keyword=${courseDetail.creator?.name}`}>
                  <LinkArrow size="lg" direction="right">
                    View More
                  </LinkArrow>
                </Link>
              </div>
              <div className="flex w-full gap-5 [&>a]:w-[calc((100%-60px)/4)]">
                {/* <UgcCourseCard /> */}
                {[...otherCourses, ...otherCourses, ...otherCourses, ...otherCourses]?.map((item, index) => {
                  return <UgcCourseCard course={item} key={index}></UgcCourseCard>;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </CourseDetailProvider>
  );

  function Syllabus() {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex h-fit items-center gap-4">
          <div className="h-[34px] w-[5px] rounded-full bg-yellow-dark"></div>
          <h3 className="text-h3 text-neutral-black">{`Syllabus`}</h3>
        </div>
        <UnitCatalogue courseDetail={courseDetail} />
      </div>
    );
  }
};

export default PracticePage;
