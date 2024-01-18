import MobCourseFilterList from '@/components/Mobile/MobCourseFilterList';
import MobPracticeCard from '@/components/Mobile/MobPracticeCard';
import {
  courseDefaultFilters as filters,
  mergeFilterParams,
  courseDefaultSort as sort
} from '@/components/Web/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/Web/Business/CourseFilterList/type';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import {
  CourseDataType,
  ProjectCourseType
} from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useEffect, useState } from 'react';

interface MobCourseFilterListSearchProps {
  keyword: string;
}

const MobCourseFilterListSearch: FC<MobCourseFilterListSearchProps> = ({
  keyword
}) => {
  const [searchList, setSearchList] = useState<ProjectCourseType[]>([]);

  const { run: getCourseList, loading } = useRequest(
    async (filterParams: FilterParamsType) => {
      const res = await webApi.courseApi.getCourseListBySearch<CourseDataType>(
        filterParams
      );
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
        return <MobPracticeCard key={course.id} course={course} />;
      }}
    />
  );
};

export default MobCourseFilterListSearch;
