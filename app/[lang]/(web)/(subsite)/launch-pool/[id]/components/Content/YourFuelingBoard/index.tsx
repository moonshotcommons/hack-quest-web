import React, { useContext } from 'react';

import { titleTxtData } from '../../../constants/data';
import Info from './Info';
import StakeFuel from './StakeFuel';
import InvitationFuel from './InvitationFuel';
import TargetFuel from './TargetFuel';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';
import { LaunchDetailContext } from '../../../constants/type';
import { LaunchPoolProjectStatus } from '@/service/webApi/launchPool/type';

interface YourFuelingBoardProp {}

const YourFuelingBoard: React.FC<YourFuelingBoardProp> = () => {
  const { launchInfo } = useContext(LaunchDetailContext);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);

  const statusRender = () => {
    switch (launchInfo.status) {
      case LaunchPoolProjectStatus.ALLOCATION:
        return {
          titleDesc: launchInfo.participateInfo?.isParticipate ? <p>{t('lockFuel')}</p> : null
        };
      case LaunchPoolProjectStatus.AIRDROP:
        return {
          titleDesc: launchInfo.participateInfo?.isParticipate ? <p>{t('fuelCongratulations')}</p> : null
        };
      default:
        return null;
    }
  };
  return (
    <div className="relative overflow-hidden">
      <p className="text-h3 text-neutral-off-black">{t(titleTxtData[2])}</p>
      <p className="body-l my-[24px] text-neutral-black">{statusRender()?.titleDesc}</p>
      <Info />
      {launchInfo.status === LaunchPoolProjectStatus.FUELING && launchInfo.participateInfo?.isParticipate && (
        <>
          <StakeFuel />
          <InvitationFuel />
          <TargetFuel />
        </>
      )}
    </div>
  );
};

export default YourFuelingBoard;
