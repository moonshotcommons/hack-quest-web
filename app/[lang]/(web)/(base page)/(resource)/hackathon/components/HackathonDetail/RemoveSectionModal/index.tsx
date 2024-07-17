import React, { useContext, useState, forwardRef, useImperativeHandle } from 'react';
import { ConfirmModal } from '@/components/hackathon-org/modals/confirm-modal';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonEditContext } from '../../../constants/type';
import { customModalList } from '../../../constants/data';

interface RemoveSectionModalProp {
  type: string;
  title?: string;
}
export interface RemoveSectionModalRef {
  open: () => void;
}
const RemoveSectionModal = forwardRef<RemoveSectionModalRef, RemoveSectionModalProp>(({ type, title }, ref) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { updateHackathon, hackathonCustomDelete } = useContext(HackathonEditContext);
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
        if (customModalList.some((v) => v.value === type)) {
          hackathonCustomDelete();
        } else {
          updateHackathon({
            data: {
              [type]: {}
            },
            status: type
          });
        }
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
