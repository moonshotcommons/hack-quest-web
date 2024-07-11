import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import Modal from '@/components/Common/Modal';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import webApi from '@/service';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';
import { FiX } from 'react-icons/fi';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import CoinIcon from '@/public/images/mission-center/coin_icon.png';
import XpIcon from '@/public/images/mission-center/xp_icon.png';
import Loading from '@/components/Common/Loading';
import Lottie, { useLottie } from 'lottie-react';
import treasureJson from './constants/treasure.json';

export enum TreasureType {
  DIG = 'dig',
  NOT_DIG = 'not dig'
}
interface TreasureModalProp {}

export interface openParamType {
  treasureId?: string;
  treasureData?: {
    exp: number;
    coin: number;
  };
  digCallback?: VoidFunction;
}
export interface TreasureModalRef {
  open: (info: openParamType) => void;
}
const TreasureModal = forwardRef<TreasureModalRef, TreasureModalProp>((props, ref) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const [treasureContent, setTreasureContent] = useState({
    treasureExp: 0,
    treasureCoin: 0
  });
  const { updateMissionDataAll } = useGetMissionData();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { View } = useLottie({
    animationData: treasureJson,
    loop: true
  });
  const openTreasures = async (params: openParamType) => {
    const { treasureId, treasureData, digCallback } = params;
    let res = treasureData;
    if (treasureId) {
      setLoading(true);
      res = await webApi.missionCenterApi.openTreasures(treasureId);
    }
    setTreasureContent({
      treasureCoin: res?.coin ?? 0,
      treasureExp: res?.exp ?? 0
    });
    updateMissionDataAll();
    digCallback?.();
    setLoading(false);
    return res;
  };

  useImperativeHandle(ref, () => {
    return {
      open(params) {
        setOpen(true);
        openTreasures(params);
      }
    };
  });

  return (
    <Modal open={open} onClose={() => setOpen(false)} showCloseIcon={true} icon={<FiX size={26} color={'#000'} />}>
      <Loading loading={loading}>
        <div className="flex  min-h-[33.75rem] w-[30rem] flex-col items-center gap-[1rem] rounded-[1rem] bg-yellow-extra-light p-[1rem] pb-[2rem] wap:w-[90vw]">
          {!loading && (
            <>
              <Lottie animationData={treasureJson} loop={true} />
              <div className="flex flex-col items-center gap-[1rem]">
                <p className="body-xl-bold text-neutral-rich-gray">{t('treasureModalText')}</p>
                <div className="body-m-bold flex items-center gap-[2rem] text-neutral-off-black">
                  <div className="flex items-center gap-[.75rem]">
                    <Image src={CoinIcon} alt={'coin-icon'} width={32} height={32} />
                    <span>x {treasureContent.treasureCoin}</span>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <Image src={XpIcon} alt={'coin-icon'} width={32} height={32} />
                    <span>x {treasureContent.treasureExp}</span>
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                className="button-text-m h-[3rem] w-[266px] uppercase"
                onClick={() => setOpen(false)}
              >
                {t('collect')}
              </Button>
            </>
          )}
        </div>
      </Loading>
    </Modal>
  );
});

TreasureModal.displayName = 'TreasureModal';

export default TreasureModal;
