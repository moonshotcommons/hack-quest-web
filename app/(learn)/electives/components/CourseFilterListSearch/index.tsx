import CourseFilterList from '@/components/v2/Business/CourseFilterList';
import {
  courseDefaultFilters as filters,
  courseDefaultSort as sort
} from '@/components/v2/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/v2/Business/CourseFilterList/type';
import ElectiveCard from '@/components/v2/Business/ElectiveCard';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { cloneDeep } from 'lodash-es';
import { FC, useState } from 'react';

interface CourseFilterListSearchProps {
  keyword: string;
}

const CourseFilterListSearch: FC<CourseFilterListSearchProps> = ({
  keyword
}) => {
  const [searchList, setSearchList] = useState([]);
  const [searchFilterParams, setSearchFilterParams] =
    useState<FilterParamsType>({});

  return (
    <CourseFilterList
      sort={sort}
      onFilterParamsUpdate={(params) => {}}
      filters={cloneDeep(filters)}
      title={`Search result for “${keyword}”`}
      courseList={searchList}
      renderItem={(course) => {
        return (
          <ElectiveCard
            key={course.id}
            course={course as ElectiveCourseType}
          ></ElectiveCard>
        );
      }}
    ></CourseFilterList>
  );
};

export default CourseFilterListSearch;
