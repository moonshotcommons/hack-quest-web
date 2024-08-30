import { CardTabs } from '@/components/ecosystem/card-tabs';
import React, { useState } from 'react';
import { mintTab, mockMintData } from '../../constant/data';
import { MintType } from '../../constant/type';
import MintTable from './MintTable';
import Pagination from '@/components/Common/Pagination';

interface MintDataProp {}

const MintData: React.FC<MintDataProp> = () => {
  const [value, setValue] = useState<MintType>(mintTab[0].value);
  const [page, setPage] = useState(1);

  return (
    <div className="flex flex-1 flex-col">
      <CardTabs tabs={mintTab} value={value} onValueChange={(val) => setValue(val as MintType)} />
      <div className="flex-1 rounded-b-[8px] bg-neutral-white p-[10px]">
        <MintTable tableList={mockMintData} />
      </div>
      <div className="flex justify-center pt-[20px]">
        <Pagination page={page} total={mockMintData.length} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default MintData;
