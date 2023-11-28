import Button from '@/components/v2/Common/Button';
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
import CourseTags from '@/components/v2/CourseTags';
import LEARNING_TRACK_DARK from '@/public/images/v2/course/course_cover/LEARNING_TRACK_light.png';

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
        'flex px-5 pb-[30px] flex-col border-t-[10px] rounded-[10px]  h-fit bg-white w-[full] hover:-translate-y-1 transition-all duration-300 mt-1 relative shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] cursor-pointer border-[#ffd850]'
      )}
    >
      <div className="flex w-full justify-center">
        <div className=" relative py-[15px]">
          <Image
            src={LEARNING_TRACK_DARK}
            height={123}
            alt="course"
            className="object-cover"
          ></Image>
        </div>
      </div>
      <h3 className="text-[#0B0B0B] text-[16px] font-next-book leading-[160%]  tracking-[0.32px] opacity-60 text-base">
        Learning Track
      </h3>
      <h2 className="text-[18px] font-next-poster-Bold text-[#000] tracking-[1.08px] mt-[5px] mb-[9px]">
        {learningTrack.name}
      </h2>
      <CourseTags
        level={learningTrack.level as string}
        duration={learningTrack.duration}
        unitCount={learningTrack.unitCount}
      ></CourseTags>
      <Typography.Paragraph
        ellipsis={{ rows: 2 }}
        className="my-[13px] min-h-[45px]"
      >
        <div className="text-[14px] font-next-book-Thin leading-[160%] text-[#000]">
          {learningTrack.description}
        </div>
      </Typography.Paragraph>
      <div className="flex flex-col gap-y-5 mt-[20px]">
        <Button
          className="border border-[#000] rounded-[32px] px-0 py-[12px] flex text-[16px] font-next-book tracking-[0.32] leading-[125%]"
          block
        >
          View Syllabus
        </Button>
        <Button
          type="primary"
          className="px-0 py-[12px] flex text-[16px] font-next-book tracking-[0.32] leading-[125%]"
          block
        >
          Enroll
        </Button>
      </div>
    </div>
  );
};

export default LearningTrackWrapCard;
