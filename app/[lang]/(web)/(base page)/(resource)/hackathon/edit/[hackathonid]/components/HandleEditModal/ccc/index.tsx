import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import Title from '../../Title';

interface PartnersModalProp {
  hackathon: HackathonType;
}

const PartnersModal: React.FC<PartnersModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex w-full flex-col gap-[24px]">
      <Title title="hackathonDetail.partners" />
    </div>
  );
};

export default PartnersModal;
