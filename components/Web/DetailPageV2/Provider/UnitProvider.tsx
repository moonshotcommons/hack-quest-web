'use client';
import { FC, ReactNode, createContext, useContext, useMemo } from 'react';
import { CourseDetailType, CourseUnitType } from '@/service/webApi/course/type';
import { CourseDetailContext } from '@/components/Web/DetailPageV2/Provider/CourseDetailProvider';

interface UnitProviderProps {
  unit: CourseUnitType;
  children: ReactNode;
}

export const UnitContext = createContext<{ unit: CourseUnitType | null }>({
  unit: null
});

const UnitProvider: FC<UnitProviderProps> = ({ unit: propUnit, children }) => {
  const { courseDetail: contextCourseDetail } = useContext(CourseDetailContext);
  const courseDetail = contextCourseDetail as CourseDetailType;
  const unit = useMemo(() => {
    const units = courseDetail?.units;
    if (units?.length) {
      return units.find((u) => u.id === propUnit.id) || propUnit;
    }
    return propUnit;
  }, [propUnit, courseDetail]);

  return (
    <UnitContext.Provider value={{ unit }}>{children}</UnitContext.Provider>
  );
};

export default UnitProvider;
