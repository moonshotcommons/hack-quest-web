import Button from '@/components/Common/Button';
import CopyIcon from '@/components/Common/Icon/Copy';
import Modal from '@/components/Common/Modal';
import { LangContext } from '@/components/Provider/Lang';
import { separationNumber, truncateMiddle } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { message } from 'antd';
import React, { useContext, useState, useMemo } from 'react';
import { FiMinus, FiX } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';
import { useAccount, useBalance } from 'wagmi';
import { LaunchDetailContext } from '../../../constants/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';

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
    return !(Number(inputAmount) > 0 && Number(inputDuration) > 0) || isNaN(inputAmount) || isNaN(inputDuration);
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
    handleStake(String(inputAmount), inputDuration);
  };

  const totalFule = useMemo(() => {
    const total = inputAmount * inputDuration * currentPrice;
    return isNaN(total) ? 0 : parseInt(String(total));
  }, [currentPrice, inputAmount, inputDuration]);

  return (
    <Modal open={open} onClose={onClose} showCloseIcon={true} icon={<FiX size={26} />}>
      <div className=" scroll-wrap-y max-h-[95vh] w-[808px] rounded-[10px] bg-neutral-white px-[137px]  pb-[40px] pt-[60px]  text-neutral-black">
        <div className="">
          <div className="text-h3 text-center">
            {t('stake')} ${launchInfo.symbol}
          </div>
          <div className="mt-[24px]">
            <div className="body-l flex flex-col gap-[16px] text-neutral-medium-gray">
              <div className="flex justify-between">
                <span>{t('yourWallet')}</span>
                <div
                  className="flex cursor-pointer items-center gap-[12px] text-neutral-off-black"
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

            <div className="mt-[10px] flex items-center justify-between rounded-[24px] border border-neutral-medium-gray px-[24px] py-[11px] text-neutral-off-black">
              <input
                type="text"
                value={inputAmount}
                onChange={(e) => {
                  let value = e.target.value.replace(/^(\d*(?:\.\d{0,18})?).*$/g, '$1') as unknown;

                  setInputAmount(value as any);
                }}
                className="body-l flex-1 border-none text-neutral-off-black outline-none"
              />
              <span
                className="underline-l cursor-pointer"
                onClick={() => {
                  setInputAmount(Number((balance as string).replace(/^(\d*(?:\.\d{0,18})?).*$/g, '$1')));
                }}
              >
                {t('max')}
              </span>
            </div>
            <div className="body-s text-neutral-medium-gray">
              <p className="mt-[10px]">{`${t('balance')}: ${balance} $${launchInfo.symbol}`}</p>
              <p className="mt-[10px]">{`${t('currentPrice')}: 1 $${launchInfo.symbol} = ${currentPrice} USD`} </p>
            </div>
          </div>
          <div className="text-neutral-medium-gray">
            <p className="body-l">{t('stakeDuration')}</p>
            <div className="body-m my-[10px] flex items-center gap-[8px] text-neutral-off-black">
              <span
                className="cursor-pointer"
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
                className="h-[48px] w-[68px] rounded-[24px] border border-neutral-medium-gray text-center  outline-none"
              />
              <span
                className="cursor-pointer"
                onClick={() => {
                  setInputDuration((pre) => pre + 1);
                }}
              >
                <IoAddOutline size={24} />
              </span>
              <span className="ml-[8px]">{t('days')}</span>
            </div>
            <p className="body-s">{t('stakeDurationDescription')}</p>
          </div>

          <div className="my-[16px] h-[1px] bg-neutral-light-gray"> </div>
          <div className="flex justify-between">
            <span className="body-l text-neutral-medium-gray">{t('estimatedFuel')}</span>
            <span className="body-l-bold text-ellipsis"> {separationNumber(totalFule)} 🚀</span>
          </div>
          <div className="body-m mt-[16px] flex items-center justify-center gap-[8px] text-neutral-off-black">
            <div className="relative  cursor-pointer">
              {t('howToGet')} ${launchInfo.symbol}
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-yellow-primary"></div>
            </div>
            <IoIosArrowForward size={20} />
          </div>
          <p className="body-m mt-[16px] text-center text-neutral-off-black"> {t('dontOut')}</p>

          <div className="flex justify-center gap-[10px]">
            <Button
              loading={loading}
              type="primary"
              disabled={disable}
              className="button-text-m mt-[24px] h-[48px]  w-[165px] uppercase"
              onClick={onStake}
            >
              {t('stakeNow')}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StakeModal;
