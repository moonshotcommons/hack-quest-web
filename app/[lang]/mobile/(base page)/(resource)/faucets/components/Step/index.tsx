import React from 'react';
import Image from 'next/image';
import StepIcon1 from '@/public/images/resource/step_icon1.png';
import StepIcon2 from '@/public/images/resource/step_icon2.png';
import StepIcon3 from '@/public/images/resource/step_icon3.png';

interface StepProp {}

const Step: React.FC<StepProp> = () => {
  return (
    <div className="text-neutral-off-black">
      <p className="text-h4-mob">How to get involved?</p>
      <div className="mt-[1rem]">
        <div className="flex gap-[.5rem]">
          <div className="flex-shrink-0">
            <Image src={StepIcon1} alt="step-icon" width={28} />
          </div>
          <div>
            <p className="body-s">Step 1 - Select a Faucet</p>
            <p className="caption-12pt mt-[.25rem] text-neutral-medium-gray">
              Choose a testnet you want test token for.
            </p>
          </div>
        </div>
        <div className="mt-[.75rem] flex gap-[.5rem]">
          <div className="flex-shrink-0">
            <Image src={StepIcon2} alt="step-icon" width={28} />
          </div>
          <div>
            <p className="body-s">Step 2 - Complete your Profile</p>
            <p className="caption-12pt mt-[.25rem] text-neutral-medium-gray">
              We require you to have a HackQuest Profile in order to prevent misuse of test token.
            </p>
          </div>
        </div>
        <div className="mt-[.75rem] flex gap-[.5rem]">
          <div className="flex-shrink-0">
            <Image src={StepIcon3} alt="step-icon" width={28} />
          </div>
          <div>
            <p className="body-s">Step 3 - Receive Tokens</p>
            <p className="caption-12pt mt-[.25rem] text-neutral-medium-gray">
              Put in the address for corresponding testnet, and you will receive test token in seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step;
