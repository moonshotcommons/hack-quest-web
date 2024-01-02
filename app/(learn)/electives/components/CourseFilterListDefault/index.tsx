import CourseFilterList from '@/components/v2/Business/CourseFilterList';
import {
  courseDefaultFilters as filters,
  courseDefaultSort as sort
} from '@/components/v2/Business/CourseFilterList/constant';
import ElectiveCard from '@/components/v2/Business/ElectiveCard';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { cloneDeep } from 'lodash-es';
import { FC, useState } from 'react';
interface CourseFilterListDefaultProps {}

const CourseFilterListDefault: FC<CourseFilterListDefaultProps> = (props) => {
  const [courseList, setCourseList] = useState([]);
  const [filterParams, setFilterParams] = useState({});

  return (
    <CourseFilterList
      title="Explore Web 3"
      onFilterParamsUpdate={() => {}}
      courseList={courseList}
      filters={cloneDeep(filters)}
      sort={sort}
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

export default CourseFilterListDefault;
