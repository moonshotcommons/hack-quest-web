import Button from '@/components/Common/Button';
import CopyIcon from '@/components/Common/Icon/Copy';
import Modal from '@/components/Common/Modal';
import { separationNumber } from '@/helper/utils';
import message from 'antd/es/message';
import React from 'react';
import { FiMinus, FiX } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';

interface StakeModalProp {
  open: boolean;
  hanleStake: VoidFunction;
  loading: boolean;
  onClose: VoidFunction;
}

const StakeModal: React.FC<StakeModalProp> = ({
  open,
  hanleStake,
  loading,
  onClose
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={true}
      icon={<FiX size={26} />}
    >
      <div className=" scroll-wrap-y max-h-[95vh] w-[808px] rounded-[10px] bg-neutral-white px-[137px]  pb-[40px] pt-[60px]  text-neutral-black">
        <div className="">
          <div className="text-h3 text-center">Staking $Manta</div>
          <div className="mt-[24px]">
            <div className="body-l flex flex-col gap-[16px] text-neutral-medium-gray">
              <div
                className="flex justify-between"
                onClick={async (e) => {
                  try {
                    await navigator.clipboard.writeText('1111');
                    message.success('Copy success!');
                  } catch (e) {
                    message.warning(
                      'The browser version is too low or incompatible！'
                    );
                  }
                }}
              >
                <span>Your Wallet</span>
                <div className="flex cursor-pointer items-center gap-[12px] text-neutral-off-black">
                  <span>0x6a5c...c103</span>
                  <CopyIcon
                    width={17}
                    height={21}
                    color={'var(--neutral-off-black)'}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <span>Token</span>
                <span className="text-neutral-off-black">Manta</span>
              </div>
              <div className="flex justify-between">
                <span>Blockchain</span>
                <span className="text-neutral-off-black">Lorem ipsum</span>
              </div>
              <div className="flex justify-between">
                <span>Stake Amount</span>
              </div>
            </div>

            <div className="mt-[10px] flex items-center justify-between rounded-[24px] border border-neutral-medium-gray px-[24px] py-[11px] text-neutral-off-black">
              <input
                type="text"
                className="body-l flex-1 border-none text-neutral-off-black outline-none"
              />
              <span className="underline-l cursor-pointer">MAX</span>
            </div>
            <div className="body-s text-neutral-medium-gray">
              <p className="mt-[10px]">{`Balance: ${separationNumber(59488)} $Manta`}</p>
              <p className="mt-[10px]">Current Price: 1 $Manta = 0.01 USD</p>
            </div>
          </div>
          <div className="text-neutral-medium-gray">
            <p className="body-l">Stake Duration</p>
            <div className="body-m my-[10px] flex items-center gap-[8px] text-neutral-off-black">
              <span className="cursor-pointer">
                <FiMinus size={24} />
              </span>
              <input
                type="text"
                className="h-[48px] w-[68px] rounded-[24px] border border-neutral-medium-gray text-center  outline-none"
              />
              <span className="cursor-pointer">
                <IoAddOutline size={24} />
              </span>
              <span className="ml-[8px]">Days</span>
            </div>
            <p className="body-s">{`*The Fuel you receive will be proportional to the size and length (in time) of your stake. To learn more about the calculation rule, click here.`}</p>
          </div>

          <div className="my-[16px] h-[1px] bg-neutral-light-gray"> </div>
          <div className="flex justify-between">
            <span className="body-l text-neutral-medium-gray">
              Estimated Fuel
            </span>
            <span className="body-l-bold text-ellipsis">
              {' '}
              {separationNumber(23799)} 🚀
            </span>
          </div>
          <div className="body-m mt-[16px] flex items-center justify-center gap-[8px] text-neutral-off-black">
            <div className="relative  cursor-pointer">
              How To Get $Manta
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-yellow-primary"></div>
            </div>
            <IoIosArrowForward size={20} />
          </div>
          <p className="body-m mt-[16px] text-center text-neutral-off-black">
            {' '}
            DO NOT refresh or leave before the transaction is completed.
          </p>

          <div className="flex justify-center gap-[10px]">
            <Button
              loading={loading}
              type="primary"
              className="button-text-m mt-[24px] h-[48px]  w-[165px] uppercase"
              onClick={hanleStake}
            >
              stake now
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StakeModal;
