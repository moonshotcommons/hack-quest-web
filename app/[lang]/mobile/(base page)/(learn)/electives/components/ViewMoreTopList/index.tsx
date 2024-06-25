'use client';
import MobElectiveCard from '@/components/Mobile/MobElectiveCard';
import MobViewMoreList from '@/components/Mobile/MobViewMoreList';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { FC } from 'react';

interface ViewMoreTopListProps {
  topElectives: ElectiveCourseType[];
}

const ViewMoreTopList: FC<ViewMoreTopListProps> = ({ topElectives }) => {
  return (
    <MobViewMoreList
      list={topElectives}
      limit={2}
      renderItem={(item) => {
        return <MobElectiveCard course={item}></MobElectiveCard>;
      }}
    />
  );
};

export default ViewMoreTopList;
