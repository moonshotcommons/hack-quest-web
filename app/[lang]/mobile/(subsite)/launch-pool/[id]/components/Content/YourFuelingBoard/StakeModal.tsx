import { LaunchDetailContext } from '@/app/[lang]/(web)/(subsite)/launch-pool/[id]/constants/type';
import Button from '@/components/Common/Button';
import CopyIcon from '@/components/Common/Icon/Copy';
import Modal from '@/components/Common/Modal';
import { LangContext } from '@/components/Provider/Lang';
import { separationNumber, truncateMiddle } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { message } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import { FiMinus, FiX } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';
import { useAccount, useBalance } from 'wagmi';

interface StakeModalProp {
  open: boolean;
  onClose: VoidFunction;
}

const StakeModal: React.FC<StakeModalProp> = ({ open, onClose }) => {
  const { launchInfo, loading, handleStake } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const account = useAccount();
  const [inputAmount, setInputAmount] = useState(0);
  const [inputDuration, setInputDuration] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const disable = useMemo(() => {
    return !(Number(inputAmount) > 0 && Number(inputDuration) > 0);
  }, [inputAmount, inputDuration]);

  const balance =
    useBalance({
      address: account.address
    }).data?.formatted || 0;
  const {} = useRequest(
    async () => {
      const res = await webApi.launchPoolApi.getCurrentPrice();
      return res;
    },
    {
      onSuccess(res) {
        setCurrentPrice(res?.usd || 0);
      }
    }
  );
  const onStake = () => {
    if (disable) return;
    handleStake(String(inputAmount));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseIcon={true}
      iconClassName="right-[1rem] top-[1rem]"
      icon={<FiX size={20} />}
    >
      <div className="h-[82vh] w-full rounded-[1.25rem] bg-neutral-white  py-[2.25rem]  text-neutral-black">
        <div className="scroll-wrap-y h-full w-full px-[1.5rem] ">
          <div className="">
            <div className="text-h3-mob text-center">
              {t('stake')} ${launchInfo.symbol}
            </div>
            <div className="mt-[1.25rem]">
              <div className="body-m flex flex-col gap-[1rem] text-neutral-medium-gray">
                <div className="flex justify-between">
                  <span>{t('yourWallet')}</span>
                  <div
                    className="flex cursor-pointer items-center gap-[.75rem] text-neutral-off-black"
                    onClick={async (e) => {
                      try {
                        await navigator.clipboard.writeText(account.address as string);
                        message.success('Copy success!');
                      } catch (e) {
                        message.warning('The browser version is too low or incompatible！');
                      }
                    }}
                  >
                    <span>{truncateMiddle(account.address as string)}</span>
                    <CopyIcon width={17} height={21} color={'var(--neutral-off-black)'} />
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>{t('token')}</span>
                  <span className="text-neutral-off-black">${launchInfo.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('blockchain')}</span>
                  <span className="text-neutral-off-black">Manta Network</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('stakeAmount')}</span>
                </div>
              </div>

              <div className="mt-[10px] flex items-center justify-between rounded-[1.5rem] border border-neutral-medium-gray px-[1.5rem] py-[.6875rem] text-neutral-off-black">
                <input
                  type="text"
                  className="body-m flex-1 border-none text-neutral-off-black outline-none"
                  value={inputAmount}
                  onChange={(e) => {
                    let value = e.target.value.replace(/^\D*(\d*(?:\.\d{0,})?).*$/g, '$1') as unknown;
                    if (Number(value) >= Number(balance)) value = balance;
                    setInputAmount(value as any);
                  }}
                />
                <span
                  className="underline-m"
                  onClick={() => {
                    setInputAmount(Number(balance));
                  }}
                >
                  {t('max')}
                </span>
              </div>
              <div className="body-xs text-neutral-medium-gray">
                <p className="mt-[.625rem]">{`${t('balance')}: ${balance} $${launchInfo.symbol}`}</p>
                <p className="mt-[.625rem]">{`${t('currentPrice')}: 1 $${launchInfo.symbol} = ${currentPrice} USD`} </p>
              </div>
            </div>
            <div className="text-neutral-medium-gray">
              <p className="body-m">{t('stakeDuration')}</p>
              <div className="body-m my-[.625rem] flex items-center gap-[.5rem] text-neutral-off-black">
                <span
                  onClick={() => {
                    if (inputDuration === 1) return;
                    setInputDuration((pre) => pre - 1);
                  }}
                >
                  <FiMinus size={24} />
                </span>
                <input
                  type="text"
                  value={inputDuration}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^(0+)|[^\d]+/g, '');
                    setInputDuration(value as any);
                  }}
                  className="h-[2.3125rem] w-[4.0625rem] rounded-[1.5rem] border border-neutral-medium-gray text-center  outline-none"
                />
                <span
                  onClick={() => {
                    setInputDuration((pre) => pre + 1);
                  }}
                >
                  <IoAddOutline size={24} />
                </span>
                <span className="ml-[.5rem]">{t('days')}</span>
              </div>
              <p className="body-xs">{t('stakeDurationDescription')}</p>
            </div>

            <div className="my-[1rem] h-[.0625rem] bg-neutral-light-gray"> </div>
            <div className="flex justify-between">
              <span className="body-m text-neutral-medium-gray">{t('estimatedFuel')}</span>
              <span className="body-m-bold"> {separationNumber(23799)} 🚀</span>
            </div>
            <div className="body-s mt-[16px] flex items-center justify-center gap-[8px] text-neutral-off-black">
              <div className="relative  cursor-pointer">
                {t('howToGet')} ${launchInfo.symbol}
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-yellow-primary"></div>
              </div>
              <IoIosArrowForward size={20} />
            </div>
            <p className="body-s mt-[1rem] text-center text-neutral-off-black"> {t('dontOut')}</p>

            <div className="flex justify-center gap-[10px]">
              <Button
                loading={loading}
                type="primary"
                disabled={disable}
                className="button-text-m mt-[24px] h-[2.875rem]  w-full uppercase"
                onClick={onStake}
              >
                {t('stakeNow')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StakeModal;
