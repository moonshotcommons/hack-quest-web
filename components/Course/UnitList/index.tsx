import { CourseUnitType } from '@/service/webApi/course/type';
import { FC, ReactNode } from 'react';
import UnitCard from './UnitCard';

interface UnitListProps {
  units: CourseUnitType[];
}

const UnitList: FC<UnitListProps> = (props) => {
  const { units = [] } = props;
  return (
    <ul className="w-full">
      {units.map((unit, index) => {
        if (index === 0 && units.length !== 1) {
          return (
            <li key={unit.id} className="w-full relative top-line bottom-line">
              <UnitCard unit={unit}></UnitCard>
            </li>
          );
        }
        return (
          <li key={unit.id} className="w-full relative bottom-line">
            <UnitCard unit={unit}></UnitCard>
          </li>
        );
      })}
    </ul>
  );
};

export default UnitList;
