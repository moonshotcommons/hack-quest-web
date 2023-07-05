import { CourseUnitType } from '@/service/webApi/course/type';
import { FC, ReactNode } from 'react';

interface UnitCardProps {
  unit: CourseUnitType;
}

const UnitCard: FC<UnitCardProps> = (props) => {
  const { unit } = props;
  return (
    <div className="py-[1.5rem]">
      <div className="w-[23.25rem] h-[9.8125rem] bg-[#151515] rounded-[1.25rem]"></div>
    </div>
  );
};

export default UnitCard;
