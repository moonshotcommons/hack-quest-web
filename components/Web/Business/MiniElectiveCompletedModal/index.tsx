import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
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
      <div className="relative flex w-[840px] flex-col items-center justify-end rounded-[16px] bg-neutral-white">
        <div className="mb-[112px] mt-[125px] flex w-[260px] flex-col items-center gap-10">
          <div className="flex items-center gap-4">
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
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text=[#131313] text-h3">Nice Job!</span>
          </div>
          <p className="body-m text-center text-neutral-rich-gray">
            You have completed this mini. Continue to claim your Badge.
          </p>
          <div className="body-m flex w-full flex-col gap-y-[15px]">
            <Button block type="primary" className="py-[11px]">
              Claim Badge
            </Button>
            <Button
              block
              ghost
              type="primary"
              className="border-neutral-black py-[11px]"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
        <div className="relative h-[186px] w-[629px]">
          <Image src={BottomImage} fill alt=""></Image>
        </div>
      </div>
    </Modal>
  );
});

export default MiniElectiveCompletedModal;

MiniElectiveCompletedModal.displayName = 'MiniElectiveCompletedModal';
