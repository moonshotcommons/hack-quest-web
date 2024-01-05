import MobCourseFilterList from '@/components/Mobile/MobCourseFilterList';
import MobPracticeCard from '@/components/Mobile/MobPracticeCard';
import {
  courseDefaultFilters as filters,
  mergeFilterParams,
  courseDefaultSort as sort
} from '@/components/v2/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/v2/Business/CourseFilterList/type';
import { errorMessage } from '@/helper/utils';
import webApi from '@/service';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useEffect, useState } from 'react';
interface MobCourseFilterListDefaultProps {}

const MobCourseFilterListDefault: FC<MobCourseFilterListDefaultProps> = (
  props
) => {
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
    <MobCourseFilterList
      title="Explore Web 3"
      onFilterParamsUpdate={(params) => {
        getCourseList(params);
      }}
      courseList={courseList}
      filters={cloneDeep(filters)}
      sort={sort}
      loading={loading}
      renderItem={(course) => {
        return <MobPracticeCard key={course.id} course={course} />;
      }}
    />
  );
};

export default MobCourseFilterListDefault;
