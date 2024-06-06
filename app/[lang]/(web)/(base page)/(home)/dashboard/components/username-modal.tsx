'use client';

import * as React from 'react';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Common/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import webApi from '@/service';
import { useCertificateModal } from '@/components/ecosystem/use-certificate';
import Button from '@/components/Common/Button';

export function UsernameModal() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [username, setUsername] = React.useState('');

  const { open, type, data, onOpen, onClose } = useCertificateModal();

  const isOpen = open && type === 'username';

  const mutation = useMutation({
    mutationKey: ['claimCertificate'],
    mutationFn: (id: string) => webApi.campaignsApi.claimCertificate({ username }, id)
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    mutation.mutateAsync(data?.certificationId).then(() => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      setUsername('');
      onClose();
      setTimeout(() => {
        onOpen('mint', data);
      }, 1000);
    });
  }

  return (
    <Modal open={isOpen} onClose={() => {}}>
      <div className="relative flex w-[900px] flex-col rounded-3xl bg-neutral-white px-12 pb-8 pt-12">
        <button className="absolute right-6 top-6 outline-none" onClick={() => onClose()}>
          <XIcon size={24} />
        </button>
        <div className="mx-auto flex items-center gap-2">
          <Image src="/images/ecosystem/silver_medal.svg" width={24} height={33} alt="silver medal" />
          <h1 className="text-2xl font-bold text-neutral-off-black">Congratulations! You’re a {data?.label}</h1>
        </div>
        <div className="mt-6">
          <form className="flex w-full flex-col" onSubmit={handleSubmit}>
            <label htmlFor="name" className="text-neutral-rich-gray">
              Enter Your Name to Claim Certificate
            </label>
            <input
              id="name"
              type="text"
              autoComplete="off"
              className="my-1 w-full rounded-[0.5rem] p-3 text-base text-neutral-black outline-none ring-1 ring-neutral-light-gray transition-colors focus:ring-neutral-medium-gray"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="mb-6 text-sm text-neutral-medium-gray">
              Once you claim the certificate, you’ll not be able to change your name
            </p>
            <Button
              disabled={!username}
              htmlType="submit"
              loading={mutation.isPending}
              className="mx-auto h-12 w-64 rounded-full bg-yellow-primary text-sm font-medium uppercase text-neutral-black outline-none disabled:bg-neutral-light-gray disabled:text-neutral-medium-gray"
            >
              continue
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
