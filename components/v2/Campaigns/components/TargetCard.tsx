import Button from '@/components/v2/Common/Button';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import BIcon from '@/public/images/campaigns/b_icon.png';
import { useRouter } from 'next/router';
import webApi from '@/service';
import { TargetsType, TargetType } from '@/service/webApi/campagins/type';
import { MenuLink } from '../../Layout/Navbar/type';
import { MantleContext } from '../Mantle/type';
import { BurialPoint } from '@/helper/burialPoint';

interface TargetCardProp {
  target: TargetsType;
}
const TargetCard: React.FC<TargetCardProp> = ({ target }) => {
  const router = useRouter();
  const { campaignsTargetClaim, refresh, claimIds } = useContext(MantleContext);
  const [unLoading, setUnLoading] = useState(false);
  const handleUnClaim = async (type: TargetType) => {
    switch (type) {
      case TargetType.COURSE:
        BurialPoint.track('campaigns targetCard Go to Dashboard 按钮点击');
        router.push(MenuLink.HOME);
        break;
      case TargetType.LEARNING_TRACK:
        BurialPoint.track('campaigns targetCard Go to Learning 按钮点击');
        router.push(MenuLink.LEARNING_TRACK);
        break;
      case TargetType.TWITTER:
        BurialPoint.track('campaigns targetCard Link with Twitter 按钮点击');
        setUnLoading(true);
        const t = await webApi.campaigns.campaignsTwitter();
        setUnLoading(false);
        refresh();
        window.open(t.url);
        break;
      case TargetType.DISCORD:
        BurialPoint.track('campaigns targetCard Join Discord 按钮点击');
        setUnLoading(true);
        const d = await webApi.campaigns.campaignsDiscord();
        setUnLoading(false);
        refresh();
        window.open(d.url);
        break;
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
    }
  };
  return (
    <div
      key={target.id}
      className={`h-[82px] rounded-[10px] border  mt-[15px] relative ${
        target.completed ? 'border-[#ffd850]' : 'border-[#8C8C8C]'
      }`}
    >
      <div
        className="h-full bg-[rgba(255,244,206,0.4)] opacity-40 absolute left-0 top-0 rounded-[10px]"
        style={{
          width: `${(target.progress[0] / target.progress[0]) * 100}%`
        }}
      ></div>
      <div className="absolute w-full h-full left-0 top-0 flex justify-between items-center px-[30px] ">
        <div className="flex-row-center gap-[20px]">
          <span className="text-[16px] tracking-[0.32px]">{target.name}</span>
        </div>
        <div className="flex-row-center gap-[40px]">
          <div className="flex-row-center justify-between px-[10px] w-[75px] h-[44px] leading-[40px] text-[#000] text-[16px] border border-[#DADADA] bg-[#F4F4F4] rounded-[100px]">
            <Image src={BIcon} width={22} alt="icon" className=""></Image>
            <span>{target.reward}</span>
          </div>
          {target.completed ? (
            <Button
              className={`w-[164px] ml-[-20px] h-[44px] text-[#0b0b0b] 
                          bg-auth-primary-button-bg
                          border-auth-primary-button-border-color ${
                            target.claimed
                              ? 'opacity-50 cursor-not-allowed '
                              : `hover:border-auth-primary-button-border-hover-color
                                  hover:text-auth-primary-button-text-hover-color 
                                  hover:bg-auth-primary-button-hover-bg`
                          }`}
              loading={claimIds.includes(target.id)}
              onClick={() => campaignsTargetClaim([target.id])}
            >
              {target.claimed ? 'Claimed' : 'Claim'}
            </Button>
          ) : (
            <div className="relative">
              <Button
                className={`w-[164px] p-0 ml-[-20px] h-[44px] text-[14px] text-[#0b0b0b] 
              text-auth-primary-button-text-color  border
              border-[#0b0b0b]`}
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
