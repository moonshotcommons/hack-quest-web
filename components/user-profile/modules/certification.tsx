import * as React from 'react';
import Image from 'next/image';
import { useProfile } from './profile-provider';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { useAttestation } from '../modals/add-attestation';
import { getDomain } from '@/constants/links';
import { useMutation } from '@tanstack/react-query';

import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { CertificationModalInstance } from '@/components/Web/Business/Certification/CertificationModal';
import { UserCertificateInfo } from '@/service/webApi/campaigns/type';
import { message } from 'antd';

import { ChainType } from '@/config/wagmi';
import { useMintCertificate } from '@/hooks/certificate';
import { Attestations } from '../common/attestations';
import { AttestButton } from '../common/attest-button';

function MintButton({
  certificate,
  update
}: {
  certificate: UserCertificateInfo;
  update: (certificate: UserCertificateInfo) => void;
}) {
  const { safeMintAsyncFromEvm, safeMintAsyncFromSolana, safeMintAsyncFromSui } = useMintCertificate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (certification: UserCertificateInfo) => {
      switch (certification.chainId) {
        case ChainType.Solana:
          await safeMintAsyncFromSolana(certification);
          break;
        case ChainType.Sui:
          await safeMintAsyncFromSui(certification);
          break;
        default:
          await safeMintAsyncFromEvm(certification);
      }
      return await webApi.campaignsApi.getCertificationDetail(certification.id);
    },
    onSuccess: (certificate) => {
      update(certificate);
    },
    onError: (err) => {
      errorMessage(err);
    }
  });

  function onClick() {
    if (!certificate.chainId) {
      message.info(`This NFT will open for minting soon!`);
      return;
    }
    if (certificate.mint) {
      return;
    }
    mutate(certificate);
  }

  return (
    <Button size="small" className="w-[140px]" disabled={certificate.mint} isLoading={isPending} onClick={onClick}>
      {certificate.mint ? 'Minted' : 'Mint'}
    </Button>
  );
}

export function Certification() {
  const { profile, invalidate } = useProfile();
  const { onOpen } = useAttestation();
  const certificationModalInstance = React.useRef<CertificationModalInstance>(null);
  const [selectCertification, setSelectCertification] = React.useState<UserCertificateInfo | null>(null);

  React.useEffect(() => {
    if (selectCertification) {
      certificationModalInstance.current?.open();
    }
  }, [selectCertification]);

  return (
    <div className="mt-2 flex flex-col gap-5 bg-neutral-white px-5 py-4 sm:mt-12 sm:gap-8 sm:p-0">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Certification</h2>
      <div className="flex gap-5 overflow-x-auto sm:flex-wrap">
        {profile?.certifications?.map((cert) => (
          <div className="flex flex-col gap-3" key={cert.id}>
            <div className="relative h-[120px] w-[220px] overflow-hidden rounded-[5px] border border-neutral-light-gray sm:h-[168px] sm:w-[304px] sm:rounded-[10px]">
              {cert && (
                <Image
                  src={`${getDomain(process.env.RUNTIME_ENV || 'dev')}api/certificate/${cert?.username}-${cert?.certificateId}.png`}
                  alt={cert.certificateId + ''}
                  fill
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold">{cert.name}</h3>
              {!profile?.isCurrentUser && (
                <AttestButton
                  onClick={() => {
                    onOpen({ type: 'Certification', sourceId: cert.id });
                  }}
                />
              )}
            </div>
            <time className="text-xs text-neutral-medium-gray" dateTime={cert.certificateTime}>
              Issued {moment(cert.certificateTime).format('MMM.D YYYY')}
            </time>
            {profile?.isCurrentUser && (
              <MintButton
                certificate={cert}
                update={(c) => {
                  setSelectCertification(c);
                  invalidate();
                }}
              />
            )}
            <Attestations attestations={cert.attestations} />
          </div>
        ))}
        {profile?.certifications?.length === 0 && (
          <div className="h-[120px] w-[220px] rounded-[5px] border border-dashed border-neutral-medium-gray sm:h-[168px] sm:w-[304px] sm:rounded-[10px]" />
        )}
      </div>
    </div>
  );
}
