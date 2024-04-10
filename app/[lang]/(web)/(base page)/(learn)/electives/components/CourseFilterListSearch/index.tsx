import { LangContext } from '@/components/Provider/Lang';
import CourseFilterList from '@/components/Web/Business/CourseFilterList';
import {
  courseDefaultFilters as filters,
  mergeFilterParams,
  courseDefaultSort as sort
} from '@/components/Web/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/Web/Business/CourseFilterList/type';
import ElectiveCard from '@/components/Web/Business/ElectiveCard';
import { errorMessage } from '@/helper/ui';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import webApi from '@/service';
import { CourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType, ElectiveListDataType } from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useContext, useEffect, useState } from 'react';

interface CourseFilterListSearchProps {
  keyword: string;
}

const CourseFilterListSearch: FC<CourseFilterListSearchProps> = ({ keyword }) => {
  const [searchList, setSearchList] = useState<ElectiveCourseType[]>([]);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  const { run: getCourseList, loading } = useRequest(
    async (filterParams: FilterParamsType) => {
      const res = await webApi.courseApi.getCourseListBySearch<ElectiveListDataType>(filterParams);
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
      type: `${CourseType.MINI},${CourseType.UGC}`
    });
  }, []);

  return (
    <CourseFilterList
      sort={sort}
      onFilterParamsUpdate={(params) => {
        getCourseList({
          ...params,
          keyword,
          type: `${CourseType.MINI},${CourseType.UGC}`
        });
      }}
      filters={cloneDeep(filters)}
      title={t('courses.searchResultFor', { keyword })}
      courseList={searchList}
      loading={loading}
      renderItem={(course) => {
        return <ElectiveCard course={course}></ElectiveCard>;
      }}
    ></CourseFilterList>
  );
};

export default CourseFilterListSearch;
