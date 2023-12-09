import Button from '@/components/v2/Common/Button';
import Modal from '@/components/v2/Common/Modal';
import { cn } from '@/helper/utils';
import Image from 'next/image';
import { forwardRef, useImperativeHandle, useState } from 'react';
import Cover from './cover.png';
interface MiniElectiveDetailModalProps {}

const mockData = [
  {
    name: 'Web 3’s onboarding problem',
    state: 'ok'
  },
  {
    name: 'Creating a Seamless Wallet Onboarding Experience',
    state: 'learning'
  },
  {
    name: 'Quiz',
    state: 'lock'
  }
];

export interface MiniElectiveDetailModalRef {
  open: (params: Record<string, any>) => void;
}

const MiniElectiveDetailModal = forwardRef<
  MiniElectiveDetailModalRef,
  MiniElectiveDetailModalProps
>((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open(params) {
        setOpen(true);
      }
    };
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      showCloseIcon
      icon={
        <div className="absolute -right-[8px] -top-[8px] cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289Z"
              fill="#0B0B0B"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              fill="#0B0B0B"
            />
          </svg>
        </div>
      }
      markBg="black"
    >
      <div className="w-[1000px] bg-white rounded-[16px] p-[32px]">
        <div className="flex justify-between p-[24px] mt-[24px] gap-x-[96px]">
          <div className="w-[400px] flex flex-col gap-[32px]">
            <div className="w-full h-[225px] relative">
              <Image src={Cover} fill alt="cover"></Image>
            </div>
            <div>
              <h2 className="font-next-poster-Bold text-[#0B0B0B] text-[40px] tracking-[2.4px] leading-[125%]">
                Sui’s zkLogin: An Easier Way On-Chain
              </h2>
              <p className="mt-[16px] font-next-book text-[#3E3E3E] leading-[125%] tracking-[0.32px]">
                zkLogin reduces onboarding friction by allowing users to log
                into apps with existing web credentials.
              </p>
            </div>
            <div className="flex gap-[32px] items-center font-next-book text-[14px] leading-[125%] tracking-[0.28px] text-[#0B0B0B]">
              <div className="flex gap-x-[12px] items-center">
                <span>Created by</span>
                <div className="px-[8px] py-[4px] flex gap-[10px] items-center border border-[#8C8C8C] rounded-[17px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-[#D9D9D9]"></div>
                  <span>Peter Parker</span>
                </div>
              </div>
              <div className="flex gap-[12px] items-center">
                <svg
                  width="25"
                  height="26"
                  viewBox="0 0 25 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 25.5C9.18476 25.5 6.0054 24.183 3.66122 21.8388C1.31695 19.4947 0 16.3152 0 13C0 9.68484 1.31695 6.5054 3.66122 4.16122C6.00531 1.81695 9.18485 0.5 12.5 0.5C15.8152 0.5 18.9946 1.81695 21.3388 4.16122C23.683 6.50531 25 9.68484 25 13C25 16.3152 23.683 19.4946 21.3388 21.8388C18.9947 24.183 15.8152 25.5 12.5 25.5ZM12.5 1.54169C9.46118 1.54169 6.54647 2.74896 4.39783 4.89774C2.24905 7.04669 1.04178 9.96109 1.04178 12.9999C1.04178 16.0387 2.24905 18.9534 4.39783 21.1021C6.54678 23.2509 9.46118 24.4581 12.5 24.4581C15.5388 24.4581 18.4535 23.2509 20.6022 21.1021C22.751 18.9531 23.9582 16.0387 23.9582 12.9999C23.9582 9.96109 22.751 7.04638 20.6022 4.89774C18.4532 2.74896 15.5388 1.54169 12.5 1.54169Z"
                    fill="#3E3E3E"
                  />
                  <path
                    d="M20.4445 14.5H11.5554C11.2487 14.5 11 14.2513 11 13.9446V5.05561C11 4.74888 11.2487 4.5 11.5554 4.5C11.8623 4.5 12.111 4.74888 12.111 5.05561V13.3889H20.4444C20.7511 13.3889 21 13.6376 21 13.9445C21 14.2512 20.7512 14.5 20.4445 14.5Z"
                    fill="#3E3E3E"
                  />
                </svg>
                <span>36 Hour</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex  flex-col justify-between">
            <div>
              <p className="text-[21px] font-next-poster-Bold text-[#0B0B0B] tracking-[1.26px]">
                Overview
              </p>
              <ul className="mt-[32px]">
                {mockData.map((item, index) => {
                  return (
                    <li key={index}>
                      {index !== 0 && (
                        <div className="h-[1px] w-full bg-[#8C8C8C] my-[24px]"></div>
                      )}
                      <div className="flex justify-between">
                        <span
                          className={cn(
                            'text-[#3E3E3E] text-[18px] font-next-book leading-[125%] tracking-[0.36px]',
                            item.state === 'learning'
                              ? 'font-next-book-bold text-[#131313]'
                              : '',
                            item.state === 'lock' ? 'text-[#8C8C8C]' : ''
                          )}
                        >{`${index + 1 < 10 ? '0' + (index + 1) : index + 1} ${
                          item.name
                        }`}</span>
                        {item.state === 'ok' && (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 9.59223L8.09524 15.6923L18 4"
                              stroke="#00C365"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        {item.state === 'lock' && (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.16675 10C3.70651 10 3.33341 10.3731 3.33341 10.8333V16.6667C3.33341 17.1269 3.70651 17.5 4.16675 17.5H15.8334C16.2937 17.5 16.6667 17.1269 16.6667 16.6667V10.8333C16.6667 10.3731 16.2937 10 15.8334 10H4.16675ZM1.66675 10.8333C1.66675 9.45263 2.78604 8.33334 4.16675 8.33334H15.8334C17.2141 8.33334 18.3334 9.45263 18.3334 10.8333V16.6667C18.3334 18.0474 17.2141 19.1667 15.8334 19.1667H4.16675C2.78604 19.1667 1.66675 18.0474 1.66675 16.6667V10.8333Z"
                              fill="#8C8C8C"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10 2.50001C9.11594 2.50001 8.2681 2.8512 7.64298 3.47632C7.01786 4.10144 6.66667 4.94929 6.66667 5.83334V9.16668C6.66667 9.62691 6.29357 10 5.83333 10C5.3731 10 5 9.62691 5 9.16668V5.83334C5 4.50726 5.52678 3.23549 6.46447 2.29781C7.40215 1.36013 8.67392 0.833344 10 0.833344C11.3261 0.833344 12.5979 1.36013 13.5355 2.29781C14.4732 3.23549 15 4.50726 15 5.83334V9.16668C15 9.62691 14.6269 10 14.1667 10C13.7064 10 13.3333 9.62691 13.3333 9.16668V5.83334C13.3333 4.94929 12.9821 4.10144 12.357 3.47632C11.7319 2.8512 10.8841 2.50001 10 2.50001Z"
                              fill="#8C8C8C"
                            />
                          </svg>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <Button type="primary" block className="py-[16px] font-next-book">
              Resume Learning
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
});

export default MiniElectiveDetailModal;

MiniElectiveDetailModal.displayName = 'MiniElectiveDetailModal';
