'use client';

import MobCourseFilterList from '@/components/Mobile/MobCourseFilterList';
import MobPracticeCard from '@/components/Mobile/MobPracticeCard';
import {
  courseDefaultFilters as filters,
  courseDefaultSort as sort
} from '@/components/Web/Business/CourseFilterList/constant';
import { FilterItemType, FilterOptionType } from '@/components/Web/Business/CourseFilterList/type';
import MenuLink from '@/constants/MenuLink';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { cloneDeep } from 'lodash-es';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
interface MobCourseFilterListDefaultProps {
  title: string;
  keyword: string;
  courseList: ProjectCourseType[];
  filters: FilterItemType[];
  sorts: FilterOptionType[];
}

const MobCourseFilterListDefault: FC<MobCourseFilterListDefaultProps> = (props) => {
  const { courseList, title, sorts, keyword } = props;
  const router = useRouter();

  // const [courseList, setCourseList] = useState<ProjectCourseType[]>([]);

  // const { lang } = useContext(LangContext);
  // const { t } = useTranslation(lang, TransNs.LEARN);

  // const { run: getCourseList, loading } = useRequest(
  //   async (filterParams: FilterParamsType) => {
  //     const res = await webApi.courseApi.getCourseListBySearch<PageResult<ProjectCourseType>>(filterParams);
  //     return res;
  //   },

  //   {
  //     manual: true,
  //     onSuccess(res) {
  //       setCourseList(res.data);
  //     },
  //     onError(err) {
  //       errorMessage(err);
  //     }
  //   }
  // );

  // useEffect(() => {
  //   getCourseList(mergeFilterParams(filters, sort));
  // }, []);

  return (
    <MobCourseFilterList
      title={title}
      onFilterParamsUpdate={(params) => {
        params.keyword = keyword;
        const searchParams = new URLSearchParams(params);
        router.replace(`${MenuLink.PRACTICES}?${searchParams.toString()}`);
      }}
      courseList={courseList}
      filters={cloneDeep(filters)}
      sort={sort}
      renderItem={(course) => {
        return <MobPracticeCard key={course.id} course={course} />;
      }}
    />
  );
};

export default MobCourseFilterListDefault;
