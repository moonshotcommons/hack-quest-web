import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useMemo, useRef } from 'react';
import RemoveSectionModal, { RemoveSectionModalRef } from '../../RemoveSectionModal';
import { HackathonEditContext, HackathonEditModalType } from '../../../../constants/type';
import { HackathonInfoSPKeys, HackathonType } from '@/service/webApi/resourceStation/type';
import Button from '@/components/Common/Button';

interface CommonButtonProp {
  hackathon: HackathonType;
  handleSave: VoidFunction;
  cantSubmit: boolean;
}

const CommonButton: React.FC<CommonButtonProp> = ({ hackathon, handleSave, cantSubmit }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);
  const { modalType, setModalType, loading } = useContext(HackathonEditContext);
  const info = useMemo(() => {
    return hackathon.info?.[modalType as HackathonInfoSPKeys | 'schedule' | 'faqs'] || {};
  }, [hackathon, modalType]);
  return (
    <>
      <div
        className={`flex w-full items-center  px-[40px] ${info.list?.length > 0 ? 'justify-between' : 'justify-end'}`}
      >
        {info.list?.length > 0 && (
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
            {t(modalType !== 'schedule' ? 'handleButtonText.save' : 'confirm')}
          </Button>
        </div>
      </div>
      <RemoveSectionModal ref={removeSectionRef} type={modalType} />
    </>
  );
};

export default CommonButton;
