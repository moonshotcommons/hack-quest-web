import React from 'react';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import {
  EcosystemElectiveType,
  ElectiveCourseType
} from '@/service/webApi/elective/type';
import { useParams } from 'next/navigation';
import Loading from '@/components/Common/Loading';
import MiniElectiveCard from '../MiniElectiveCard';

interface MiniElectivesProp {}

const MiniElectives: React.FC<MiniElectivesProp> = () => {
  const { profileId } = useParams();
  const { data: elctiveList = [] as EcosystemElectiveType[], loading } =
    useRequest(async () => {
      const res = webApi.courseApi.getProfileElective(profileId as string);
      return res;
    });
  return (
    <div>
      <p className="text-[28px] text-[#000] font-next-poster-Bold mb-[30px] tracking-[1.68px]">
        Minis
      </p>
      <div className="flex flex-col gap-[30px]">
        <Loading loading={loading}>
          {elctiveList.map((elective) => (
            <MiniElectiveCard
              elective={elective as EcosystemElectiveType & ElectiveCourseType}
              key={elective.id}
            />
          ))}
        </Loading>
      </div>
    </div>
  );
};

export default MiniElectives;
