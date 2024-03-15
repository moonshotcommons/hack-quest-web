import React from 'react';
import { titleTxtData } from '../../constants/data';
import { separationNumber } from '@/helper/utils';

interface KeyMetricsProp {}

const KeyMetrics: React.FC<KeyMetricsProp> = () => {
  return (
    <div className="mt-[120px]">
      <p className="text-h3 text-neutral-off-black">{titleTxtData[5]}</p>
      <div className="body-xl text-neutral-medium-gray [&>div]:flex [&>div]:justify-between [&>div]:border-b [&>div]:border-neutral-light-gray [&>div]:py-[24px]">
        <div>
          <div>Blockchain Network</div>
          <div className="text-body-xl-bold text-neutral-off-black">
            Ethereum
          </div>
        </div>
        <div>
          <div>Initial Market Cap</div>
          <div className="text-body-xl-bold text-neutral-off-black">
            {`$${separationNumber(850000)}`}
          </div>
        </div>
        <div>
          <div>Total Token Supply</div>
          <div className="text-body-xl-bold text-neutral-off-black">
            {`${separationNumber(999999999999)}`}
          </div>
        </div>
        <div>
          <div>Project Valuation</div>
          <div className="text-body-xl-bold text-neutral-off-black">
            {`$${separationNumber(10000000)}`}
          </div>
        </div>
        <div>
          <div>Airdrop Share</div>
          <div className="text-body-xl-bold text-neutral-off-black">
            {`${1}% / ${separationNumber(100000)}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
