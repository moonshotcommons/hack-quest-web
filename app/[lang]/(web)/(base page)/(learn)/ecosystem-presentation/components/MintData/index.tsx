import { CardTabs } from '@/components/ecosystem/card-tabs';
import React, { useState } from 'react';
import { mintTab } from '../../constant/data';
import { MintType } from '../../constant/type';
import MintTable from './MintTable';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import { ecosystemUserData } from '@/service/webApi/ecosystem/type';

interface MintDataProp {
  ecosystemId: string;
}

const MintData: React.FC<MintDataProp> = ({ ecosystemId }) => {
  const [status, setStatus] = useState<MintType>(mintTab[0].value);
  // const [page, setPage] = useState(1);
  const { data: userData, isLoading: loading } = useQuery({
    queryKey: ['ecosystem-userData', status],
    queryFn: () => webApi.ecosystemApi.getEcosystemUserData(ecosystemId, status)
  });
  return (
    <div className="flex flex-1 flex-col">
      <CardTabs tabs={mintTab} value={status} onValueChange={(val) => setStatus(val as MintType)} />
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
