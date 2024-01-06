import CourseFilterList from '@/components/Web/Business/CourseFilterList';
import {
  courseDefaultFilters as filters,
  mergeFilterParams,
  courseDefaultSort as sort
} from '@/components/Web/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/Web/Business/CourseFilterList/type';
import ElectiveCard from '@/components/Web/Business/ElectiveCard';
import { errorMessage } from '@/helper/utils';
import webApi from '@/service';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useEffect, useState } from 'react';
interface CourseFilterListDefaultProps {}

const CourseFilterListDefault: FC<CourseFilterListDefaultProps> = (props) => {
  const [courseList, setCourseList] = useState<ElectiveCourseType[]>([]);

  const { run: getCourseList, loading } = useRequest(
    async (filterParams: FilterParamsType) => {
      const res = await webApi.electiveApi.getElectives(filterParams);
      return res;
    },

    {
      manual: true,
      onSuccess(res) {
        setCourseList(res.data);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  useEffect(() => {
    getCourseList(mergeFilterParams(filters, sort));
  }, []);

  return (
    <CourseFilterList
      title="Explore Web 3"
      onFilterParamsUpdate={(params) => {
        getCourseList(params);
      }}
      courseList={courseList}
      filters={cloneDeep(filters)}
      sort={sort}
      loading={loading}
      renderItem={(course) => {
        return <ElectiveCard key={course.id} course={course}></ElectiveCard>;
      }}
    ></CourseFilterList>
  );
};

export default CourseFilterListDefault;
