'use client';
import CourseFilterList from '@/components/Web/Business/CourseFilterList';
import { courseDefaultSort as sort } from '@/components/Web/Business/CourseFilterList/constant';
import { FilterItemType, FilterOptionType } from '@/components/Web/Business/CourseFilterList/type';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import MenuLink from '@/constants/MenuLink';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { cloneDeep } from 'lodash-es';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
interface CourseFilterListDefaultProps {
  title: string;
  keyword: string;
  courseList: ProjectCourseType[];
  filters: FilterItemType[];
  sorts: FilterOptionType[];
}

const CourseFilterListDefault: FC<CourseFilterListDefaultProps> = ({ title, keyword, courseList, filters, sorts }) => {
  const router = useRouter();
  // const [courseList, setCourseList] = useState<ProjectCourseType[]>([]);

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
  //   getCourseList({
  //     ...mergeFilterParams(filters, sort),
  //     type: CourseType.GUIDED_PROJECT
  //   });
  // }, []);

  return (
    <CourseFilterList
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
        return <PracticeCard key={course.id} course={course}></PracticeCard>;
      }}
    ></CourseFilterList>
  );
};

export default CourseFilterListDefault;
