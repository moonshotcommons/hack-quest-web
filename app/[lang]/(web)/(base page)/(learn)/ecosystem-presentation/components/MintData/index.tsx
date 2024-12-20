import React, { useEffect, useState } from 'react';
import { mintTab } from '../../constant/data';
import { MintType } from '../../constant/type';
import MintTable from './MintTable';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import { ecosystemUserData } from '@/service/webApi/ecosystem/type';
import { CardTabs, Tab } from '../CardTabs';

interface MintDataProp {
  ecosystemId: string;
}

const MintData: React.FC<MintDataProp> = ({ ecosystemId }) => {
  const [status, setStatus] = useState<MintType>(mintTab[0].value);
  const [tabs, setTabs] = useState<Tab[]>(mintTab);
  // const [page, setPage] = useState(1);
  const { data: userData, isLoading: loading } = useQuery({
    queryKey: ['ecosystem-userData', status, ecosystemId],
    queryFn: () => webApi.ecosystemApi.getEcosystemUserData(ecosystemId, status),
    staleTime: Infinity
  });

  useEffect(() => {
    const newTabs = structuredClone(tabs);
    const index = newTabs.findIndex((t) => t.value === status);
    newTabs[index] = {
      ...newTabs[index],
      count: userData?.length
    };
    setTabs(newTabs);
  }, [userData, status]);
  return (
    <div className="flex flex-1 flex-col">
      <CardTabs tabs={tabs} value={status} onValueChange={(val) => setStatus(val as MintType)} />
      <div className="flex-1 rounded-b-[8px] bg-neutral-white p-[10px]">
        <MintTable tableList={userData as ecosystemUserData[]} loading={loading} />
      </div>
      {/* <div className="flex justify-center pt-[20px]">
        <Pagination page={page} total={mockMintData.length} onPageChange={setPage} />
      </div> */}
    </div>
  );
};

export default MintData;
