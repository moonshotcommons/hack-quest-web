import Modal from '@/components/Common/Modal';
import React, { useContext } from 'react';
import { FiX } from 'react-icons/fi';
import SwitchCover from '@/public/images/learn/swtich_cover.png';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import Image from 'next/image';
import { useTranslation } from '@/i18n/client';
import Button from '@/components/Common/Button';

interface SwitchModalProp {
  open: boolean;
  onClose: VoidFunction;
  handleSubmit: VoidFunction;
}

const SwitchModal: React.FC<SwitchModalProp> = ({ open, onClose, handleSubmit }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={true} icon={<FiX size={26} />}>
      <div className="flex w-[640px] flex-col items-center gap-[32px] rounded-[16px] bg-neutral-white p-[48px]">
        <div className="relative h-[84px] w-[81px] overflow-hidden">
          <Image src={SwitchCover} fill alt={'switch-cover'} className="object-cover" />
        </div>
        <p className="body-xl-bold text-neutral-rich-gray">
          {t('explore.switchText', {
            ecosystem: 'ecosystem'
          })}
        </p>
        <p className="body-m text-center text-neutral-medium-gray">{t('explore.swtichDesc')}</p>
        <div className="flex w-full gap-[12px]">
          <Button
            type="primary"
            onClick={handleSubmit}
            className="button-text-m h-[48px] flex-1 flex-shrink-0 uppercase "
          >
            {t('explore.addEcosystem')}
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

export default SwitchModal;
