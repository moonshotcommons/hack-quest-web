import { FC, ReactNode } from 'react';

import { ProjectCourseType } from '@/service/webApi/course/type';
import React, { useState } from 'react';
import FilterSelect from './FilterSelect';
import { FilterItemType, FilterOptionType, FilterParamsType } from './type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { mergeFilterParams } from './constant';
import Loading from '../../Common/Loading';

export enum CourseFilterListType {
  DEFAULT = 'default',
  SEARCH = 'search'
}

interface CourseFilterListProps {
  title: string;
  filters: FilterItemType[];
  sort: FilterOptionType[];
  renderItem: (course: ProjectCourseType | ElectiveCourseType) => ReactNode;
  courseList: (ProjectCourseType | ElectiveCourseType)[];
  loading?: boolean;
  onFilterParamsUpdate: (filterParams: FilterParamsType) => void;
}

const CourseFilterList: FC<CourseFilterListProps> = ({
  renderItem,
  courseList,
  title,
  filters: propFilters,
  sort: propSort,
  onFilterParamsUpdate,
  loading
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
          onFilterParamsUpdate(mergeFilterParams(filters, sort));
        }}
        sort={sort}
        updateSort={(newSort) => {
          setSort(newSort);
          // onSortUpdate(newFilters);
        }}
      ></FilterSelect>
      <Loading loading={!!loading}>
        {!!courseList?.length && (
          <div className="flex-1 flex flex-wrap gap-x-6 gap-y-8  pb-[20px] h-full">
            {courseList?.map((course, index) => {
              return <div key={course.id + index}>{renderItem(course)}</div>;
            })}
          </div>
        )}
      </Loading>
    </div>
  );
};

export default CourseFilterList;
