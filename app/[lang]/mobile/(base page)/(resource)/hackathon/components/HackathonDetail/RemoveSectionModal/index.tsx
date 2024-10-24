import React, { useContext, useState, forwardRef, useImperativeHandle } from 'react';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonEditContext } from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface RemoveSectionModalProp {
  type: string;
  title?: string;
}
export interface RemoveSectionModalRef {
  open: () => void;
}
const RemoveSectionModal = forwardRef<RemoveSectionModalRef, RemoveSectionModalProp>(({ title, type }, ref) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { updateHackathon } = useContext(HackathonEditContext);
  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      open() {
        setOpen(true);
      }
    };
  });
  return (
    <ConfirmModal
      open={open}
      onClose={() => setOpen(false)}
      onConfirm={() => {
        updateHackathon({
          data: {
            [type]: {}
          }
        });
      }}
    >
      {`${t('hackathonDetail.confirmRemove', {
        block: title || t(`hackathonDetail.${type}`)
      })}`}
    </ConfirmModal>
  );
});

RemoveSectionModal.displayName = 'RemoveSectionModal';

export default RemoveSectionModal;
