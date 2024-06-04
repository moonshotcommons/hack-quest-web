import React, { useContext } from 'react';
import { LoginResponse } from '@/service/webApi/user/type';
import { useShallow } from 'zustand/react/shallow';
import { useMissionCenterStore } from '@/store/zustand/missionCenterStore';
import { useUserStore } from '@/store/zustand/userStore';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { LuChevronRight } from 'react-icons/lu';
import RoleIcon from '@/public/images/mission-center/role_icon.png';
import Image from 'next/image';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { Progress } from '@/components/ui/progress';

export interface UserInfoType {}
const UserInfo: React.FC<UserInfoType> = ({}) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.REWARD);
  const userInfo = useUserStore((state) => state.userInfo as LoginResponse);
  const { userLevel } = useMissionCenterStore(
    useShallow((state) => {
      return {
        userLevel: state?.userLevel,
        userCoin: state?.userCoin,
        userTreasure: state?.userTreasure
      };
    })
  );
  return (
    <div className="flex items-center justify-between border-b border-dashed border-neutral-medium-gray pb-[40px] text-neutral-off-black">
      <div className="flex items-center gap-[24px]">
        <Image src={userInfo?.avatar} alt={userInfo?.nickname} width={96} height={96} />
        <div>
          <Link href={MenuLink.USER_PROFILE} className="flex items-center gap-[12px]">
            <span className="body-xl-bold text-neutral-off-black">{userInfo?.nickname}</span>
            <LuChevronRight size={30} className="text-neutral-off-black" />
          </Link>
          <div className="mt-[12px] flex items-center gap-[12px]">
            <div className="body-xs flex gap-[4px] rounded-[100px] border border-neutral-light-gray px-[8px] py-[4px] text-neutral-off-black">
              <Image src={RoleIcon} alt={'role-icon'} width={20} height={20} />
              <span className="capitalize">{`Hackquest ${userInfo?.voteRole.toLocaleLowerCase()}`}</span>
            </div>
            <Link href={MenuLink.ADVOCATE} className="text-[12px] text-neutral-off-black underline">
              {t('applyAdvocate')}
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[320px]">
        <div className="flex items-center justify-between">
          <span className="body-m-bold">{`${t('level')} ${userLevel?.level ?? 1}`}</span>
          <span className="body-s">{`${userLevel.expCurrentLevel}/${userLevel.expNextLevel}`}</span>
        </div>
        <div className="mt-[5px]">
          <Progress value={userLevel.expCurrentLevel ?? 0} max={userLevel.expNextLevel ?? 0} className="h-[12px]" />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
