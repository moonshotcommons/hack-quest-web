import React, { useContext, useMemo } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { Lang, TransNs } from '@/i18n/config';
import Modal from '@/components/Common/Modal';
import { FiX } from 'react-icons/fi';
import Button from '@/components/Common/Button';
import Image from 'next/image';
import FireIconActive from '@/public/images/mission-center/fire_icon_active.png';
import CoinIcon from '@/public/images/mission-center/coin_icon.png';

interface RestoreModalProp {
  open: boolean;
  onClose: VoidFunction;
}

const RestoreModal: React.FC<RestoreModalProp> = ({ open, onClose }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);

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

  const handleRestore = () => {};
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={true} icon={<FiX size={26} />}>
      <div className="flex w-[640px] flex-col items-center gap-[48px]  rounded-[16px] bg-neutral-white p-[48px]">
        <Image src={FireIconActive} alt={'fire-cover'} width={64} height={64} />
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
