'use client';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { CourseUnitType } from '@/service/webApi/course/type';
import { PracticeDetailContext } from './PracticeDetailProvider';

interface UnitProviderProps {
  unit: CourseUnitType;
  children: ReactNode;
}

export const UnitContext = createContext<{ unit: CourseUnitType | null }>({
  unit: null
});

const UnitProvider: FC<UnitProviderProps> = ({ unit: propUnit, children }) => {
  const { courseDetail } = useContext(PracticeDetailContext);

  const unit = useMemo(() => {
    const units = courseDetail?.units;
    if (units?.length) {
      return units.find((u) => u.id === propUnit.id) || propUnit;
    }
    return propUnit;
  }, [propUnit, courseDetail]);

  return <UnitContext.Provider value={{ unit }}>{children}</UnitContext.Provider>;
};

export default UnitProvider;
