import Button from '@/components/Common/Button';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import BIcon from '@/public/images/campaigns/b_icon.png';
import webApi from '@/service';
import { TargetsType, TargetType } from '@/service/webApi/campaigns/type';
import { MantleContext } from '../../constants/type';
import { BurialPoint } from '@/helper/burialPoint';
import { useRedirect } from '@/hooks/router/useRedirect';
import MenuLink from '@/constants/MenuLink';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface TargetCardProp {
  target: TargetsType;
}
const TargetCard: React.FC<TargetCardProp> = ({ target }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const { redirectToUrl } = useRedirect();
  const { campaignsTargetClaim, refresh, claimIds } = useContext(MantleContext);
  const [unLoading, setUnLoading] = useState(false);
  const handleUnClaim = async (type: TargetType) => {
    switch (type) {
      case TargetType.COURSE:
        BurialPoint.track('campaigns targetCard Go to Dashboard 按钮点击');
        redirectToUrl(MenuLink.DASHBOARD);
        break;
      case TargetType.LEARNING_TRACK:
        BurialPoint.track('campaigns targetCard Go to Learning 按钮点击');
        redirectToUrl(MenuLink.LEARNING_TRACK);
        break;
      case TargetType.TWITTER:
        BurialPoint.track('campaigns targetCard Link with Twitter 按钮点击');
        setUnLoading(true);
        await webApi.campaignsApi.campaignsToUrl(target.campaignId, {
          targetIds: [target.id]
        });
        setUnLoading(false);
        refresh();
        window.open(target.extra?.url);
        break;
      case TargetType.DISCORD:
        BurialPoint.track('campaigns targetCard Join Discord 按钮点击');
        setUnLoading(true);
        await webApi.campaignsApi.campaignsToUrl(target.campaignId, {
          targetIds: [target.id]
        });
        setUnLoading(false);
        refresh();
        window.open(target.extra?.url);
        break;
      case TargetType.GIUHUB:
        BurialPoint.track('campaigns targetCard Go to Profile 按钮点击');
        redirectToUrl(MenuLink.USER_PROFILE);
        return 'Go to Profile';
    }
  };
  const renderUnText = (type: TargetType) => {
    switch (type) {
      case TargetType.COURSE:
        return t('goToDashboard');
      case TargetType.LEARNING_TRACK:
        return t('goToLearning');
      case TargetType.TWITTER:
        return t('linkWithTwitter');
      case TargetType.DISCORD:
        return t('joinDiscord');
      case TargetType.GIUHUB:
        return t('goToProfile');
    }
  };

  const targerClaim = () => {
    if (target.claimed) return;
    campaignsTargetClaim([target.id]);
  };
  return (
    <div
      key={target.id}
      className={`relative mt-[15px] h-[66px]  rounded-[8px] border ${
        target.completed
          ? 'border-yellow-dark bg-yellow-extra-light shadow-[0px_0px_4px_0px_#FFE866]'
          : 'border-neutral-medium-gray'
      }`}
    >
      <div
        className="absolute left-0 top-0 h-full rounded-[8px] bg-[rgba(255,244,206,0.4)]"
        style={{
          width: `${(target.progress[0] / target.progress[1]) * 100}%`
        }}
      ></div>
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between px-[24px] ">
        <div className="flex-row-center gap-[20px]">
          <span className="body-m text-neutral-black">{target.name}</span>
        </div>
        <div className="flex-row-center gap-[24px]">
          <div className="flex-row-center body-m h-[34px] w-[75px] gap-[10px] rounded-[100px] border border-neutral-light-gray bg-neutral-off-white px-[10px] leading-[40px] text-neutral-black">
            <Image src={BIcon} width={22} alt="icon" className=""></Image>
            <span>{target.reward}</span>
          </div>
          {target.completed ? (
            <Button
              type="primary"
              className={`button-text-s  h-[34px] w-[140px] uppercase text-neutral-black ${
                target.claimed ? 'cursor-not-allowed opacity-50 ' : ``
              }`}
              disabled={target.claimed}
              loading={claimIds.includes(target.id)}
              onClick={targerClaim}
            >
              {target.claimed ? t('claimed') : t('claim')}
            </Button>
          ) : (
            <Button
              ghost
              className={`button-text-s h-[34px] w-[140px]  border-neutral-black  p-0 uppercase text-neutral-black`}
              loading={unLoading}
              onClick={() => handleUnClaim(target.type)}
            >
              {renderUnText(target.type)}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TargetCard;
