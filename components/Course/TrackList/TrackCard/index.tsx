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

interface TrackCardProps {
  // unit: CourseUnitType;
  // isLock?: boolean;
  // courseType?: CourseType;
  // index: number;
  // courseDetail?: CourseDetailType;
}

// const UnitButton: FC<
//   TrackCardProps & ButtonHTMLAttributes<HTMLButtonElement>
// > = (props) => {
//   const { unit, isLock, ...rest } = props;
//   if (isLock) {
//     return null;
//   }

//   if (unit.progress === 1) {
//     return null;
//   }

//   if (!unit.progress) {
//     return (
//       <button
//         className="px-8 py-4 border border-solid border-[#F2F2F2] rounded-[2.5rem] whitespace-nowrap text-sm text-[#F2F2F2] primary-button-hover cursor-pointer"
//         {...rest}
//       >
//         Start Learning
//       </button>
//     );
//   }

//   return (
//     <button
//       className="px-8 py-4 border border-solid border-[#F2F2F2] rounded-[2.5rem] whitespace-nowrap text-sm text-[#F2F2F2] primary-button-hover cursor-pointer"
//       {...rest}
//     >
//       Resume Learning
//     </button>
//   );
// };

const TrackCard: FC<TrackCardProps> = (props) => {
  // const { unit, isLock = true, courseDetail, courseType, index } = props;
  const router = useRouter();
  // const jumpLearningLesson = useJumpLeaningLesson(
  //   courseDetail as CourseDetailType
  // );
  return <div className="py-[1.5rem] flex items-center"></div>;
};

export default TrackCard;
