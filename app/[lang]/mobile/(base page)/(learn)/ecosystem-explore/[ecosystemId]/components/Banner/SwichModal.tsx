import Modal from '@/components/Common/Modal';
import React, { useContext } from 'react';
import SwitchCover from '@/public/images/learn/swtich_cover.png';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import Image from 'next/image';
import { useTranslation } from '@/i18n/client';
import Button from '@/components/Common/Button';
import { EcosystemDetailType } from '@/service/webApi/ecosystem/type';

interface SwitchModalProp {
  open: boolean;
  onClose: VoidFunction;
  handleSubmit: VoidFunction;
  ecosystem: EcosystemDetailType;
  loading: boolean;
}

const SwitchModal: React.FC<SwitchModalProp> = ({ open, onClose, handleSubmit, ecosystem, loading }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex w-full flex-col items-center gap-[1.25rem] rounded-[1rem] bg-neutral-white p-[1.25rem]">
        <div className="relative h-[3.75rem] w-[3.75rem] overflow-hidden">
          <Image src={SwitchCover} fill alt={'switch-cover'} className="object-cover" />
        </div>
        <div>
          <p className="body-l-bold text-center text-neutral-rich-gray">
            {t('explore.switchText', {
              ecosystem: ecosystem.info.name
            })}
          </p>
          <p className="body-s text-center text-neutral-medium-gray">{t('explore.swtichDesc')}</p>
        </div>

        <div className="flex w-full flex-col gap-[.75rem]">
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            className="button-text-m h-[3rem] w-full  uppercase "
          >
            {t('explore.add')}
          </Button>
          <Button ghost className="button-text-m h-[3rem] w-full  border-neutral-black uppercase " onClick={onClose}>
            {t('explore.cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SwitchModal;
