import { Lang } from '@/i18n/config';
import React from 'react';
import DeveloperTitle from '../DeveloperTitle';
import Web3Cover from '@/public/images/learn/web3_cover.png';
import DeveloperCard from '../DeveloperCard';

interface Web3Prop {
  lang: Lang;
}

const Web3: React.FC<Web3Prop> = async ({ lang }) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <DeveloperTitle lang={lang} image={Web3Cover} title={'web3'} />
      <div>
        <DeveloperCard />
      </div>
    </div>
  );
};

export default Web3;
