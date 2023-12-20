import React from 'react';
import MiniElectiveCard from '../components/MiniElectiveCard';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { EcosystemElectiveType } from '@/service/webApi/elective/type';
import Loading from '../../Common/Loading';

interface MiniElectivesProp {}

const MiniElectives: React.FC<MiniElectivesProp> = () => {
  const id = 'caddaf21-cf2c-45dd-9476-f4de119dd1c0';
  const { data: elctiveList = [] as EcosystemElectiveType[], loading } =
    useRequest(async () => {
      const res = webApi.electiveApi.getProfileElective(id);
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
            <MiniElectiveCard elective={elective} key={elective.id} />
          ))}
        </Loading>
      </div>
    </div>
  );
};

export default MiniElectives;
