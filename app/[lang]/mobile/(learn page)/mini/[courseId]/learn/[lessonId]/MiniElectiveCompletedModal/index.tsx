import Button from '@/components/Common/Button';
import { forwardRef, useImperativeHandle, useState } from 'react';
import BottomImage from './bottom.png';
interface MiniElectiveCompletedModalProps {}

export interface MiniElectiveCompletedModalRef {
  open: (params: Record<string, any>) => void;
}

const MiniElectiveCompletedModal = forwardRef<MiniElectiveCompletedModalRef, MiniElectiveCompletedModalProps>(
  (props, ref) => {
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
        className="flex-center absolute left-0 top-0 z-[10] h-full w-full"
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
            <svg width="27" height="20" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.7373 11.5657L13.1634 22L30.1057 2"
                stroke="#00C365"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text=[#131313] font-next-poster-Bold text-[28px] tracking-[1.68px]">Nice Job!</span>
          </div>
          <p className="my-[40px] text-center font-next-book leading-[125%] tracking-[0.32px] text-[#3E3E3E]">
            You have completed this mini. <br /> Continue to claim your Badge.
          </p>
          <div className="flex w-full flex-col gap-y-[15px] font-next-book text-base leading-[125%] tracking-[0.32px]">
            {/* <Button block type="primary" className="py-[11px]">
            Claim Badge
          </Button> */}
            <Button block ghost type="primary" className="border-black py-[11px]" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </div>
    ) : null;
  }
);

export default MiniElectiveCompletedModal;

MiniElectiveCompletedModal.displayName = 'MiniElectiveCompletedModal';
