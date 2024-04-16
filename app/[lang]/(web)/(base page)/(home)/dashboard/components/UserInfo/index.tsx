'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { HiArrowLongRight } from 'react-icons/hi2';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { useUserStore } from '@/store/zustand/userStore';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { UserLearnedCountType } from '@/service/webApi/user/type';
import { separationNumber } from '@/helper/utils';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface UserInfoProp {}

const UserInfo: React.FC<UserInfoProp> = () => {
  const userInfo = useUserStore((state) => state.userInfo);

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);

  const { data: userCount = {} as UserLearnedCountType } = useRequest(async () => {
    const res = await webApi.userApi.getUserLearnedCount();
    return res;
  });
  return (
    <div>
      <div className="mb-[16px] rounded-[20px] bg-neutral-white p-[16px]">
        <div className="mb-[24px] flex items-center gap-[12px]">
          <div className="relative h-[60px] w-[60px] overflow-hidden rounded-[50%]">
            <Image src={userInfo?.avatar as string} alt="avatar" fill className="object-cover"></Image>
          </div>
          <div className="body-m-bold text-neutral-off-black">{userInfo?.nickname}</div>
        </div>
        <div className="flex justify-between p-[12px]">
          <div className="">
            <p className="caption-10pt mb-[8px] text-neutral-rich-gray">{t('dashboard.courseCompleted')}</p>
            <p className="body-xl text-neutral-off-black">{separationNumber(userCount.courseCount || 0)}</p>
          </div>
          <div className="">
            <p className="caption-10pt mb-[8px] text-neutral-rich-gray">{t('dashboard.certificationEarned')}</p>
            <p className="body-xl text-neutral-off-black">{separationNumber(userCount.certificationCount || 0)}</p>
          </div>
        </div>
      </div>
      <Link
        className="button-text-s flex cursor-pointer items-center  pl-[16px] text-neutral-off-black"
        href={MenuLink.USER_PROFILE}
      >
        <span className="uppercase">{t('dashboard.profile')}</span>
        <HiArrowLongRight size={18}></HiArrowLongRight>
      </Link>
    </div>
  );
};

export default UserInfo;
