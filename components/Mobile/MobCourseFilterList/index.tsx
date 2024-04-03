import { ReactNode, useMemo, useRef } from 'react';

import { CourseBaseType } from '@/service/webApi/course/type';
import React, { useState } from 'react';
import { FilterItemType, FilterOptionType, FilterParamsType } from './type';
import { mergeFilterParams } from './constant';
import FilterButton from './FilterButton';
import FilterModal, { FilterModalRef } from './FilterModal';
import Loading from '@/components/Common/Loading';
import { cn } from '@/helper/utils';
// import CourseCardSkeleton from '../CourseCardSkeleton';

export enum MobCourseFilterListType {
  DEFAULT = 'default',
  SEARCH = 'search'
}

type CourseAndTrackType = Omit<CourseBaseType, 'title'> & {
  name?: string;
  title?: string;
};

interface MobCourseFilterListProps<T extends { id: string }> {
  title?: string;
  filters: FilterItemType[];
  sort: FilterOptionType[];
  radio?: boolean;
  renderItem: (course: T) => ReactNode;
  courseList: T[];
  loading?: boolean;
  onFilterParamsUpdate: (filterParams: FilterParamsType) => void;
  listClassName?: string;
}

const MobCourseFilterList = <T extends { id: string }>({
  renderItem,
  courseList,
  title,
  filters: propFilters,
  sort: propSort,
  onFilterParamsUpdate,
  loading,
  radio = false,
  listClassName = ''
}: MobCourseFilterListProps<T>) => {
  const [filters, setFilters] = useState(propFilters);
  const [sort, setSort] = useState(propSort);
  const filterModalInstance = useRef<FilterModalRef>(null);

  const isSelectFilter = useMemo(() => {
    return !!filters.find((filter) => filter.options.find((option) => option.isSelect && option.value));
  }, [filters]);

  return (
    <div className="flex flex-col gap-y-5">
      <h2 className="text-h2-mob text-neutral-black">{title}</h2>
      <FilterButton
        count={courseList.length}
        isSelectFilter={isSelectFilter}
        onClick={() => {
          filterModalInstance.current?.open();
        }}
      />

      {/* <CourseCardSkeleton.List></CourseCardSkeleton.List> */}
      <Loading loading={!!loading}>
        <div className={cn('h-fit min-h-[15rem] w-full')}>
          {/* {!!courseList?.length && ( */}
          <div className={cn('flex h-full flex-col gap-y-[1.25rem] pb-[1.25rem]', listClassName)}>
            {courseList?.map((course, index) => {
              return (
                <div key={course.id + index} className="w-full">
                  {renderItem(course)}
                </div>
              );
            })}
          </div>
        </div>
      </Loading>
      <FilterModal
        ref={filterModalInstance}
        filters={filters}
        radio={radio}
        updateFilters={(newFilters) => {
          setFilters(newFilters);
          onFilterParamsUpdate(mergeFilterParams(newFilters, sort));
        }}
        sort={sort}
        updateSort={(newSort) => {
          setSort(newSort);
          onFilterParamsUpdate(mergeFilterParams(filters, newSort));
        }}
      ></FilterModal>
    </div>
  );
};

export default MobCourseFilterList;
