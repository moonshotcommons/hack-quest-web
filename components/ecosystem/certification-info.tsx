'use client';

import Image from 'next/image';
import Button from '@/components/Common/Button';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { useCertificateModal } from './use-certificate';
import { EcosystemDetailType } from '@/service/webApi/ecosystem/type';
import { CertificationType } from '@/service/webApi/campaigns/type';

export function CertificationInfo({
  ecosystem,
  certificate
}: {
  ecosystem: EcosystemDetailType;
  certificate: CertificationType;
}) {
  const { onOpen } = useCertificateModal();

  return (
    <div className="flex flex-col px-5 py-6 sm:flex-row sm:items-center sm:gap-12 sm:px-0 sm:py-0">
      <h1 className="font-next-book-bold text-[1.375rem] font-bold capitalize text-neutral-off-black sm:hidden">
        Certified {ecosystem.info.name}
      </h1>
      <div className="order-2 mt-5 flex flex-1 flex-col sm:order-1 sm:mt-0 sm:gap-6">
        <h1 className="hidden font-next-book-bold text-[1.75rem] font-bold capitalize text-neutral-off-black sm:block">
          Certified {ecosystem.info.name}
        </h1>
        <div className="flex flex-col sm:gap-2">
          <h2 className="mb-2 flex items-center gap-3 sm:mb-0">
            <span className="font-next-book-bold text-base font-bold text-neutral-off-black sm:text-lg">
              Lvl {ecosystem.level.level}.
            </span>
            <span className="mt-0.5 text-sm text-neutral-medium-gray">{ecosystem.level.label}</span>
          </h2>
          <Progress className="h-3 bg-neutral-white" max={ecosystem.level.maxExp} value={ecosystem.level.currentExp}>
            <ProgressLabel className="text-sm text-neutral-off-black">
              {ecosystem.level.currentExp}/{ecosystem.level.maxExp}
            </ProgressLabel>
          </Progress>
        </div>
        <Button
          disabled={ecosystem.level.currentExp < ecosystem.level.maxExp}
          type="primary"
          size="medium-x"
          ghost={certificate.claimed}
          onClick={() => {
            if (certificate.claimed) {
              onOpen('mint', certificate);
            } else {
              onOpen('claim', certificate);
            }
          }}
          className="mt-6 h-10 w-full uppercase sm:mt-0 sm:h-12 sm:w-[11.25rem] sm:self-start"
        >
          {certificate.claimed ? 'view more' : 'claim certificate'}
        </Button>
      </div>
      <div className="relative order-1 mt-5 h-48 w-full rounded-[0.5rem] sm:order-2 sm:mt-0 sm:h-40 sm:w-72">
        <Image src={certificate?.image} alt={certificate.name} priority fill />
      </div>
    </div>
  );
}
