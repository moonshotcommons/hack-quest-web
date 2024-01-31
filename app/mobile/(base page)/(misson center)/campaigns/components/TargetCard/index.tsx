import Button from '@/components/Common/Button';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import BIcon from '@/public/images/campaigns/b_icon.png';
import webApi from '@/service';
import { TargetsType, TargetType } from '@/service/webApi/campaigns/type';
import { MantleContext } from '../../constants/type';
import { BurialPoint } from '@/helper/burialPoint';
import { useRedirect } from '@/hooks/useRedirect';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

interface TargetCardProp {
  target: TargetsType;
}
const TargetCard: React.FC<TargetCardProp> = ({ target }) => {
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
        return 'Go to Dashboard';
      case TargetType.LEARNING_TRACK:
        return 'Go to Learning';
      case TargetType.TWITTER:
        return 'Link with Twitter';
      case TargetType.DISCORD:
        return 'Join Discord';
      case TargetType.GIUHUB:
        return 'Go to Profile';
    }
  };

  const targerClaim = () => {
    if (target.claimed) return;
    campaignsTargetClaim([target.id]);
  };
  return (
    <div
      key={target.id}
      className={`relative mt-[15px] h-[82px]  rounded-[10px] border ${
        target.completed
          ? 'border-yellow-primary'
          : 'border-neutral-medium-gray'
      }`}
    >
      <div
        className="absolute left-0 top-0 h-full rounded-[10px] bg-[rgba(255,244,206,0.4)] opacity-40"
        style={{
          width: `${(target.progress[0] / target.progress[1]) * 100}%`
        }}
      ></div>
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between px-[30px] ">
        <div className="flex-row-center gap-[20px]">
          <span className="text-[16px] tracking-[0.32px]">{target.name}</span>
        </div>
        <div className="flex-row-center gap-[40px]">
          <div className="flex-row-center h-[44px] w-[75px] justify-between rounded-[100px] border border-neutral-light-gray bg-neutral-off-white px-[10px] text-[16px] leading-[40px] text-neutral-black">
            <Image src={BIcon} width={22} alt="icon" className=""></Image>
            <span>{target.reward}</span>
          </div>
          {target.completed ? (
            <Button
              className={`ml-[-20px] h-[44px] w-[164px] border-auth-primary-button-border-color
                          bg-auth-primary-button-bg
                          text-neutral-black ${
                            target.claimed
                              ? 'cursor-not-allowed opacity-50 '
                              : `hover:border-auth-primary-button-border-hover-color
                                  hover:bg-auth-primary-button-hover-bg
                                  hover:text-auth-primary-button-text-hover-color`
                          }`}
              loading={claimIds.includes(target.id)}
              onClick={targerClaim}
            >
              {target.claimed ? 'Claimed' : 'Claim'}
            </Button>
          ) : (
            <div className="relative">
              <Button
                className={`ml-[-20px] h-[44px] w-[164px] border border-neutral-black p-0
              text-[14px]  text-auth-primary-button-text-color
              text-neutral-black`}
                loading={unLoading}
                onClick={() => handleUnClaim(target.type)}
              >
                {renderUnText(target.type)}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TargetCard;
