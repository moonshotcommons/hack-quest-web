import LockIcon from '@/components/Common/Icon/Lock';
import { computeProgress } from '@/helper/formate';
import { getCourseLink } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import webApi from '@/service';
import {
  CourseDetailType,
  CourseType,
  CourseUnitType
} from '@/service/webApi/course/type';
import { Progress, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styled from 'styled-components';

const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    .ant-progress-text {
      color: white;
      font-size: 1rem;
    }
  }
`;

interface UnitCardProps {
  unit: CourseUnitType;
  isLock?: boolean;
  courseType?: CourseType;
  index: number;
  courseDetail?: CourseDetailType;
}

const UnitButton: FC<
  UnitCardProps & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { unit, isLock, ...rest } = props;
  if (isLock) {
    return null;
  }

  if (unit.progress === 1) {
    return null;
  }

  if (!unit.progress) {
    return (
      <button
        className="px-8 py-4 border border-solid border-[#F2F2F2] rounded-[2.5rem] whitespace-nowrap text-sm text-[#F2F2F2] primary-button-hover cursor-pointer"
        {...rest}
      >
        Start Learning
      </button>
    );
  }

  return (
    <button
      className="px-8 py-4 border border-solid border-[#F2F2F2] rounded-[2.5rem] whitespace-nowrap text-sm text-[#F2F2F2] primary-button-hover cursor-pointer"
      {...rest}
    >
      Resume Learning
    </button>
  );
};

const UnitCard: FC<UnitCardProps> = (props) => {
  const { unit, isLock = true, courseDetail, courseType, index } = props;
  const router = useRouter();
  const jumpLearningLesson = useJumpLeaningLesson(
    courseDetail as CourseDetailType
  );
  return (
    <div className="py-[1.5rem] flex  items-center">
      <div
        className={`w-[23.25rem] h-[9.8125rem] bg-[#151515] rounded-[1.25rem] overflow-hidden ${
          unit.progress === 1 ? 'cursor-pointer' : ''
        }`}
        onClick={async (e) => {
          if (unit.progress === 1) {
            const unitPages = await webApi.courseApi.getCourseUnitLessons(
              courseDetail?.id || '',
              unit.id
            );
            const lessonId = unitPages.pages[0]?.id;
            router.replace(
              `${getCourseLink(courseType)}/${
                courseDetail?.name
              }/learn/${lessonId}`
            );
          }
        }}
      >
        <Image
          src={`/images/unit/unit_cover/${index + 1}.png`}
          alt="cover"
          width={372}
          height={157}
        ></Image>
      </div>
      <div className="ml-[3.69rem] h-[9.8125rem] w-[22.4375rem]">
        <h2 className="font-next-book-bold font-bold text-[1.5rem] mt-[1.72rem] text-[#F2F2F2] leading-[120%]">
          {unit.name}
        </h2>
        <div>
          <Typography.Paragraph
            ellipsis={{ rows: 3 }}
            className="text-[#676767] font-next-book leading-[120%] text-base mt-4 "
          >
            {unit.description}
          </Typography.Paragraph>
        </div>
      </div>
      <div className="text-white flex-1 flex items-center justify-center">
        {isLock ? (
          <LockIcon width={16} height={21} color="#F2F2F2"></LockIcon>
        ) : (
          <CustomProgress
            type="circle"
            percent={Math.floor(computeProgress(unit.progress))}
            strokeWidth={2}
            strokeColor="#9EFA13"
            trailColor="#676767"
            size={80}
            format={(percent: any) => `${percent} %`}
          ></CustomProgress>
        )}
      </div>

      <div className="flex-1">
        <UnitButton
          unit={unit}
          isLock={isLock}
          index={index}
          onClick={jumpLearningLesson}
        ></UnitButton>
      </div>
    </div>
  );
};

export default UnitCard;
