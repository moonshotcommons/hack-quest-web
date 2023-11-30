import Button from '@/components/v2/Common/Button';
import Modal from '@/components/v2/Common/Modal';
import Image from 'next/image';
import { forwardRef, useImperativeHandle, useState } from 'react';
import BottomImage from './bottom.png';
interface MiniElectiveCompletedModalProps {}

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

export interface MiniElectiveCompletedModalRef {
  open: (params: Record<string, any>) => void;
}

const MiniElectiveCompletedModal = forwardRef<
  MiniElectiveCompletedModalRef,
  MiniElectiveCompletedModalProps
>((props, ref) => {
  const [open, setOpen] = useState(true);

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
      <div className="w-[840px] bg-white rounded-[16px] relative flex flex-col items-center justify-end">
        <div className="w-[260px] items-center mb-[112px] mt-[125px] flex flex-col gap-10">
          <div className="flex gap-4 items-center">
            <svg
              width="33"
              height="24"
              viewBox="0 0 33 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.7373 11.5657L13.1634 22L30.1057 2"
                stroke="#00C365"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="text-[28px] font-next-poster-Bold text=[#131313] tracking-[1.68px]">
              Nice Job!
            </span>
          </div>
          <p className="text-center font-next-book leading-[125%] tracking-[0.32px] text-[#3E3E3E]">
            You have completed this mini. Continue to claim your Badge.
          </p>
          <div className="flex w-full flex-col gap-y-[15px]">
            <Button block type="primary" className="py-[11px]">
              Claim Badge
            </Button>
            <Button block ghost type="primary" className="py-[11px]">
              Claim Badge
            </Button>
          </div>
        </div>
        <div className="w-[629px] h-[186px] relative">
          <Image src={BottomImage} fill alt=""></Image>
        </div>
      </div>
    </Modal>
  );
});

export default MiniElectiveCompletedModal;

MiniElectiveCompletedModal.displayName = 'MiniElectiveCompletedModal';
