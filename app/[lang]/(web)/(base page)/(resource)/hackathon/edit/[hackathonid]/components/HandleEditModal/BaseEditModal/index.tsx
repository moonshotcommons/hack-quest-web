import Title from '../../Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import { HackathonEditContext, HackathonEditModalType } from '../../../constants/type';

interface BaseEditModalProp {
  hackathon: HackathonType;
}

const BaseEditModal: React.FC<BaseEditModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { modalType, setModalType } = useContext(HackathonEditContext);
  const renderContent = () => {
    switch (modalType) {
      case HackathonEditModalType.INFO:
        return null;
      case HackathonEditModalType.TIMELINE:
        return null;
      case HackathonEditModalType.REWARDS:
        return null;
      case HackathonEditModalType.JUDGING:
        return null;
      case HackathonEditModalType.APPLICATION:
        return null;
      case HackathonEditModalType.SUBMISSION:
        return null;
      case HackathonEditModalType.LINKS:
        return null;
    }
  };
  return (
    <div>
      <div className="px-[40px]">
        <Title title={`hackathonDetail.${modalType}`} />
      </div>
      <div className="scroll-wrap-y  flex-1 px-[40px]">{renderContent()}</div>
    </div>
  );
};

export default BaseEditModal;
