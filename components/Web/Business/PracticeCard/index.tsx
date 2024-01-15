import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import {
  CourseTrackType,
  ProjectCourseType
} from '@/service/webApi/course/type';
import { Typography } from 'antd';
import Image from 'next/image';
import { FC } from 'react';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import CourseTags from '@/components/Web/Business/CourseTags';
import { menuLink } from '@/components/Web/Business/Breadcrumb/data';
import PracticeImg1 from '@/public/images/home/practices_img1.png';
import PracticeImg2 from '@/public/images/home/practices_img2.png';
import PracticeImg3 from '@/public/images/home/practices_img3.png';
import PracticeImg4 from '@/public/images/home/practices_img4.png';
import { useRedirect } from '@/hooks/useRedirect';
import CardProgress from '../CardProgress';
import Button from '@/components/Common/Button';
import { cn } from '@/helper/utils';

interface PracticeCardProps {
  // children: ReactNode;
  course: ProjectCourseType;
  from?: 'dashboard' | 'project';
  className?: string;
  inProgress?: boolean;
}

const PracticeCard: FC<PracticeCardProps> = (props) => {
  const { course, from = 'project', className = '', inProgress } = props;
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const { redirectToUrl } = useRedirect();
  const imageRender = (track: CourseTrackType) => {
    switch (track) {
      case CourseTrackType.DeFi:
        return (
          <Image
            src={PracticeImg1}
            width={239}
            alt="practice"
            className="absolute right-0 top-0"
          ></Image>
        );
      case CourseTrackType.NFT:
        return (
          <Image
            src={PracticeImg2}
            width={126}
            alt="practice"
            className="absolute right-[32px] top-[32px]"
          ></Image>
        );
      case CourseTrackType.Gaming:
        return (
          <Image
            src={PracticeImg3}
            width={178}
            alt="practice"
            className="absolute right-[40px] top-[24px]"
          ></Image>
        );
      case CourseTrackType.Security:
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
      className={cn(
        'flex  flex-col h-[371px]  rounded-[12px]   bg-white w-[302px] hover:-translate-y-1 transition-all duration-300 mt-1 relative shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] cursor-pointer',
        className
      )}
      onClick={() => {
        BurialPoint.track('home-practice卡片点击', { practice: course.name });
        redirectToUrl(
          `${menuLink.electives}/${course.id}?${QueryIdType.MENU_COURSE_ID}=${course.id}&menu=${Menu.ELECTIVES}`
        );
      }}
    >
      {!!course.progress && course.progress >= 1 && (
        <div
          className={`absolute font-neuemachina-light top-[13px]  z-[999] right-[16px]`}
        >
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
        </div>
      )}
      <div className="w-full relative  h-[150px]">
        {imageRender(course.track)}
      </div>
      <div className="flex-1 flex flex-col justify-between w-full px-[24px] py-[20px]">
        <div>
          <div className="text-[#3e3e3e] w-[fit-content] px-[10px] py-[4px] border border-[#3e3e3e] rounded-[20px] font-next-book  tracking-[0.32px] opacity-60 text-[12px] uppercase">
            {course.track}
          </div>
          <h2
            className={`text-h4 my-[16px] ${
              from === 'dashboard' ? 'line-clamp-1' : 'line-clamp-2'
            }`}
          >
            {course.title}
          </h2>
          {inProgress ? (
            <>
              <div className="my-[16px]">
                <CardProgress progress={course.progress || 0} />
              </div>
            </>
          ) : (
            <>
              <Typography.Paragraph
                ellipsis={{ rows: 2 }}
                className="my-[13px] min-h-[45px]"
              >
                <div className="body-s text-neutral-medium-gray">
                  {course.description}
                </div>
              </Typography.Paragraph>
              {/* <div className="body-s text-[#8C8C8C] line-clamp-2">
                {course.description}
              </div> */}
            </>
          )}
        </div>
        <div>
          {inProgress ? (
            <div className="flex flex-col gap-y-5">
              <Button
                type="primary"
                className="px-0 py-[12px] h-[48px]  button-text-m text-neutral-off-black"
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
                CONTINUE
              </Button>
            </div>
          ) : (
            <CourseTags
              language={course.language}
              level={course.level as string}
              unitCount={course.unitCount || 0}
              className="justify-between"
            ></CourseTags>
          )}
        </div>

        {/* {!!course.progress && course.progress >= 1 && (
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
        )} */}
      </div>
    </div>
  );
};

export default PracticeCard;
