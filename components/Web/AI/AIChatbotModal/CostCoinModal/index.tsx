import Button from '@/components/Common/Button';
import { ForwardRefRenderFunction, forwardRef, useImperativeHandle, useState } from 'react';

import { useRequest } from 'ahooks';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import Image from 'next/image';
import { cn } from '@/helper/utils';

interface CostCoinModalProps {}

export interface CostCoinModalRef {
  open: (params: { onConfirm: () => Promise<unknown>; onConfirmCallback?: VoidFunction }) => void;
}

const CostCoinModal: ForwardRefRenderFunction<CostCoinModalRef, CostCoinModalProps> = (props, ref) => {
  const [option, setOption] = useState<{ onConfirm: () => Promise<unknown>; onConfirmCallback?: VoidFunction } | null>(
    null
  );

  const userCoin = useMissionCenterStore((state) => state.userCoin.coin);
  const [showMe, setShowMe] = useState(false);
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open: (params) => {
        setOption(params);
        setOpen(true);
      }
    };
  });

  const { run: confirm, loading } = useRequest(
    () => {
      return option!.onConfirm();
    },

    {
      manual: true,
      onSuccess() {
        option!.onConfirmCallback?.();
        setOpen(false);
        setOption(null);
      }
    }
  );

  return (
    open && (
      <div
        className="absolute flex h-full w-full items-center justify-center rounded-[16px] bg-[rgba(11,11,11,0.25)]"
        id="cost-coin-modal"
      >
        <div className="flex h-[309px] w-[400px] flex-col gap-6 rounded-[16px] bg-neutral-white p-6">
          <div className="flex justify-end">
            <div className="flex items-center rounded-full bg-neutral-off-white">
              <Image src={'/images/mission-center/icon_coin_new.png'} alt="coin" width={30} height={30} />
              <span className="inline-block pl-[10px] pr-4">{userCoin}</span>
            </div>
          </div>
          <h4 className="body-l-bold flex items-center justify-center gap-1 text-center text-neutral-black">
            <span>Your interaction will cost 5</span>
            <Image src={'/images/mission-center/icon_coin.png'} alt="coin" width={16} height={16} />
          </h4>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowMe(!showMe);
              window.localStorage.setItem('showCostCoinModal', !showMe ? 'hidden' : 'show');
            }}
            className="flex justify-center gap-[10px]"
          >
            <span className="body-s flex h-[22px] w-[22px] items-center justify-center rounded-[2px] border-[2px] border-neutral-black text-neutral-black">
              <span
                className={cn(
                  'inline-block h-[14px] w-[14px] rounded-[2px] bg-neutral-black',
                  showMe ? 'inline-block' : 'hidden'
                )}
              ></span>
            </span>
            <span>Don’t show me again</span>
          </div>
          <div className="flex w-full flex-col justify-center gap-3">
            <Button
              block
              className="button-text-m px-0 py-4 uppercase text-neutral-black"
              type="primary"
              loading={loading}
              disabled={loading}
              onClick={() => {
                option?.onConfirm && confirm();
              }}
            >
              Confirm
            </Button>
            <Button
              ghost
              block
              className="button-text-m px-0 py-4 uppercase text-neutral-black outline-none"
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default forwardRef(CostCoinModal);
