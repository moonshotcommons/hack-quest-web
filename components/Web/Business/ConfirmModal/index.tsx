import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { ForwardRefRenderFunction, ReactNode, forwardRef, useImperativeHandle, useState } from 'react';

import { useRequest } from 'ahooks';
import { cn } from '@/helper/utils';

interface ConfirmModalProps {
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  className?: string;
  disabled?: boolean;
}

interface Params {
  onConfirm: () => Promise<unknown>;
  onCancel?: () => void;
  onConfirmCallback?: () => void;
}

export interface ConfirmModalRef {
  open: (params: Params) => void;
}

const ConfirmModal: ForwardRefRenderFunction<ConfirmModalRef, ConfirmModalProps> = (props, ref) => {
  const { children, confirmText, cancelText, className, disabled = false } = props;
  const [option, setOption] = useState<Params | null>(null);
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

  const cancel = () => {
    option?.onCancel?.();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setOption(null);
      }}
      showCloseIcon
      iconClassName="absolute top-5 right-5"
      icon={
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14.472 13.5242C14.5982 13.6494 14.6692 13.8198 14.6692 13.9975C14.6692 14.1753 14.5982 14.3457 14.472 14.4709C14.3468 14.5971 14.1764 14.6681 13.9987 14.6681C13.8209 14.6681 13.6505 14.5971 13.5253 14.4709L7.99866 8.93753L2.47199 14.4709C2.34681 14.5971 2.17642 14.6681 1.99866 14.6681C1.8209 14.6681 1.6505 14.5971 1.52532 14.4709C1.39912 14.3457 1.32812 14.1753 1.32812 13.9975C1.32812 13.8198 1.39912 13.6494 1.52532 13.5242L7.05866 7.99753L1.52532 2.47087C1.35622 2.30176 1.29017 2.05529 1.35207 1.82428C1.41397 1.59328 1.5944 1.41285 1.82541 1.35095C2.05641 1.28905 2.30288 1.3551 2.47199 1.5242L7.99866 7.05753L13.5253 1.5242C13.7867 1.26279 14.2106 1.26279 14.472 1.5242C14.7334 1.78562 14.7334 2.20945 14.472 2.47087L8.93866 7.99753L14.472 13.5242Z"
            fill="#231F20"
          />
        </svg>
      }
    >
      <div className={cn('w-[calc(100vw-40px)] rounded-[16px] bg-neutral-white px-5 py-10 sm:w-[532px]', className)}>
        {children}
        <div className="mt-9 flex justify-center gap-2">
          <Button
            ghost
            className="button-text-m h-[2.125rem] w-[calc((100%-16px-40px)/2)] px-0 py-0 uppercase text-neutral-black outline-none sm:h-fit sm:w-[165px] sm:py-4"
            onClick={() => {
              setOpen(false);
              cancel();
            }}
          >
            {cancelText || 'cancel'}
          </Button>
          <Button
            className="button-text-m h-[2.125rem] w-[calc((100%-16px-40px)/2)] px-0 py-0 uppercase text-neutral-black sm:h-fit sm:w-[165px] sm:py-4"
            type="primary"
            loading={loading}
            disabled={disabled || loading}
            onClick={() => {
              option?.onConfirm && confirm();
            }}
          >
            {confirmText || 'confirm'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default forwardRef(ConfirmModal);
