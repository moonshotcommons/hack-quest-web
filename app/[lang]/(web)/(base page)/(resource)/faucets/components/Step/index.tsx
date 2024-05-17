import React from 'react';
import Image from 'next/image';
import StepIcon1 from '@/public/images/resource/step_icon1.png';
import StepIcon2 from '@/public/images/resource/step_icon2.png';
import StepIcon3 from '@/public/images/resource/step_icon3.png';

interface StepProp {}

const Step: React.FC<StepProp> = () => {
  return (
    <div className="pt-[20px] text-neutral-off-black">
      <p className="text-h4 ">How to get involved?</p>
      <div className="mt-[12px] flex justify-between">
        <div className="w-[222px]">
          <div className="flex gap-[8px]">
            <Image src={StepIcon1} alt="step-icon" width={28} />
            <span className="body-m">Step 1 - Select a Faucet</span>
          </div>
          <p className="body-xs mt-[5px] text-neutral-medium-gray">Choose a testnet you want test token for.</p>
        </div>
        <div className="w-[260px]">
          <div className="flex gap-[8px]">
            <Image src={StepIcon2} alt="step-icon" width={24} />
            <span className="body-m">Step 2 - Complete your Profile</span>
          </div>
          <p className="body-xs mt-[5px] text-neutral-medium-gray">
            We require you to have a HackQuest Profile in order to prevent misuse of test token.
          </p>
        </div>
        <div className="w-[240px]">
          <div className="flex gap-[8px]">
            <Image src={StepIcon3} alt="step-icon" width={28} />
            <span className="body-m">Step 3 - Receive Tokens</span>
          </div>
          <p className="body-xs mt-[5px] text-neutral-medium-gray">
            Put in the address for corresponding testnet, and you will receive test token in seconds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step;
