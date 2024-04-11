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
import { CourseType } from '@/service/webApi/course/type';
import { ElectiveCourseType, ElectiveListDataType } from '@/service/webApi/elective/type';
import { useRequest } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { FC, useContext, useEffect, useState } from 'react';

import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface MobCourseFilterListDefaultProps {}

const MobCourseFilterListDefault: FC<MobCourseFilterListDefaultProps> = (props) => {
  const [courseList, setCourseList] = useState<ElectiveCourseType[]>([]);

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
    <MobCourseFilterList
      title={t('electives.exploreWeb3')}
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
        return <MobElectiveCard key={course.id} course={course} />;
      }}
    />
  );
};

export default MobCourseFilterListDefault;
