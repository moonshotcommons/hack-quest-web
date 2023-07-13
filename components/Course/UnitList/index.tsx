import {
  CourseDetailType,
  CourseType,
  CourseUnitType
} from '@/service/webApi/course/type';
import { FC, ReactNode } from 'react';
import UnitCard from './UnitCard';

interface UnitListProps {
  courseDetail: CourseDetailType;
}

const UnitList: FC<UnitListProps> = (props) => {
  const { courseDetail } = props;

  const { units = [], type: courseType } = courseDetail;

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
              isLock={!unit.progress}
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
