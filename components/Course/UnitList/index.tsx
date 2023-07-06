import { CourseType, CourseUnitType } from '@/service/webApi/course/type';
import { FC, ReactNode } from 'react';
import UnitCard from './UnitCard';

interface UnitListProps {
  units: CourseUnitType[];
  courseType?: CourseType;
}

const UnitList: FC<UnitListProps> = (props) => {
  const { units = [], courseType } = props;

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
              ></UnitCard>
            </li>
          );
        }
        return (
          <li key={unit.id} className="w-full relative bottom-line">
            <UnitCard
              unit={unit}
              isLock={units[index - 1].progress < 1 && unit.progress === 0}
              courseType={courseType}
              index={index}
            ></UnitCard>
          </li>
        );
      })}
    </ul>
  );
};

export default UnitList;
