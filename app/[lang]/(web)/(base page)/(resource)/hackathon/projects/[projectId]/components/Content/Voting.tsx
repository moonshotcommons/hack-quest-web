import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import Title from '../Title';
import { titleTxtData } from '../../../../constants/data';

interface VotingProp {
  project: ProjectType;
}

const Voting: React.FC<VotingProp> = ({ project }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex flex-col gap-[32px]">
      <Title title={t(titleTxtData[2])} />
    </div>
  );
};

export default Voting;
