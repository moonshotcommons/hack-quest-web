import React, { useContext, useMemo, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { Lang, TransNs } from '@/i18n/config';
import Modal from '@/components/Common/Modal';
import { FiX } from 'react-icons/fi';
import Button from '@/components/Common/Button';
import Image from 'next/image';
import CoinIcon from '@/public/images/mission-center/coin_icon.png';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { message } from 'antd';
import { useGetMissionData } from '@/hooks/mission/useGetMissionData';

interface RestoreModalProp {
  open: boolean;
  onClose: VoidFunction;
}

const RestoreModal: React.FC<RestoreModalProp> = ({ open, onClose }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const [loading, setLoading] = useState(false);
  const { updateMissionDataAll } = useGetMissionData();
  const costTxt = useMemo(() => {
    switch (lang) {
      case Lang.EN:
        return (
          <>
            <span>This will cost 10</span>
            <Image src={CoinIcon} alt={'coin-icon'} width={20} height={20} />
            <span>each time</span>
          </>
        );
      default:
        return (
          <>
            <span>This will cost 10</span>
            <Image src={CoinIcon} alt={'coin-icon'} width={20} height={20} />
            <span>each time</span>
          </>
        );
    }
  }, [lang]);

  const handleRestore = () => {
    setLoading(true);
    webApi.missionCenterApi
      .restoreStreak()
      .then(() => {
        message.success('restore streak success');
        onClose();
        updateMissionDataAll();
      })
      .catch((err) => {
        errorMessage(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={true} icon={<FiX size={26} />}>
      <div className="flex w-[640px] flex-col items-center gap-[48px]  rounded-[16px] bg-neutral-white p-[48px]">
        <Image src={'/images/mission-center/fire_icon_active_.png'} alt={'fire-cover'} width={64} height={64} />
        <div>
          <h2 className="body-xl-bold text-neutral-rich-gray">{t('modalTitle')}</h2>
          <div className="body-m mt-[16px] flex flex-col items-center text-neutral-medium-gray">
            <p>{t('modalTxt')}</p>
            <div className="mt-[4px] flex items-center gap-[4px] ">{costTxt}</div>
          </div>
        </div>

        <div className="flex w-full gap-[12px]">
          <Button
            type="primary"
            loading={loading}
            className="button-text-m h-[48px] flex-1 flex-shrink-0 uppercase"
            onClick={handleRestore}
          >
            {t('restoreStreak')}
          </Button>
          <Button
            ghost
            className="button-text-m h-[48px] flex-1 flex-shrink-0 border-neutral-black uppercase "
            onClick={onClose}
          >
            {t('cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RestoreModal;
