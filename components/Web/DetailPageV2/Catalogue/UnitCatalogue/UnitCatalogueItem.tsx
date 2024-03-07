import { CourseDetailType, CourseUnitType } from '@/service/webApi/course/type';

import { FC, Suspense } from 'react';
import UnitStatusButton from './UnitStatusButton';
import LinkWrap from './LinkWrap';
import UnitProvider from '../../Provider/UnitProvider';

interface UnitCatalogueItemProps {
  unit: CourseUnitType;
  // isLock?: boolean;
  index: number;
  courseDetail?: CourseDetailType;
  loading?: boolean;
}

const UnitCatalogueItem: FC<UnitCatalogueItemProps> = (props) => {
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

        <div className="flex w-[322px] max-w-[322px] justify-end">
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

export default UnitCatalogueItem;
