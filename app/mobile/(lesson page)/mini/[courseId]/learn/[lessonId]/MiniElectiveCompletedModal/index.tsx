import Button from '@/components/v2/Common/Button';
import { forwardRef, useImperativeHandle, useState } from 'react';
import BottomImage from './bottom.png';
interface MiniElectiveCompletedModalProps {}

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

  return open ? (
    <div
      className="absolute left-0 top-0 w-full h-full z-[10] flex-center"
      style={{
        backgroundImage: `url(${BottomImage.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
        backgroundPosition: 'left bottom',
        backgroundColor: '#FFF4CE'
      }}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-[16px]">
          <svg
            width="27"
            height="20"
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
          <span className="text-[28px] font-next-poster-Bold text=[#131313] tracking-[1.68px]">
            Nice Job!
          </span>
        </div>
        <p className="my-[40px] text-center font-next-book leading-[125%] tracking-[0.32px] text-[#3E3E3E]">
          You have completed this mini. <br /> Continue to claim your Badge.
        </p>
        <div className="flex w-full flex-col gap-y-[15px] font-next-book leading-[125%] text-base tracking-[0.32px]">
          <Button block type="primary" className="py-[11px]">
            Claim Badge
          </Button>
          <Button
            block
            ghost
            type="primary"
            className="py-[11px] border-black"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  ) : null;
});

export default MiniElectiveCompletedModal;

MiniElectiveCompletedModal.displayName = 'MiniElectiveCompletedModal';
