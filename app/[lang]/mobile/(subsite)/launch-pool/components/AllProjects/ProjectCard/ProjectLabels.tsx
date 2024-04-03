'use client';
import { LaunchPoolProjectType, LIVE_NOW_STATUS } from '@/service/webApi/launchPool/type';
import { FC, useContext } from 'react';

import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useChainInfo } from '@/hooks/contract/useChain';

export interface LabelWrapperProps {
  label: string;
  value: string;
}

export const LabelWrapper = ({ label, value }: LabelWrapperProps) => {
  return (
    <div className="flex min-w-[250px] max-w-[300px] flex-col gap-1">
      <span className="body-s inline-block w-[236px] max-w-[236px] text-neutral-rich-gray">{label}</span>
      <span className="body-m-bold inline-block uppercase text-neutral-black">{value}</span>
    </div>
  );
};

interface ProjectLabelsProps {
  project: LaunchPoolProjectType;
}

const ProjectLabels: FC<ProjectLabelsProps> = ({ project }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const chainInfo = useChainInfo(3441006);
  const status = project.status;

  return (
    <div className="flex flex-col gap-4">
      {LIVE_NOW_STATUS.includes(status) && (
        <LabelWrapper label={t('totalParticipatedUsers')} value={project.userCount.toLocaleString('en-US')} />
      )}
      {LIVE_NOW_STATUS.includes(status) && (
        <LabelWrapper label={t('totalFuel')} value={project.totalFuel.toLocaleString('en-US')} />
      )}
      <LabelWrapper label={t('projectToken')} value={`$${chainInfo?.symbol || 'ETH'}`} />
      <LabelWrapper
        label={t('totalAirdropAmount')}
        value={`${project.airdropRatio * 100}% / ${project.totalAirdropAmount.toLocaleString('en-US')} $${chainInfo?.symbol || 'ETH'}`}
      />
      {!LIVE_NOW_STATUS.includes(status) && (
        <LabelWrapper
          label={t('currentStakings')}
          value={`${project.currentStakings.toLocaleString('en-US')} $${chainInfo?.symbol || 'ETH'}`}
        />
      )}
    </div>
  );
};

export default ProjectLabels;
