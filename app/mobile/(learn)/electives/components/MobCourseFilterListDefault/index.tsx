import MobCourseFilterList from '@/components/Mobile/MobCourseFilterList';
import MobElectiveCard from '@/components/Mobile/MobElectiveCard';
import {
  courseDefaultFilters as filters,
  mergeFilterParams,
  courseDefaultSort as sort
} from '@/components/v2/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/v2/Business/CourseFilterList/type';
import { errorMessage } from '@/helper/utils';
import webApi from '@/service';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useEffect, useState } from 'react';
interface MobCourseFilterListDefaultProps {}

const MobCourseFilterListDefault: FC<MobCourseFilterListDefaultProps> = (
  props
) => {
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
        return <MobElectiveCard key={course.id} course={course} />;
      }}
    />
  );
};

export default MobCourseFilterListDefault;
