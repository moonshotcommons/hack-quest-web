import Title from '../../Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useMemo } from 'react';
import { HackathonEditContext, HackathonEditModalType } from '../../../../constants/type';
import { BasicInfoForm } from '@/components/hackathon-org/forms/basic-info';
import { RewardsForm } from '@/components/hackathon-org/forms/rewards';
import { SubmissionForm } from '@/components/hackathon-org/forms/submission';
import { LinksForm } from '@/components/hackathon-org/forms/links';
import { TimelineForm } from '@/components/hackathon-org/forms/timeline';
import { JudgingForm } from '@/components/hackathon-org/forms/judging';
import { ApplicationForm } from '@/components/hackathon-org/forms/application';

interface BaseEditModalProp {
  hackathon: HackathonType;
}

const BaseEditModal: React.FC<BaseEditModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { modalType, setModalType, refreshHackathon } = useContext(HackathonEditContext);
  const formProp = useMemo(() => {
    return {
      isEditMode: true,
      initialValues: hackathon,
      onSave: () => {
        refreshHackathon();
        setModalType(HackathonEditModalType.NULL);
      },
      onCancel: () => {
        setModalType(HackathonEditModalType.NULL);
      }
    };
  }, [hackathon]);
  const renderContent = () => {
    switch (modalType) {
      case HackathonEditModalType.INFO:
        return <BasicInfoForm {...formProp} />;
      case HackathonEditModalType.TIMELINE:
        return <TimelineForm {...formProp} />;
      case HackathonEditModalType.REWARDS:
        return <RewardsForm {...formProp} />;
      case HackathonEditModalType.JUDGE:
        return <JudgingForm {...formProp} />;
      case HackathonEditModalType.APPLICATION:
        return <ApplicationForm {...formProp} />;
      case HackathonEditModalType.SUBMISSION:
        return <SubmissionForm {...formProp} />;
      case HackathonEditModalType.LINKS:
        return <LinksForm {...formProp} />;
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
