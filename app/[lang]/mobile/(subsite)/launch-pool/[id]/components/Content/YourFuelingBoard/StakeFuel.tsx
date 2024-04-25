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
import { useAccount } from 'wagmi';
import { LaunchDetailContext, ModalName } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/type';
import moment from 'moment';
import { FuelInfo } from '@/service/webApi/launchPool/type';
import ConnectButton from '@/components/Web/Business/ConnectButton';

interface StakeFuelProp {}

const StakeFuel: React.FC<StakeFuelProp> = () => {
  const { launchInfo, modalName, setModalName } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const [fule, setFule] = useState<FuelInfo>();
  const account = useAccount();
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
          <>
            {account.status === 'connected' ? (
              <div
                className="body-s flex  items-center gap-[.25rem] text-neutral-medium-gray"
                onClick={() => setModalName(ModalName.STAKE)}
              >
                <IoMdAddCircle size={16} />
                <span>{t('addNewStake')}</span>
              </div>
            ) : (
              <div className="body-s relative  flex items-center gap-[.25rem] text-neutral-medium-gray">
                <IoMdAddCircle size={16} />
                <span>{t('addNewStake')}</span>
                <div className="absolute left-0 top-0 h-full w-full opacity-0">
                  <ConnectButton t={t} />
                </div>
              </div>
            )}
          </>
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
              <span>
                {lang === Lang.EN
                  ? `${v.name} on ${moment(v.stakeTime).format('DD/MM/yyyy')}`
                  : `${moment(v.stakeTime).format('yyyy年MM月DD日')}抵押${v.name}`}
              </span>
            </div>
            <div className="my-[1rem] flex justify-between pl-[1.25rem]">
              <div className="flex h-[2.5rem] w-[calc((100%-2rem)/2)] items-center justify-between rounded-r-[1.25rem] border border-neutral-light-gray bg-neutral-off-white pr-[.9375rem]">
                <div className="flex-center relative left-[-1.25rem] h-[2.5rem] w-[2.5rem] rounded-[50%] bg-yellow-primary">
                  <div className="flex-center body-l h-[2rem] w-[2rem] rounded-[50%] bg-yellow-light">🚀</div>
                </div>
                <span>{`${separationNumber(v.reward)}`}</span>
              </div>

              <div className="flex h-[2.5rem] w-[calc((100%-2rem)/2)]   items-center justify-between rounded-r-[1.25rem] border border-neutral-light-gray bg-neutral-off-white pr-[.9375rem]">
                <div className="flex-center relative left-[-1.25rem] h-[2.5rem] w-[2.5rem] rounded-[50%] bg-neutral-light-gray">
                  <div className="flex-center body-l h-[2rem] w-[2rem] rounded-[50%] bg-neutral-off-white text-neutral-medium-gray">
                    <MdOutlineAccessTimeFilled size={24} />
                  </div>
                </div>
                <span>{`${v.duration}${t('d')}`}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="relative">
                <div
                  className="underline-l body-m cursor-pointer text-neutral-rich-gray"
                  onClick={() => {
                    setFule(v);
                    setModalName(ModalName.UNSTAKE);
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
              onClick={() => setModalName(ModalName.STAKE)}
            >
              {t('stake')} ${launchInfo.symbol}
            </Button>
          ) : (
            <div className="relative mt-[.75rem] h-[3rem]  w-[10.3125rem]">
              <Button
                type="primary"
                className="button-text-m mt-[.75rem] h-[3rem] w-[10.3125rem] p-0 uppercase text-neutral-black"
              >
                {t('stake')} ${launchInfo.symbol}
              </Button>
              <div className="absolute left-0 top-0 h-full w-full opacity-0">
                <ConnectButton t={t} />
              </div>
            </div>
          )}
        </div>
      )}

      <StakeModal open={modalName === ModalName.STAKE} onClose={() => setModalName(ModalName.EMPTY)} />
      <UnstakeModal
        open={modalName === ModalName.UNSTAKE}
        onClose={() => setModalName(ModalName.EMPTY)}
        fule={fule as FuelInfo}
      />
    </div>
  );
};

export default StakeFuel;
