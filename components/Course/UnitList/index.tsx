import {
  CourseDetailType,
  CourseType,
  CourseUnitType
} from '@/service/webApi/course/type';
import { FC, ReactNode, useEffect, useState } from 'react';
import UnitCard from './UnitCard';

interface UnitListProps {
  courseDetail?: CourseDetailType;
}

const UnitList: FC<UnitListProps> = (props) => {
  const { courseDetail } = props;

  const { type: courseType } = courseDetail || {};
  const [units, setUnits] = useState(courseDetail?.units || []);

  useEffect(() => {
    if (courseDetail?.units?.length) {
      setUnits(courseDetail.units);
    }
  }, [courseDetail]);

  return (
    <ul className="w-full">
      {units.map((unit, index) => {
        if (index === 0) {
          return (
            <li key={unit.id} className="w-full relative top-line bottom-line">
              <UnitCard
                unit={unit}
                isLock={false}
                courseType={courseType}
                index={index}
                courseDetail={courseDetail}
              ></UnitCard>
            </li>
          );
        }
        return (
          <li key={unit.id} className="w-full relative bottom-line">
            <UnitCard
              unit={unit}
              isLock={units[index - 1].progress < 1 || !unit.progress}
              courseType={courseType}
              index={index}
              courseDetail={courseDetail}
            ></UnitCard>
          </li>
        );
      })}
    </ul>
  );
};

export default UnitList;
