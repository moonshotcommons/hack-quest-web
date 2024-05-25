'use client';
import CourseFilterList from '@/components/Web/Business/CourseFilterList';

import { FilterItemType, FilterOptionType } from '@/components/Web/Business/CourseFilterList/type';
import ElectiveCard from '@/components/Web/Business/ElectiveCard';
import MenuLink from '@/constants/MenuLink';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
interface CourseFilterListDefaultProps {
  title: string;
  keyword: string;
  courseList: ElectiveCourseType[];
  filters: FilterItemType[];
  sorts: FilterOptionType[];
}

const CourseFilterListDefault: FC<CourseFilterListDefaultProps> = ({ title, keyword, courseList, filters, sorts }) => {
  const router = useRouter();

  // const [courseList, setCourseList] = useState<ElectiveCourseType[]>([]);

  // const { run: getCourseList, loading } = useRequest(
  //   async (filterParams: FilterParamsType) => {
  //     const res = await webApi.courseApi.getCourseListBySearch<ElectiveListDataType>(filterParams);
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
  //   getCourseList({
  //     ...mergeFilterParams(filters, sort),
  //     type: `${CourseType.MINI},${CourseType.UGC}`
  //   });
  // }, []);

  // const [fi, sort] = useMemo(() => {
  //   const defaultFilter = cloneDeep(filters);
  // }, []);

  return (
    <CourseFilterList
      title={title}
      onFilterParamsUpdate={(params) => {
        // getCourseList({
        //   ...params,
        //   type:
        // });
        params.keyword = keyword;
        const searchParams = new URLSearchParams(params);
        router.replace(`${MenuLink.ELECTIVES}?${searchParams.toString()}`);
      }}
      courseList={courseList}
      filters={filters}
      sort={sorts}
      // loading={loading}
      renderItem={(course) => {
        return <ElectiveCard key={course.id} course={course}></ElectiveCard>;
      }}
    ></CourseFilterList>
  );
};

export default CourseFilterListDefault;
