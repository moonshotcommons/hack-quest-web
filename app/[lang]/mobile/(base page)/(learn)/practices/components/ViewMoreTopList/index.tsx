'use client';
import MobPracticeCard from '@/components/Mobile/MobPracticeCard';
import MobViewMoreList from '@/components/Mobile/MobViewMoreList';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { FC } from 'react';

interface ViewMoreTopListProps {
  topCourses: ProjectCourseType[];
}

const ViewMoreTopList: FC<ViewMoreTopListProps> = ({ topCourses }) => {
  return (
    <MobViewMoreList
      list={topCourses}
      limit={2}
      renderItem={(item) => {
        return <MobPracticeCard course={item}></MobPracticeCard>;
      }}
    />
  );
};

export default ViewMoreTopList;
