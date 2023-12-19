import Button from '@/components/v2/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { tagFormate } from '@/helper/formate';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { CourseResponse } from '@/service/webApi/course/type';
import { Typography } from 'antd';
import Image from 'next/image';
import { FC } from 'react';
import { Menu, QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import CourseTags from '@/components/v2/Business/CourseTags';
import { menuLink } from '@/components/v2/Business/Breadcrumb/data';
import PracticeImg1 from '@/public/images/home/practices_img1.png';
import PracticeImg2 from '@/public/images/home/practices_img2.png';
import PracticeImg3 from '@/public/images/home/practices_img3.png';
import PracticeImg4 from '@/public/images/home/practices_img4.png';
import CardProgress from '../CardProgress';
import { useRedirect } from '@/hooks/useRedirect';

interface PracticeCardProps {
  // children: ReactNode;
  course: CourseResponse;
}

const PracticeCard: FC<PracticeCardProps> = (props) => {
  const { course } = props;
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const { redirectToUrl } = useRedirect();

  const imageRender = (i: any) => {
    switch (i) {
      case 1:
        return (
          <Image
            src={PracticeImg1}
            width={239}
            alt="practice"
            className="absolute right-0 top-0"
          ></Image>
        );
      case 2:
        return (
          <Image
            src={PracticeImg2}
            width={126}
            alt="practice"
            className="absolute right-[32px] top-[32px]"
          ></Image>
        );
      case 3:
        return (
          <Image
            src={PracticeImg3}
            width={178}
            alt="practice"
            className="absolute right-[40px] top-[24px]"
          ></Image>
        );
      case 4:
        return (
          <Image
            src={PracticeImg4}
            width={123}
            alt="practice"
            className="absolute right-[40px] top-[20px]"
          ></Image>
        );
    }
  };
  return (
    <div
      className={
        'flex  flex-col h-[371px]  rounded-[12px]   bg-white w-[302px] hover:-translate-y-1 transition-all duration-300 mt-1 relative shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] cursor-pointer'
      }
      onClick={() => {
        BurialPoint.track('home-practice卡片点击', { practice: course.name });
        redirectToUrl(
          `${menuLink.electives}/${course.id}?${QueryIdType.MENU_COURSE_ID}=${course.id}&menu=${Menu.ELECTIVES}`
        );
      }}
    >
      {course.progress >= 1 && (
        <div className="absolute font-neuemachina-light top-[13px] left-[16px] z-[2]">
          {course.progress < 1 && course.progress > 0 && (
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#00C365" />
              <path
                d="M8 15.9999L14.4 22.3999L25.6 11.1999"
                stroke="white"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
      )}
      <div className="w-full relative  h-[150px]">{imageRender(4)}</div>
      <div className="flex-1 flex flex-col justify-between w-full px-[24px] py-[20px]">
        <div>
          <div className="text-[#3e3e3e] w-[fit-content] px-[10px] py-[4px] border border-[#3e3e3e] rounded-[20px] font-next-book  tracking-[0.32px] opacity-60 text-[12px]">
            {tagFormate(course.type)}
          </div>
          <h2 className="text-[21px] font-next-poster-Bold text-[#000] leading-[21px] tracking-[1.16px] my-[16px]">
            {course.name}
          </h2>
          {course.progress === 0 && (
            <Typography.Paragraph
              ellipsis={{ rows: 2 }}
              className="my-[13px] min-h-[45px]"
            >
              <div className="text-[14px] font-next-book-Thin leading-[160%] text-[#8C8C8C]">
                {course.description}
              </div>
            </Typography.Paragraph>
          )}
          {course.progress > 0 && course.progress < 1 && (
            <CardProgress
              progress={course.progress}
              className="mb-[8px] text-[12px]"
            />
          )}
        </div>
        {course.progress === 0 && (
          <CourseTags
            level={course.level as string}
            unitCount={course.unitCount || 0}
            className="justify-between"
          ></CourseTags>
        )}

        {course.progress > 0 && course.progress < 1 && (
          <div className="flex flex-col gap-y-5">
            <Button
              type="primary"
              className="px-0 py-[12px] flex text-[16px] font-next-book tracking-[0.32] leading-[125%]"
              block
              loading={loading}
              disabled={loading}
              onClick={(e) => {
                BurialPoint.track('home-course卡片Continue按钮点击', {
                  courseName: course.name
                });
                e.stopPropagation();
                jumpLearningLesson(course, {
                  menu: 'electives',
                  idTypes: [QueryIdType.MENU_COURSE_ID],
                  ids: [course.id]
                });
              }}
            >
              Continue
            </Button>
          </div>
        )}
        {course.progress >= 1 && (
          <div className="flex flex-col gap-y-5">
            <Button
              type="primary"
              className="px-0 py-[12px] flex text-[16px] font-next-book tracking-[0.32] leading-[125%]"
              block
              onClick={() => {
                BurialPoint.track('home-course卡片View Syllabus按钮点击', {
                  courseName: course.name
                });
              }}
            >
              View Syllabus
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeCard;
