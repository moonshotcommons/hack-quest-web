import Button from '@/components/Common/Button';
import { useUserStore } from '@/store/zustand/userStore';
import React, { useContext, useMemo, useState } from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import { separationNumber } from '@/helper/utils';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import StakeModal from './StakeModal';
import UnstakeModal from './UnstakeModal';
import { useWriteLaunchpadStake, useWriteLaunchpadUnstake, useWriteStakingTokenApprove } from '@/lib/generated';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { mantaTestnet } from '@/config/wagmi/chains';
import ConnectButton from '@/components/Web/Layout/LaunchPage/UserDropCard/ConnectButton';
import { parseUnits } from 'viem';
import { errorMessage } from '@/helper/ui';
import { ChainType } from '@/config/wagmi';
import { LaunchDetailContext } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/type';

interface StakeFuelProp {}

const StakeFuel: React.FC<StakeFuelProp> = () => {
  const { launchInfo, setLoading } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [modalName, setModalName] = useState('');
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();
  const [stakeId, setStakeId] = useState('');
  const { writeContractAsync } = useWriteLaunchpadStake();
  const { writeContractAsync: writeContractAsyncUn } = useWriteLaunchpadUnstake();
  const { writeContractAsync: stakingTokenApprove } = useWriteStakingTokenApprove();
  const account = useAccount();
  const hanleStake = async (amount: string) => {
    setLoading(true);
    try {
      if (chainId !== ChainType.MANTA) {
        await switchChainAsync({ chainId: ChainType.MANTA });
      }
      await stakingTokenApprove({
        account: account.address,
        address: mantaTestnet.contracts.stakingToken.address,
        args: [mantaTestnet.contracts.launchpad.address, parseUnits('0.0001', 18)]
      });
      await writeContractAsync({
        account: account.address,
        address: mantaTestnet.contracts.launchpad.address,
        args: [launchInfo.launchPadID, parseUnits('0.0001', 18)]
      });
    } catch (error) {
      console.info(error);
      errorMessage(error);
    }
    setLoading(false);
  };
  const hanleUnstake = async () => {
    setLoading(true);
    try {
      if (chainId !== ChainType.MANTA) {
        await switchChainAsync({ chainId: ChainType.MANTA });
      }
      await writeContractAsyncUn({
        account: account.address,
        address: mantaTestnet.contracts.launchpad.address,
        args: [launchInfo.launchPadID, BigInt(1)]
      });
    } catch (error) {
      console.info(error);
      errorMessage(error);
    }
    setLoading(false);
  };
  const stakeList = useMemo(() => {
    return launchInfo.fuelsInfo.filter((v: any) => v.type === 'STAKE_TOKEN');
  }, [launchInfo]);
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  return (
    <div className="mt-[1.25rem]">
      <div className="flex items-center gap-[1rem]">
        <p className="body-m text-neutral-black">{t('stakeFuel')}</p>
        {launchInfo.isStake && (
          <div
            className="body-s flex  items-center gap-[.25rem] text-neutral-medium-gray"
            onClick={() => setModalName('stake')}
          >
            <IoMdAddCircle size={16} />
            <span>{t('addNewStake')}</span>
          </div>
        )}
      </div>

      {stakeList.length > 0 ? (
        stakeList.map((v: any) => (
          <div
            key={v.id}
            className="body-m mt-[1rem]  rounded-[1rem] border border-neutral-light-gray bg-neutral-white p-[1rem] text-neutral-black"
          >
            <div className="flex items-center gap-[.75rem]">
              <div className="relative h-[2.5rem] w-[2.5rem] flex-shrink-0 overflow-hidden rounded-[50%]">
                <Image src={userInfo?.avatar as string} alt="avatar" fill className="object-cover"></Image>
              </div>
              <span>{lang === Lang.EN ? `${v.name} on 03/12/2024` : `2024年3月12日抵押${v.name}`}</span>
            </div>
            <div className="my-[1rem] flex justify-between pl-[1.25rem]">
              <div className="flex h-[2.5rem] w-[calc((100%-2rem)/2)] items-center justify-between rounded-r-[1.25rem] border border-neutral-light-gray bg-neutral-off-white pr-[.9375rem]">
                <div className="flex-center relative left-[-1.25rem] h-[2.5rem] w-[2.5rem] rounded-[50%] bg-yellow-primary">
                  <div className="flex-center body-l h-[2rem] w-[2rem] rounded-[50%] bg-yellow-light">🚀</div>
                </div>
                <span>{`${separationNumber(23799)}`}</span>
              </div>

              <div className="flex h-[2.5rem] w-[calc((100%-2rem)/2)]   items-center justify-between rounded-r-[1.25rem] border border-neutral-light-gray bg-neutral-off-white pr-[.9375rem]">
                <div className="flex-center relative left-[-1.25rem] h-[2.5rem] w-[2.5rem] rounded-[50%] bg-neutral-light-gray">
                  <div className="flex-center body-l h-[2rem] w-[2rem] rounded-[50%] bg-neutral-off-white text-neutral-medium-gray">
                    <MdOutlineAccessTimeFilled size={24} />
                  </div>
                </div>
                <span>{`${28}${t('d')}`}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="relative">
                <div
                  className="underline-l body-m cursor-pointer text-neutral-rich-gray"
                  onClick={() => {
                    setModalName('unStake');
                    setStakeId('id');
                  }}
                >
                  {t('unstake')}
                </div>
                {account.status !== 'connected' && (
                  <div className="absolute left-0 top-0 h-full w-full opacity-0">
                    <ConnectButton t={t} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-[1rem] flex flex-col items-center">
          <p className="body-m w-full text-center text-neutral-medium-gray">{t('stakeDescription')}</p>
          {account.status === 'connected' ? (
            <Button
              type="primary"
              className="button-text-m mt-[.75rem] h-[3rem] w-[10.3125rem] p-0 uppercase text-neutral-black"
              onClick={() => setModalName('stake')}
            >
              {t('stake')} $manta
            </Button>
          ) : (
            <div className="relative mt-[.75rem] h-[3rem]  w-[10.3125rem]">
              <Button
                type="primary"
                className="button-text-m mt-[.75rem] h-[3rem] w-[10.3125rem] p-0 uppercase text-neutral-black"
              >
                {t('stake')} $manta
              </Button>
              <div className="absolute left-0 top-0 h-full w-full opacity-0">
                <ConnectButton t={t} />
              </div>
            </div>
          )}
        </div>
      )}

      <StakeModal open={modalName === 'stake'} onClose={() => setModalName('')} hanleStake={hanleStake} />
      <UnstakeModal open={modalName === 'unStake'} onClose={() => setModalName('')} hanleUnstake={hanleUnstake} />
    </div>
  );
};

export default StakeFuel;
