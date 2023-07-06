import LockIcon from '@/components/Common/Icon/Lock';
import { computeProgress } from '@/helper/formate';
import { getCourseLink } from '@/helper/utils';
import { CourseType, CourseUnitType } from '@/service/webApi/course/type';
import { Progress } from 'antd';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
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
}

const UnitButton: FC<UnitCardProps> = (props) => {
  const { unit, isLock } = props;
  if (isLock) {
    return null;
  }

  if (unit.progress === 1) {
    return null;
  }

  if (unit.progress === 0) {
    return (
      <button className="px-8 py-4 border border-solid border-[#F2F2F2] rounded-[2.5rem] whitespace-nowrap text-sm text-[#F2F2F2] primary-button-hover">
        Start Learning
      </button>
    );
  }

  return (
    <button className="px-8 py-4 border border-solid border-[#F2F2F2] rounded-[2.5rem] whitespace-nowrap text-sm text-[#F2F2F2] primary-button-hover">
      Resume Learning
    </button>
  );
};

const UnitCard: FC<UnitCardProps> = (props) => {
  const { unit, isLock = true, courseType } = props;
  return (
    <div className="py-[1.5rem] flex  items-center">
      <div className="w-[23.25rem] h-[9.8125rem] bg-[#151515] rounded-[1.25rem]"></div>
      <div className="ml-[3.69rem] flex-1">
        <h2 className="font-next-book-bold font-bold text-[1.5rem] text-[#F2F2F2]">
          {unit.name}
        </h2>
        <div className="text-[#676767] font-next-book leading-[120%]">
          {unit.description}
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
      <Link
        className="flex-1 flex justify-end"
        href={`${getCourseLink(courseType, 'unit')}/${unit.id}`}
      >
        <UnitButton unit={unit} isLock={isLock}></UnitButton>
      </Link>
    </div>
  );
};

export default UnitCard;
