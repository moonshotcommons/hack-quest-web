import MobCourseFilterList from '@/components/Mobile/MobCourseFilterList';
import MobElectiveCard from '@/components/Mobile/MobElectiveCard';
import {
  courseDefaultFilters as filters,
  mergeFilterParams,
  courseDefaultSort as sort
} from '@/components/Web/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/Web/Business/CourseFilterList/type';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useEffect, useState } from 'react';

interface MobCourseFilterListSearchProps {
  keyword: string;
}

const MobCourseFilterListSearch: FC<MobCourseFilterListSearchProps> = ({
  keyword
}) => {
  const [searchList, setSearchList] = useState<ElectiveCourseType[]>([]);

  const { run: getCourseList, loading } = useRequest(
    async (filterParams: FilterParamsType) => {
      const res = await webApi.electiveApi.getElectives(filterParams);
      return res;
    },

    {
      manual: true,
      onSuccess(res) {
        setSearchList(res.data);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  useEffect(() => {
    getCourseList(mergeFilterParams(filters, sort, keyword));
  }, []);

  return (
    <MobCourseFilterList
      sort={sort}
      onFilterParamsUpdate={(params) => {
        getCourseList({
          ...params,
          keyword
        });
      }}
      filters={cloneDeep(filters)}
      title={`Search result for “${keyword}”`}
      courseList={searchList}
      loading={loading}
      renderItem={(course) => {
        return (
          <MobElectiveCard key={course.id} course={course}></MobElectiveCard>
        );
      }}
    />
  );
};

export default MobCourseFilterListSearch;
