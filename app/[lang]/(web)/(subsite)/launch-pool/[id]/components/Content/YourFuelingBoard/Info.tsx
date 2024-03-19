import { useUserStore } from '@/store/zustand/userStore';
import React, { useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import { separationNumber } from '@/helper/utils';
import Button from '@/components/Common/Button';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';

interface InfoProp {}

const Info: React.FC<InfoProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  return (
    <div className="body-l relative overflow-hidden rounded-[16px] border border-neutral-light-gray bg-neutral-white px-[40px] py-[32px]">
      {/* <LockMask text="1111" /> */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="relative h-[74px] w-[74px] overflow-hidden rounded-[50%]">
            <Image
              src={userInfo?.avatar as string}
              alt="avatar"
              fill
              className="object-cover"
            ></Image>
          </div>
          <p className="mt-[8px] text-neutral-black">{userInfo?.nickname}</p>
        </div>
        <div className="flex-1 border-r border-neutral-light-gray text-center">
          <p className="text-h2 text-neutral-off-black">{`${separationNumber(24299)}`}</p>
          <p className="mt-[22px] text-neutral-medium-gray">{t('totalFuel')}</p>
        </div>
        <div className="flex-1 border-r border-neutral-light-gray text-center">
          <p className="text-h2 text-neutral-off-black">{`#${95}`}</p>
          <p className="mt-[22px] text-neutral-medium-gray">{t('fuelRank')}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-h2 text-neutral-off-black">{`${22} #HQT`}</p>
          <p className="mt-[22px] text-neutral-medium-gray">
            {t('finalTokenShare')}
          </p>
        </div>
      </div>
      <div className="mt-[24px] flex justify-center">
        <Button type="primary" className="h-[60px] w-[270px] uppercase">
          claim token
        </Button>
      </div>
    </div>
  );
};

export default Info;
