import React from 'react';
import IconCoin from '@/public/images/mission-center/icon_coin_new.svg';
import { useShallow } from 'zustand/react/shallow';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import Image from 'next/image';
import MenuLink from '@/constants/MenuLink';
import { useRedirect } from '@/hooks/router/useRedirect';

interface CoinXpProp {}

const CoinXp: React.FC<CoinXpProp> = () => {
  const { redirectToUrl } = useRedirect();
  const { userLevel, userCoin } = useMissionCenterStore(
    useShallow((state) => ({
      userLevel: state.userLevel,
      userCoin: state.userCoin
    }))
  );
  return (
    <div className="flex-row-center body-s" onClick={() => redirectToUrl(MenuLink.MISSION_CENTER)}>
      <div className="flex-row-center mr-5 h-full justify-between gap-2.5 rounded-full bg-neutral-off-white pr-4">
        <Image src={IconCoin} width={30} height={30} alt="iconCredits" />
        <span>{userCoin.coin}</span>
      </div>
      <div className="relative inline-flex h-[1.875rem] w-[7.5rem] items-center justify-center overflow-hidden rounded-full bg-neutral-off-white pl-5">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-yellow-primary"
          style={{
            width: `${(userLevel.expCurrentLevel / userLevel.expNextLevel) * 100}%`
          }}
        />
        <span className="z-10 text-neutral-off-black">Lvl {userLevel.level}</span>
      </div>
    </div>
  );
};

export default CoinXp;
