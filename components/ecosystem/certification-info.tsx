'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckIcon, MoveRightIcon } from 'lucide-react';
import Button from '@/components/Common/Button';
import { Progress, ProgressLabel } from '@/components/ui/progress';
import { EcosystemDetailType, LevelType } from '@/service/webApi/ecosystem/type';
import { cn } from '@/helper/utils';
import { useCertificateModal } from './use-certificate';
import { FillArrowIcon } from '../Common/Icon/Arrow';
import { useLang } from '../Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useUserStore } from '@/store/zustand/userStore';
import { useWriteCertificateNftUpdateBaseUri } from '@/lib/generated';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { ChainConfigContext } from '../Provider/WagmiConfigProvider';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const label = ['learner', 'builder'];

export function CertificationInfo({ ecosystem, levels }: { ecosystem: EcosystemDetailType; levels: LevelType[] }) {
  const { lang } = useLang();
  const { t } = useTranslation(lang, TransNs.ECOSYSTEM);
  const { onOpen } = useCertificateModal();

  const hasNextLevel = levels?.length > 1;

  const currentCertificate = levels?.find((c) => c.certificationId === ecosystem?.level?.certificationId);

  const userInfo = useUserStore((state) => state.userInfo);

  function onClickCertificate(level?: LevelType) {
    if (level) {
      if (level.certification.claimed) {
        onOpen('mint', level);
      } else {
        onOpen('claim', {
          ...level,
          currentExp: ecosystem?.level.currentExp
        });
      }
    }
  }

  function handleClaimCertificate() {
    if (currentCertificate?.certification.claimed) {
      onOpen('mint', currentCertificate);
    } else {
      onOpen('username', currentCertificate);
    }
  }

  const [baseUrl, setBaseUrl] = React.useState('');
  const { openConnectModal } = useConnectModal();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const { updateInitialChainId } = React.useContext(ChainConfigContext);
  const account = useAccount();
  const { writeContractAsync } = useWriteCertificateNftUpdateBaseUri();

  return (
    <div className="flex flex-col px-5 py-6 sm:flex-row sm:items-center sm:gap-12 sm:px-0 sm:py-0">
      <h1 className="font-next-book-bold text-[1.375rem] font-bold capitalize text-neutral-off-black sm:hidden">
        Lvl {ecosystem?.level?.level}. {ecosystem?.level?.label}
      </h1>
      <div className="order-2 mt-5 flex flex-1 flex-col sm:order-1 sm:mt-0 sm:gap-4">
        {/* 不要删除下面代码，更新合约图片地址用的，之后可能还会用 */}
        {/* {userInfo?.role === UserRole.ADMIN && (
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                name="baseUrl"
                className="h-10"
                value={baseUrl}
                onChange={(e) => {
                  setBaseUrl(e.target.value);
                }}
              ></Input>
            </div>
            <Button
              type="primary"
              onClick={async () => {
                let certificate = levels[0].certification;

                if (!account?.isConnected && openConnectModal) {
                  updateInitialChainId(certificate.chainId);
                  openConnectModal();
                  throw new Error('Please connect your wallet first!');
                }

                if (chainId !== certificate.chainId) {
                  await switchChainAsync({ chainId: certificate.chainId });
                }

                console.log(`${getDomain(process.env.RUNTIME_ENV || 'dev')}api/`);
                for (let c of levels) {
                  const certification = c.certification;
                  writeContractAsync({
                    address: certification.contract as any,
                    account: account.address,
                    args: [`${getDomain(process.env.RUNTIME_ENV || 'dev')}api/`]
                  });
                }
              }}
              className="h-10"
            >
              更新
            </Button>
          </div>
        )} */}
        <h1 className="hidden font-next-book-bold text-[1.75rem] font-bold capitalize text-neutral-off-black sm:block">
          Lvl {ecosystem?.level?.level}. {ecosystem?.level?.label}
        </h1>
        <Progress className="h-3 bg-neutral-white" max={ecosystem?.level?.maxExp} value={ecosystem?.level?.currentExp}>
          <ProgressLabel className="text-sm text-neutral-off-black">
            {ecosystem?.level?.currentExp}/{ecosystem?.level?.maxExp}
          </ProgressLabel>
        </Progress>
        <div className="mt-6 flex items-center gap-6 sm:mt-4">
          {ecosystem?.level?.currentExp >= ecosystem?.level?.maxExp && (
            <Button
              type="primary"
              ghost={currentCertificate?.certification?.claimed}
              onClick={handleClaimCertificate}
              className="h-10 w-full whitespace-nowrap text-sm uppercase sm:h-12 sm:w-[11.25rem] sm:self-start"
            >
              {currentCertificate?.certification?.claimed ? t('view_certificate') : t('claim_certificate')}
            </Button>
          )}
          {currentCertificate?.certification?.claimed && ecosystem?.level?.currentExp >= ecosystem?.level?.maxExp && (
            <Link href="/ecosystem-explore">
              <button className="inline-flex items-center justify-center gap-1.5">
                <span className="text-base capitalize leading-[160%] text-neutral-black">
                  {t('explore_ecosystems')}
                </span>
                <MoveRightIcon className="h-4 w-4" />
              </button>
            </Link>
          )}
        </div>
      </div>
      {hasNextLevel && (
        <div className="order-1 mt-5 flex items-center justify-between gap-3 sm:mt-0 sm:justify-start">
          {levels?.map((level, index) => (
            <React.Fragment key={index}>
              <div
                className={cn('flex flex-col items-center gap-2 rounded-2xl bg-transparent p-4', {
                  'bg-yellow-light': ecosystem?.level?.certificationId === level?.certificationId
                })}
              >
                <div
                  className="relative h-[78px] w-[139px] cursor-pointer overflow-hidden rounded-[8px] shadow-idea-card sm:h-[100px] sm:w-[178px]"
                  onClick={() => onClickCertificate(level)}
                >
                  <Image src={level?.certification?.image} alt={level?.label} fill />
                </div>
                <span className="sm:body-s-bold body-xs-bold flex items-center gap-1">
                  Lv{level?.level}. {t(label[index])}{' '}
                  {level?.certification.claimed && (
                    <CheckIcon className="h-4 w-4 text-status-success-dark sm:h-5 sm:w-5" />
                  )}
                </span>
              </div>
              {index < levels?.length - 1 && <FillArrowIcon className="h-4 w-4 text-yellow-dark sm:h-6 sm:w-6" />}
            </React.Fragment>
          ))}
        </div>
      )}
      {!hasNextLevel && (
        <div
          className="relative order-1 mt-5 h-48 w-full cursor-pointer overflow-hidden rounded-[0.5rem] shadow-idea-card sm:order-2 sm:mt-0 sm:h-[6.25rem] sm:w-[11.125rem]"
          onClick={() => onClickCertificate(currentCertificate)}
        >
          <Image src={levels?.[0]?.certification?.image} fill alt={levels?.[0]?.label} />
        </div>
      )}
    </div>
  );
}
