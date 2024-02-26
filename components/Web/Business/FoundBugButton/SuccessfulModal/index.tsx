import { forwardRef, useImperativeHandle, useState } from 'react';
import Modal from '@/components/Common/Modal';
import Button from '@/components/Common/Button';
import Link from 'next/link';
import { HACKQUEST_DISCORD } from '@/constants/links';

interface SuccessfulModalProps {}

export interface SuccessfulModalRef {
  open: () => void;
}

const SuccessfulModal = forwardRef<SuccessfulModalRef, SuccessfulModalProps>(
  ({}, ref) => {
    const [open, setOpen] = useState(false);
    useImperativeHandle(ref, () => {
      return {
        open() {
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
          <div className="absolute -right-[16px] -top-[16px] cursor-pointer">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="22.2734"
                y1="22.2745"
                x2="7.42416"
                y2="7.42521"
                stroke="#0B0B0B"
              />
              <line
                x1="7.42574"
                y1="22.2744"
                x2="22.275"
                y2="7.42513"
                stroke="#0B0B0B"
              />
            </svg>
          </div>
        }
        markBg="black"
      >
        <div className="flex w-[1084px] max-w-[1084px] flex-col items-center gap-10 rounded-[10px] bg-neutral-white px-[139px] py-20">
          <h3 className="text-h3 text-neutral-black">
            Report Submitted Successfully! 🎉
          </h3>
          <p className="body-m text-neutral-black">
            Your bug report is now automatically posted on Discord! Want to get
            reward / hear followup？
          </p>
          <div className="flex gap-4">
            <Link href={HACKQUEST_DISCORD} target="_blank">
              <Button
                type="primary"
                className="button-text-m w-[219px] px-0 py-4 uppercase text-neutral-black"
                onClick={() => {}}
              >
                check out on discord
              </Button>
            </Link>
            <Button
              ghost
              className="button-text-m w-[219px] px-0 py-4 uppercase text-neutral-black"
              onClick={() => {
                setOpen(false);
              }}
            >
              close
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);

export default SuccessfulModal;

SuccessfulModal.displayName = 'SuccessfulModal';
