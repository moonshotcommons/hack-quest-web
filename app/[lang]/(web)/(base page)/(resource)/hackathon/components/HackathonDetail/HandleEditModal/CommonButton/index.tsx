import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useRef } from 'react';
import RemoveSectionModal, { RemoveSectionModalRef } from '../../RemoveSectionModal';
import { HackathonEditContext, HackathonEditModalType } from '../../../../constants/type';
import Button from '@/components/Common/Button';

interface CommonButtonProp {
  handleSave: VoidFunction;
  cantSubmit: boolean;
  title?: string;
}

const CommonButton: React.FC<CommonButtonProp> = ({ handleSave, cantSubmit, title }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);
  const { modalType, setModalType, loading, modalEditType } = useContext(HackathonEditContext);
  return (
    <>
      <div
        className={`flex w-full items-center  px-[40px] ${modalEditType === 'edit' ? 'justify-between' : 'justify-end'}`}
      >
        {modalEditType === 'edit' && (
          <span
            className={`underline-m cursor-pointer text-neutral-off-black`}
            onClick={() => removeSectionRef.current?.open()}
          >
            {t('hackathonDetail.removeSection')}
          </span>
        )}
        <div className="flex gap-[16px]">
          <Button
            ghost
            className="h-[48px] w-[165px] uppercase"
            onClick={() => setModalType(HackathonEditModalType.NULL)}
          >
            {t('cancel')}
          </Button>
          <Button
            type="primary"
            disabled={cantSubmit}
            onClick={() => {
              if (cantSubmit) return;
              handleSave();
            }}
            loading={loading}
            className={`h-[48px] w-[165px] uppercase ${cantSubmit && 'bg-neutral-light-gray text-neutral-medium-gray'}`}
          >
            {t(modalType === 'schedule' ? 'confirm' : modalEditType === 'add' ? 'handleButtonText.save' : 'change')}
          </Button>
        </div>
      </div>
      <RemoveSectionModal title={title} ref={removeSectionRef} type={modalType} />
    </>
  );
};

export default CommonButton;
