import React from 'react';
import IconCoin from '@/public/images/mission-center/icon_coin_new.png';
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
    <div className="flex-row-center h-[30px]" onClick={() => redirectToUrl(MenuLink.MISSION_CENTER)}>
      <div className="flex-row-center body-s mr-[20px] h-full justify-between gap-[10px] rounded-[20px] bg-neutral-off-white pr-[15px]">
        <Image src={IconCoin} width={30} alt="iconCredits" />
        <span>{userCoin.coin}</span>
      </div>
      <div className="h-full w-[170px] pl-[15px]">
        <div className="flex-center relative h-full w-full rounded-r-[20px]  bg-neutral-off-white ">
          <div
            className="absolute left-[0] top-[0] h-full rounded-r-[20px] bg-yellow-light"
            style={{
              width: `${(userLevel.expCurrentLevel / userLevel.expNextLevel) * 100}%`
            }}
          ></div>
          <div className="flex-row-center absolute h-full w-full justify-between pr-[15px] text-neutral-off-black">
            <div className="flex-center ml-[-15px] h-[30px] w-[30px] rounded-[50%] bg-yellow-primary">
              <div className="flex-center h-[24px] w-[24px] rounded-[50%] bg-yellow-dark ">{userLevel.level}</div>
            </div>
            <div className="flex-center flex-1 flex-shrink-0 ">{`${userLevel.expCurrentLevel}/${userLevel.expNextLevel}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinXp;
