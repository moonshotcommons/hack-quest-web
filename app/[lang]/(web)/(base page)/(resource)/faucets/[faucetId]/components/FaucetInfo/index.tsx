'use client';
import { FaucetType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import Header from './Header';
import RequestInput from './RequestInput';
import List from './List';
import Pagination from '@/components/Common/Pagination';

interface FaucetInfoProp {
  faucet?: FaucetType;
}

const FaucetInfo: React.FC<FaucetInfoProp> = ({ faucet }) => {
  return (
    <div className="mx-auto flex w-[808px] flex-col  gap-[40px] py-[40px] text-neutral-off-black">
      <Header faucet={faucet} />
      <RequestInput faucet={faucet} />
      <List />
      <div className="flex justify-center">
        <Pagination page={1} total={2} onPageChange={() => {}} />
      </div>
    </div>
  );
};

export default FaucetInfo;
