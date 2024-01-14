import CourseFilterList from '@/components/Web/Business/CourseFilterList';
import {
  courseDefaultFilters as filters,
  mergeFilterParams,
  courseDefaultSort as sort
} from '@/components/Web/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/Web/Business/CourseFilterList/type';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useEffect, useState } from 'react';
interface CourseFilterListDefaultProps {}

const CourseFilterListDefault: FC<CourseFilterListDefaultProps> = (props) => {
  const [courseList, setCourseList] = useState<ProjectCourseType[]>([]);

  const { run: getCourseList, loading } = useRequest(
    async (filterParams: FilterParamsType) => {
      const res = await webApi.courseApi.getCourseListBySearch(filterParams);
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
        return <PracticeCard key={course.id} course={course}></PracticeCard>;
      }}
    ></CourseFilterList>
  );
};

export default CourseFilterListDefault;
