'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MoveRightIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { EcosystemDetailType } from '@/service/webApi/ecosystem/type';
import { CertificationType } from '@/service/webApi/campaigns/type';
import { useCertificateModal } from './use-certificate';

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
        Lvl {ecosystem.level.level}. {ecosystem.level.label}
      </h1>
      <div className="order-2 mt-5 flex flex-1 flex-col sm:order-1 sm:mt-0 sm:gap-4">
        <h1 className="hidden font-next-book-bold text-[1.75rem] font-bold capitalize text-neutral-off-black sm:block">
          Lvl {ecosystem.level.level}. {ecosystem.level.label}
        </h1>
        <Progress className="h-3 bg-neutral-white" max={ecosystem.level.maxExp} value={ecosystem.level.currentExp}>
          <ProgressLabel className="text-sm text-neutral-off-black">
            {ecosystem.level.currentExp}/{ecosystem.level.maxExp}
          </ProgressLabel>
        </Progress>
        <div className="mt-6 flex items-center gap-6 sm:mt-4">
          {ecosystem.level.currentExp >= ecosystem.level.maxExp && (
            <Button
              type="primary"
              ghost={certificate.claimed}
              onClick={() => {
                if (certificate.claimed) {
                  onOpen('mint', certificate);
                } else {
                  onOpen('claim', certificate);
                }
              }}
              className="h-10 w-full whitespace-nowrap text-sm uppercase sm:h-12 sm:w-[11.25rem] sm:self-start"
            >
              {certificate.claimed ? 'View certificate' : 'Claim certificate'}
            </Button>
          )}
          {certificate.claimed && ecosystem.level.currentExp >= ecosystem.level.maxExp && (
            <Link href="/ecosystem-explore">
              <button className="inline-flex items-center justify-center gap-1.5">
                <span className="text-base capitalize leading-[160%] text-neutral-black">Explore Ecosystems</span>
                <MoveRightIcon className="h-4 w-4" />
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="relative order-1 mt-5 h-48 w-full rounded-[0.5rem] sm:order-2 sm:mt-0 sm:h-[6.25rem] sm:w-[11.125rem]">
        <Image src={certificate?.image} alt={certificate.name} priority fill />
      </div>
    </div>
  );
}
