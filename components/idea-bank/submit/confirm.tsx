'use client';

import * as React from 'react';
import { message } from 'antd';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Checkbox } from '@/components/ui/checkbox';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { useToggle } from '@/hooks/utils/use-toggle';
import webApi from '@/service';
import { useSubmitModal } from './store';

export function ConfirmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const { values, onClose: modalOnClose } = useSubmitModal();
  const [confirm, toggle] = useToggle(false);

  const mutation = useMutation({
    mutationFn: () => webApi.ideaApi.submitIdea(values),
    onSuccess: () => {
      router.refresh();
      onClose();
      modalOnClose();
      message.success('Submit idea success!');
    }
  });

  return (
    <Modal open={open} onClose={() => {}}>
      <div className="relative flex w-full flex-col gap-5 rounded-2xl bg-neutral-white px-7 py-6 shadow-modal sm:w-[33.25rem] sm:gap-9 sm:p-10">
        <button className="absolute right-5 top-5 outline-none" onClick={onClose}>
          <XIcon size={24} />
        </button>
        <h1 className="sm:headline-h4 headline-h4-mob text-center text-neutral-black">
          Do you want to submit this idea?
        </h1>
        <div className="flex items-start space-x-2">
          <Checkbox id="confirm" checked={confirm} onCheckedChange={toggle} />
          <label htmlFor="confirm" className="sm:body-s body-xs text-neutral-medium-gray">
            By submitting this idea, I affirm that it is my original creation and does not infringe upon the
            intellectual property rights of others.
          </label>
        </div>
        <div className="flex justify-center gap-2 [&>button]:h-[2.125rem] [&>button]:w-[8.75rem] [&>button]:sm:h-12 [&>button]:sm:w-[10.25rem]">
          <Button ghost onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            disabled={!confirm}
            loading={mutation.isPending}
            className="aria-disabled:bg-neutral-light-gray"
            onClick={() => mutation.mutate()}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
