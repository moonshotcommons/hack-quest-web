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

interface CourseFilterListSearchProps {
  keyword: string;
}

const CourseFilterListSearch: FC<CourseFilterListSearchProps> = ({
  keyword
}) => {
  const [searchList, setSearchList] = useState<ElectiveCourseType[]>([]);

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
        setSearchList(res.data);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  useEffect(() => {
    getCourseList({
      ...mergeFilterParams(filters, sort, keyword),
      type: CourseType.MINI
    });
  }, []);

  return (
    <CourseFilterList
      sort={sort}
      onFilterParamsUpdate={(params) => {
        getCourseList({
          ...params,
          keyword,
          type: CourseType.MINI
        });
      }}
      filters={cloneDeep(filters)}
      title={`Search result for “${keyword}”`}
      courseList={searchList}
      loading={loading}
      renderItem={(course) => {
        return <ElectiveCard course={course}></ElectiveCard>;
      }}
    ></CourseFilterList>
  );
};

export default CourseFilterListSearch;
