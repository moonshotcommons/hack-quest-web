import { CourseDetailType } from '@/service/webApi/course/type';
import { FC, useEffect, useState } from 'react';
import { LearningStatus } from '../type';
import UnitCard from './UnitCard';

interface UnitListProps {
  courseDetail: CourseDetailType;
  learningStatus?: LearningStatus;
}

const UnitList: FC<UnitListProps> = (props) => {
  const { courseDetail, learningStatus = LearningStatus.UN_START } = props;

  const { type: courseType } = courseDetail || {};
  const [units, setUnits] = useState(courseDetail?.units || []);

  useEffect(() => {
    if (courseDetail?.units?.length) {
      setUnits(courseDetail.units);
    }
  }, [courseDetail]);

  return (
    <ul className="flex flex-col">
      {courseDetail.units!.map((unit, index) => {
        if (index === 0) {
          return (
            <li key={unit.id} className="top-line bottom-line relative w-full">
              <UnitCard
                unit={unit}
                isLock={false}
                courseType={courseType}
                index={index}
                courseDetail={courseDetail}
                learningStatus={learningStatus}
              ></UnitCard>
            </li>
          );
        }
        return (
          <li key={unit.id} className="bottom-line relative w-full">
            <UnitCard
              unit={unit}
              isLock={
                units[index - 1].progress < 1 || unit.progress === undefined
              }
              courseType={courseType}
              index={index}
              learningStatus={learningStatus}
              courseDetail={courseDetail}
            ></UnitCard>
          </li>
        );
      })}
    </ul>
  );
};

export default UnitList;
