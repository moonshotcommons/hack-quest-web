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
      className={`relative mt-[1rem] rounded-[.5rem] border px-[1.5rem] py-[1rem] ${
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
      <div>
        <p className="body-s text-neutral-black">{target.name}</p>
        <div className="flex-row-center mt-[.5rem] gap-[24px]">
          <div className="flex-row-center body-s h-[34px] w-[75px] gap-[10px] rounded-[100px] border border-neutral-light-gray bg-neutral-off-white px-[10px] leading-[40px] text-neutral-black">
            <Image src={BIcon} width={22} alt="icon" className=""></Image>
            <span>{target.reward}</span>
          </div>
          {target.completed ? (
            <Button
              type="primary"
              className={`button-text-s h-[34px] flex-1 uppercase text-neutral-black ${
                target.claimed ? 'cursor-not-allowed opacity-50 ' : ``
              }`}
              disabled={target.claimed}
              loading={claimIds.includes(target.id)}
              onClick={targerClaim}
            >
              {target.claimed ? 'Claimed' : 'Claim'}
            </Button>
          ) : (
            <Button
              ghost
              className={`button-text-s h-[34px] flex-1  border-neutral-black  p-0 uppercase text-neutral-black`}
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
