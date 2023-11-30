import Button from '@/components/Mantle/Common/Button';
import CheckIcon from '@/components/Common/Icon/Check';
import { BurialPoint } from '@/helper/burialPoint';
import { computeProgress, tagFormate } from '@/helper/formate';
import { cn } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { CourseResponse, CourseType } from '@/service/webApi/course/type';
import { Progress, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { styled } from 'styled-components';
import LEARNING_TRACK_DARK from '@/public/images/mantle/LEARNING_TRACK_.png';
import CourseTags from '@/components/Mantle/CourseTags';

interface LearningTrackWrapCardProps {
  // children: ReactNode;
  learningTrack: CourseResponse;
  inProgress?: boolean;
  inCompleted?: boolean;
  baseProgress?: boolean;
}

const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    .ant-progress-text {
      color: #3e3e3e;
      font-size: 12px;
    }
  }
`;

const borderColor: Record<string, string> = {
  [CourseType.GUIDED_PROJECT]: 'border-[#DBCDF6]',
  [CourseType.CONCEPT]: 'border-[#DBCDF6]',
  [CourseType.SYNTAX]: 'border-[#E5F3FF]',
  [CourseType.TEASER]: 'border-[#E5F3FF]',
  [CourseType.Mini]: 'border-[#E5F3FF]'
};

const LearningTrackWrapCard: FC<LearningTrackWrapCardProps> = (props) => {
  const { learningTrack } = props;

  return (
    <div
      className={cn(
        'flex px-5 pb-[30px] pt-[54px]  text-[#fff] flex-col border-t-[10px] rounded-[10px]  h-fit  w-full hover:-translate-y-1 transition-all duration-300 mt-1 relative shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] cursor-pointer '
      )}
      style={{
        background:
          'linear-gradient(92deg, #192726 5.7%, #080909 86.3%, #131A1A 112.17%)',
        border: '1px solid #274542'
      }}
    >
      <div className="flex w-full justify-center">
        <div className="relative py-[17px]">
          <Image
            src={LEARNING_TRACK_DARK}
            width={160}
            alt="course"
            className="object-cover"
          ></Image>
        </div>
      </div>
      <h3 className=" text-[16px]  leading-[160%]  tracking-[0.32px] opacity-60 text-base">
        Learning Track
      </h3>
      <h2 className="text-[18px] font-bold  tracking-[1.08px] mt-[5px] mb-[9px]">
        {learningTrack.name}
      </h2>
      <CourseTags
        level={learningTrack.level as string}
        duration={learningTrack.duration}
        unitCount={learningTrack.unitCount}
      ></CourseTags>
      <div className="flex flex-col gap-y-5 mt-[40px]">
        <Button
          block
          className="
          font-next-book
          text-[1.125rem]
          border
          bg-transparent
          text-white hover:text-auth-ghost-button-text-hover-color
          border-white hover:border-auth-ghost-button-border-hover-color
          "
        >
          View Syllabus
        </Button>
        <Button
          block
          iconPosition="right"
          type="primary"
          className="
          font-next-book
          text-[1.125rem]
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          "
        >
          Enroll
        </Button>
      </div>
    </div>
  );
};

export default LearningTrackWrapCard;
