'use client';

import * as React from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useParams, useRouter } from 'next/navigation';
import { XIcon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCertificateModal } from '@/components/ecosystem/use-certificate';
import webApi from '@/service';

import { UserCertificateInfo } from '@/service/webApi/campaigns/type';
import { errorMessage } from '@/helper/ui';

function ClaimCertificateForm() {
  const [name, setName] = React.useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div className="mt-6 flex-1">
      <form className="flex h-full w-full flex-col" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-neutral-rich-gray">
          Enter Your Name to Claim Certificate
        </label>
        <input
          id="name"
          type="text"
          className="my-1 w-full rounded-[0.5rem] p-3 text-base text-neutral-black outline-none ring-1 ring-neutral-light-gray"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p className="text-sm text-neutral-medium-gray">
          Once you claim the certificate, you’ll not be able to change your name
        </p>
        <button
          disabled={!name}
          type="submit"
          className="mt-auto h-12 w-full rounded-full bg-yellow-primary text-sm font-medium uppercase text-neutral-black outline-none disabled:bg-neutral-light-gray disabled:text-neutral-medium-gray"
        >
          continue
        </button>
      </form>
    </div>
  );
}

export function UsernameModal() {
  const router = useRouter();
  const { ecosystemId } = useParams<{ ecosystemId: string }>();
  const queryClient = useQueryClient();
  const [username, setUsername] = React.useState('');
  const [userCertificateInfo, setUserCertificateInfo] = React.useState<UserCertificateInfo>();
  const { open, type, data, onOpen, onClose } = useCertificateModal();

  const isOpen = open && type === 'username';

  const container = React.useRef(null);

  const [loading, setLoading] = React.useState(false);

  const mutation = useMutation({
    mutationKey: ['createCertificate'],
    mutationFn: (id: string) => webApi.campaignsApi.crateCertificate(id, { username }),
    onError: (error, variables, context) => errorMessage(error)
  });

  const { mutateAsync, isPending: claimLoading } = useMutation({
    mutationKey: ['claimCertificate'],
    mutationFn: ({ id }: { id: string }) => webApi.ecosystemApi.claimCertificateOverride(id)
  });

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   setLoading(true);
  //   e.preventDefault();
  //   const certificateInfo = await mutation.mutateAsync(data?.certificationId);
  //   setUserCertificateInfo(certificateInfo);

  //   await wait(300);

  //   const canvas = await html2canvas(container.current!, {
  //     useCORS: true
  //   });

  //   canvas.toBlob((blob) => {
  //     if (!blob) return;
  //     const file = new File([blob], 'certificate.png', { type: blob.type });

  //     const formData = new FormData();
  //     formData.append('file', file);
  //     mutateAsync({ id: ecosystemId, formData }).then((res) => {
  //       setUsername('');
  //       onClose();
  //       setLoading(false);
  //       router.refresh();
  //       queryClient.invalidateQueries({ queryKey: ['userProfile'] });
  //       setTimeout(() => {
  //         data.certification = res;
  //         onOpen('mint', data);
  //       }, 500);
  //     });
  //   });
  // }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const certificateInfo = await mutation.mutateAsync(data?.certificationId);
    setUserCertificateInfo(certificateInfo);
    data.certification = certificateInfo;

    setUsername('');
    onClose();
    setLoading(false);
    mutateAsync({ id: ecosystemId }).then((res) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    });
    router.refresh();
    setTimeout(() => {
      onOpen('mint', data);
    }, 1000);
    // createCertificate();
  }

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return isOpen
    ? createPortal(
        <div className="fixed inset-x-0 top-16 z-50 h-[calc(100vh-4rem)]">
          <div className="relative flex h-full flex-col bg-neutral-white px-5 py-6">
            <button className="absolute right-4 top-6 outline-none" onClick={() => onClose()}>
              <XIcon size={24} />
            </button>
            <div className="mt-11 flex flex-col gap-2">
              <Image src="/images/ecosystem/silver_medal.svg" width={24} height={33} alt="silver medal" />
              <h1 className="text-lg font-bold text-neutral-off-black sm:text-2xl">
                Congratulations! You’re a {data?.label}
              </h1>
            </div>
            <div className="mt-6 flex-1">
              <form className="flex h-full w-full flex-col" onSubmit={handleSubmit}>
                <label htmlFor="name" className="text-neutral-rich-gray">
                  Enter Your Name to Claim Certificate
                </label>
                <input
                  id="name"
                  type="text"
                  className="my-1 w-full rounded-[0.5rem] p-3 text-base text-neutral-black outline-none ring-1 ring-neutral-light-gray"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <p className="text-sm text-neutral-medium-gray">
                  Once you claim the certificate, you’ll not be able to change your name
                </p>
                <button
                  disabled={!username}
                  type="submit"
                  className="mt-auto h-12 w-full rounded-full bg-yellow-primary text-sm font-medium uppercase text-neutral-black outline-none disabled:bg-neutral-light-gray disabled:text-neutral-medium-gray"
                >
                  continue
                </button>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}
