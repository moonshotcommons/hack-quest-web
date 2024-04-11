import MobCourseFilterList from '@/components/Mobile/MobCourseFilterList';
import MobPracticeCard from '@/components/Mobile/MobPracticeCard';
import { LangContext } from '@/components/Provider/Lang';
import {
  courseDefaultFilters as filters,
  mergeFilterParams,
  courseDefaultSort as sort
} from '@/components/Web/Business/CourseFilterList/constant';
import { FilterParamsType } from '@/components/Web/Business/CourseFilterList/type';
import { errorMessage } from '@/helper/ui';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import webApi from '@/service';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { PageResult } from '@/service/webApi/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useContext, useEffect, useState } from 'react';

interface MobCourseFilterListSearchProps {
  keyword: string;
}

const MobCourseFilterListSearch: FC<MobCourseFilterListSearchProps> = ({ keyword }) => {
  const [searchList, setSearchList] = useState<ProjectCourseType[]>([]);

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);

  const { run: getCourseList, loading } = useRequest(
    async (filterParams: FilterParamsType) => {
      const res = await webApi.courseApi.getCourseListBySearch<PageResult<ProjectCourseType>>(filterParams);
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
      title={t('courses.searchResultFor', { keyword })}
      courseList={searchList}
      loading={loading}
      renderItem={(course) => {
        return <MobPracticeCard key={course.id} course={course} />;
      }}
    />
  );
};

export default MobCourseFilterListSearch;
