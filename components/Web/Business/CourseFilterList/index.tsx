import { ReactNode } from 'react';

import { CourseBaseType } from '@/service/webApi/course/type';
import React, { useState } from 'react';
import FilterSelect from './FilterSelect';
import { FilterItemType, FilterOptionType, FilterParamsType } from './type';
import { mergeFilterParams } from './constant';
import CourseCardSkeleton from '../CourseCardSkeleton';

export enum CourseFilterListType {
  DEFAULT = 'default',
  SEARCH = 'search'
}

interface CourseFilterListProps<T extends CourseBaseType> {
  title: string;
  filters: FilterItemType[];
  sort: FilterOptionType[];
  renderItem: (course: T) => ReactNode;
  courseList: T[];
  loading?: boolean;
  onFilterParamsUpdate: (filterParams: FilterParamsType) => void;
}

const CourseFilterList = <T extends CourseBaseType>({
  renderItem,
  courseList,
  title,
  filters: propFilters,
  sort: propSort,
  onFilterParamsUpdate,
  loading
}: CourseFilterListProps<T>) => {
  const [filters, setFilters] = useState(propFilters);
  const [sort, setSort] = useState(propSort);

  return (
    <div className="flex flex-col gap-y-8">
      <h3 className="text-h3 text-neutral-black">{title}</h3>
      <FilterSelect
        filters={filters}
        updateFilters={(newFilters) => {
          setFilters(newFilters);
          onFilterParamsUpdate(mergeFilterParams(newFilters, sort));
        }}
        sort={sort}
        updateSort={(newSort) => {
          setSort(newSort);
          onFilterParamsUpdate(mergeFilterParams(filters, newSort));
        }}
      ></FilterSelect>
      {/* <CourseCardSkeleton.List></CourseCardSkeleton.List> */}
      {/* <Loading loading={!!loading}> */}
      <div className="w-full h-fit min-h-[600px]">
        {/* {!!courseList?.length && ( */}
        <div className="flex-1 flex flex-wrap gap-x-6 gap-y-8  pb-[20px] h-full">
          {/* {courseList?.map((course, index) => {
              return <div key={course.id + index}>{renderItem(course)}</div>;
            })} */}
          <CourseCardSkeleton.List active={loading as boolean}>
            {courseList?.map((course, index) => {
              return <div key={course.id + index}>{renderItem(course)}</div>;
            })}
          </CourseCardSkeleton.List>
        </div>
        {/* )} */}
      </div>
      {/* </Loading> */}
    </div>
  );
};

export default CourseFilterList;
