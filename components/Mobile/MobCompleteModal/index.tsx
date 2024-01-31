import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import Congrats from '@/public/images/course/congrats.svg';
import { ThemeContext } from '@/store/context/theme';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
interface MobCompleteModalProps {}

interface OpenParams {
  type: 'course' | 'claim';
  title: string;
}

export interface MobCompleteModalInstance {
  open: (params: OpenParams) => void;
  close: (closeCallback?: VoidFunction) => void;
}

const MobCompleteModal = forwardRef<
  MobCompleteModalInstance,
  MobCompleteModalProps
>((props, ref) => {
  const [open, setOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [type, setType] = useState<'course' | 'claim'>('course');
  const [title, setTitle] = useState('');

  useImperativeHandle(ref, () => {
    return {
      open(params) {
        setType(params.type);
        setTitle(params.title);
        setOpen(true);
      },
      close(closeCallback) {
        setOpen(false);
        closeCallback?.();
      }
    };
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      markBg="black"
    >
      <div className="w-full h-[35.6875rem] bg-lesson-completed-modal-bg rounded-[2.5rem] m-auto flex flex-col items-center relative overflow-hidden">
        <div className="mt-[91px]">
          <Image src={Congrats} alt="completed" width={45} height={50}></Image>
        </div>
        <h1
          className="
            relative text-center w-[34.625rem] font-next-poster
            text-[2.2021rem] leading-[100%] text-text-default-color mt-[20px] py-[23px]
            before:absolute before:h-[1px] before:scale-y-[1] before:w-[27.75rem] before:bg-lesson-completed-modal-line-color before:top-[0px] before:left-[50%] before:-translate-x-[50%]
            after:absolute after:h-[1px] after:scale-y-[1] after:w-full after:bg-lesson-completed-modal-line-color after:-bottom-[0px] after:left-0
            "
        >
          COURSE COMPLETE!
        </h1>
        <p className="font-next-book text-[1.25rem] text-text-default-color mt-[20px] leading-[128%]">
          {decodeURIComponent(title)}
        </p>
        {type === 'course' && (
          <div className="flex gap-[1.25rem] mt-[100px]">
            <Link href={'/dashboard'} onClick={() => setOpen(false)}>
              <Button className="bg-lesson-primary-button-bg text-lesson-primary-button-text-color border border-lesson-primary-button-border-color font-next-book px-[3rem] py-[1rem] text-[18px]">
                Back to Homepage
              </Button>
            </Link>
          </div>
        )}
        {type === 'claim' && (
          <div className="w-full flex flex-col items-center">
            <p className="w-[297px] font-next-book leading-[125%] tracking-[0.32px] text-center mt-[10px] text-neutral-rich-gray">
              You have completed this learning track. Continue to claim your
              Badge.
            </p>
            <Button
              type="primary"
              className="mt-[30px] w-[260px] px-0 py-[11px] flex justify-center items-center font-next-book leading-[125%] tracking-[0.32px] text-neutral-black"
            >
              Claim Certificate
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
});

MobCompleteModal.displayName = 'MobCompleteModal';

export default MobCompleteModal;
