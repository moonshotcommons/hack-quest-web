import { FC, ReactNode } from 'react';

import { CourseResponse } from '@/service/webApi/course/type';
import React, { useState } from 'react';
import FilterSelect from './FilterSelect';
import { FilterItemType, FilterOptionType } from './type';
import { MiniElectiveCourseType } from '@/service/webApi/elective/type';

export enum CourseFilterListType {
  DEFAULT = 'default',
  SEARCH = 'search'
}

interface CourseFilterListProps {
  title: string;
  filters: FilterItemType[];
  sort?: FilterOptionType[];
  renderItem: (course: CourseResponse | MiniElectiveCourseType) => ReactNode;
  courseList: (CourseResponse | MiniElectiveCourseType)[];
  onFiltersUpdate: (newFilters: FilterItemType[]) => void;
  onSortUpdate: (newSort: FilterItemType[]) => void;
}

const CourseFilterList: FC<CourseFilterListProps> = ({
  renderItem,
  courseList,
  title,
  filters: propFilters,
  onFiltersUpdate,
  sort: propSort
}) => {
  const [filters, setFilters] = useState(propFilters);
  const [sort, setSort] = useState(propSort);
  return (
    <div className="flex flex-col gap-y-8">
      <h3 className="text-h3 text-neutral-black">{title}</h3>
      <FilterSelect
        filters={filters}
        updateFilters={(newFilters) => {
          setFilters(newFilters);
          // onFiltersUpdate(newFilters);
        }}
        sort={sort}
        updateSort={(newSort) => {
          setSort(newSort);
          // onSortUpdate(newFilters);
        }}
      ></FilterSelect>
      {!!courseList?.length && (
        <div className="flex-1 flex flex-wrap gap-x-6 gap-y-8  pb-[20px] h-full">
          {courseList?.map((course, index) => {
            return <div key={course.id + index}>{renderItem(course)}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default CourseFilterList;
