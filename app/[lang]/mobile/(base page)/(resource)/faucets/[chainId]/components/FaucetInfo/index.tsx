'use client';
import { FaucetType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import Header from './Header';
import RequestInput from './RequestInput';
import List from './List';

interface FaucetInfoProp {
  faucet: FaucetType;
}

const FaucetInfo: React.FC<FaucetInfoProp> = ({ faucet }) => {
  return (
    <div className="mb-[2rem] mt-[1.25rem] flex flex-col gap-[2rem] text-neutral-off-black">
      <Header faucet={faucet} />
      <RequestInput faucet={faucet} />
      <List faucet={faucet} />
    </div>
  );
};

export default FaucetInfo;
