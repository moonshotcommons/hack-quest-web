import CourseFilterList from '@/components/Web/Business/CourseFilterList';
import {
  courseDefaultFilters as filters,
  mergeFilterParams,
  courseDefaultSort as sort
} from '@/components/Web/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/Web/Business/CourseFilterList/type';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import { errorMessage } from '@/helper/utils';
import webApi from '@/service';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useEffect, useState } from 'react';

interface CourseFilterListSearchProps {
  keyword: string;
}

const CourseFilterListSearch: FC<CourseFilterListSearchProps> = ({
  keyword
}) => {
  const [searchList, setSearchList] = useState<ProjectCourseType[]>([]);

  const { run: getCourseList, loading } = useRequest(
    async (filterParams: FilterParamsType) => {
      const res = await webApi.courseApi.getCourseListBySearch(filterParams);
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
    <CourseFilterList
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
        return <PracticeCard key={course.id} course={course}></PracticeCard>;
      }}
    ></CourseFilterList>
  );
};

export default CourseFilterListSearch;
