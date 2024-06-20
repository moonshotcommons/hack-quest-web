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
import CertificateRenderer from '@/components/Web/Business/CertificateRenderer';
import html2canvas from 'html2canvas';
import { UserCertificateInfo } from '@/service/webApi/campaigns/type';
import { errorMessage } from '@/helper/ui';
import { wait } from '@/helper/utils';

export function UsernameModal() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [username, setUsername] = React.useState('');

  const [userCertificateInfo, setUserCertificateInfo] = React.useState<UserCertificateInfo>();
  const { open, type, data, onOpen, onClose } = useCertificateModal();
  const isOpen = open && type === 'username';
  const container = React.useRef(null);

  const [loading, setLoading] = React.useState(false);

  const mutation = useMutation({
    mutationKey: ['generateCertificate'],
    mutationFn: (id: string) => webApi.campaignsApi.crateCertificate(id, { username }),
    onError: (error, variables, context) => errorMessage(error)
  });

  const { mutateAsync, isPending: claimLoading } = useMutation({
    mutationKey: ['claimCertificate'],
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      webApi.campaignsApi.claimCertificate(id, formData)
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    const certificateInfo = await mutation.mutateAsync(data?.certificationId);
    setUserCertificateInfo(certificateInfo);

    await wait(300);

    const canvas = await html2canvas(container.current!, {
      useCORS: true
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], 'certificate.png', { type: blob.type });

      const formData = new FormData();
      formData.append('file', file);
      mutateAsync({ id: data?.certificationId, formData }).then((res) => {
        setUsername('');
        onClose();
        setLoading(false);
        router.refresh();
        queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        setTimeout(() => {
          data.certification = res;
          onOpen('mint', data);
        }, 500);
      });
    });
  }

  return (
    <>
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
                disabled={loading}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="mb-6 text-sm text-neutral-medium-gray">
                Once you claim the certificate, you’ll not be able to change your name
              </p>
              <Button
                disabled={!username}
                htmlType="submit"
                loading={loading}
                className="mx-auto h-12 w-64 rounded-full bg-yellow-primary text-sm font-medium uppercase text-neutral-black outline-none disabled:bg-neutral-light-gray disabled:text-neutral-medium-gray"
              >
                {mutation.isPending ? 'creating...' : claimLoading ? 'claim...' : 'continue'}
              </Button>
            </form>
          </div>
        </div>
      </Modal>
      <div ref={container} className="fixed -left-[999999px] top-0 z-[99999]">
        {data?.certification?.template && (
          <CertificateRenderer template={data.certification.template as string} certificateInfo={userCertificateInfo} />
        )}
      </div>
    </>
  );
}
