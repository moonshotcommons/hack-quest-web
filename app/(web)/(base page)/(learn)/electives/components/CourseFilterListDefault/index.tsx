import CourseFilterList from '@/components/Web/Business/CourseFilterList';
import {
  courseDefaultFilters as filters,
  mergeFilterParams,
  courseDefaultSort as sort
} from '@/components/Web/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/Web/Business/CourseFilterList/type';
import ElectiveCard from '@/components/Web/Business/ElectiveCard';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { CourseType } from '@/service/webApi/course/type';
import {
  ElectiveCourseType,
  ElectiveListDataType
} from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useEffect, useState } from 'react';
interface CourseFilterListDefaultProps {}

const CourseFilterListDefault: FC<CourseFilterListDefaultProps> = (props) => {
  const [courseList, setCourseList] = useState<ElectiveCourseType[]>([]);

  const { run: getCourseList, loading } = useRequest(
    async (filterParams: FilterParamsType) => {
      const res =
        await webApi.courseApi.getCourseListBySearch<ElectiveListDataType>(
          filterParams
        );
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
    getCourseList({
      ...mergeFilterParams(filters, sort),
      type: `${CourseType.MINI},${CourseType.UGC}`
    });
  }, []);

  return (
    <CourseFilterList
      title="Explore Web 3"
      onFilterParamsUpdate={(params) => {
        getCourseList({
          ...params,
          type: `${CourseType.MINI},${CourseType.UGC}`
        });
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
