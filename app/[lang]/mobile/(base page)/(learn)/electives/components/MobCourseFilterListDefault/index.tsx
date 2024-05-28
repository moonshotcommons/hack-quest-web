'use client';
import MobCourseFilterList from '@/components/Mobile/MobCourseFilterList';
import MobElectiveCard from '@/components/Mobile/MobElectiveCard';
import { courseDefaultFilters as filters } from '@/components/Web/Business/CourseFilterList/constant';
import { FilterItemType, FilterOptionType } from '@/components/Web/Business/CourseFilterList/type';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { FC } from 'react';

import { useRouter } from 'next/navigation';
import MenuLink from '@/constants/MenuLink';

interface MobCourseFilterListDefaultProps {
  title: string;
  keyword: string;
  courseList: ElectiveCourseType[];
  filters: FilterItemType[];
  sorts: FilterOptionType[];
}

const MobCourseFilterListDefault: FC<MobCourseFilterListDefaultProps> = (props) => {
  const { courseList, title, sorts, keyword } = props;
  const router = useRouter();
  return (
    <MobCourseFilterList
      title={title}
      onFilterParamsUpdate={(params) => {
        params.keyword = keyword;
        const searchParams = new URLSearchParams(params);
        router.replace(`${MenuLink.ELECTIVES}?${searchParams.toString()}`);
      }}
      courseList={courseList}
      filters={filters}
      sort={sorts}
      renderItem={(course) => {
        return <MobElectiveCard key={course.id} course={course} />;
      }}
    />
  );
};

export default MobCourseFilterListDefault;
