import Button from '@/components/Common/Button';
import { useUserStore } from '@/store/zustand/userStore';
import React from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import { separationNumber } from '@/helper/utils';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';

interface StakeFuelProp {}

const StakeFuel: React.FC<StakeFuelProp> = () => {
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  return (
    <div className="mt-[24px]">
      <div className="flex items-center gap-[24px]">
        <p className="body-l text-neutral-black">Stake Fuel</p>
        <div className="body-m flex cursor-pointer items-center gap-[5px] text-neutral-medium-gray">
          <IoMdAddCircle size={24} />
          <span>Add a new stake</span>
        </div>
      </div>

      {true ? (
        <div className="body-m mt-[16px] flex items-center justify-between rounded-[16px] border border-neutral-light-gray bg-neutral-white px-[30px] py-[22px] text-neutral-black">
          <div className="flex items-center gap-[19px]">
            <div className="relative h-[40px] w-[40px] overflow-hidden rounded-[50%]">
              <Image
                src={userInfo?.avatar as string}
                alt="avatar"
                fill
                className="object-cover"
              ></Image>
            </div>
            <span>Manta Stake on 03/12/2024</span>
          </div>
          <div className="flex items-center gap-[40px]">
            <div className="flex h-[40px] w-[145px] items-center justify-between rounded-r-[20px] border border-neutral-light-gray bg-neutral-off-white pr-[15px]">
              <div className="flex-center relative left-[-20px] h-[40px] w-[40px] rounded-[50%] bg-yellow-primary">
                <div className="flex-center body-l h-[32px] w-[32px] rounded-[50%] bg-yellow-light">
                  🚀
                </div>
              </div>
              <span>{`${separationNumber(23799)}`}</span>
            </div>

            <div className="flex h-[40px] w-[145px] items-center justify-between rounded-r-[20px] border border-neutral-light-gray bg-neutral-off-white pr-[15px]">
              <div className="flex-center relative left-[-20px] h-[40px] w-[40px] rounded-[50%] bg-neutral-light-gray">
                <div className="flex-center body-l h-[32px] w-[32px] rounded-[50%] bg-neutral-off-white text-neutral-medium-gray">
                  <MdOutlineAccessTimeFilled size={24} />
                </div>
              </div>
              <span>{`${28}d.`}</span>
            </div>

            <div className="underline-l ml-[-20px] cursor-pointer text-neutral-rich-gray">
              Unstake
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="body-l w-[507px] text-neutral-medium-gray">
            In order to access all fuel approaches and the eligibility of
            Allocation & Airdrop, you need to stake Manta tokens
          </p>
          <Button
            type="primary"
            className="button-text-m mt-[12px] h-[48px] w-[165px] p-0 uppercase text-neutral-black"
          >
            stake $manta
          </Button>
        </div>
      )}
    </div>
  );
};

export default StakeFuel;
