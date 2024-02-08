import { CourseDetailType, CourseUnitType } from '@/service/webApi/course/type';

import { FC, Suspense } from 'react';
import { UnitStatusButton } from '../../StatusButton';
import LinkWrap from './LinkWrap';
import UnitProvider from '../../Provider/UnitProvider';

interface PracticeCatalogueItemProps {
  unit: CourseUnitType;
  // isLock?: boolean;
  index: number;
  courseDetail?: CourseDetailType;
  loading?: boolean;
}

const PracticeCatalogueItem: FC<PracticeCatalogueItemProps> = (props) => {
  const { unit, courseDetail, index } = props;

  return (
    <UnitProvider unit={unit}>
      <div className="flex items-center p-4">
        <div className="flex-1">
          <Suspense fallback={<div>loading...</div>}>
            <LinkWrap unit={unit} courseDetail={courseDetail!}>
              <h2 className="body-l-bold text-neutral-black">{unit.name}</h2>
              <p className="body-s mt-1 line-clamp-3  text-neutral-medium-gray">
                {unit.description}
              </p>
            </LinkWrap>
          </Suspense>
        </div>

        <div className="flex w-[165px] max-w-[165px] justify-end">
          <UnitStatusButton
            courseDetail={courseDetail!}
            unit={unit}
            index={index}
          />
        </div>
      </div>
    </UnitProvider>
  );
};

export default PracticeCatalogueItem;
