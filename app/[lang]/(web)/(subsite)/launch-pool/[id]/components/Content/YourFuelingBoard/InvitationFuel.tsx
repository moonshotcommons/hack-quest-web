import { separationNumber } from '@/helper/utils';
import React, { useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';
import Image from 'next/image';
import { useUserStore } from '@/store/zustand/userStore';
import { FaUser } from 'react-icons/fa6';
import CopyIcon from '@/components/Common/Icon/Copy';
import InviteCodeIcon from '@/components/Common/Icon/InviteCodeIcon';
import message from 'antd/es/message';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';

interface InvitationFuelProp {}

const InvitationFuel: React.FC<InvitationFuelProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  const { userInfo } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo
    }))
  );
  return (
    <div className="mt-[24px]">
      <p className="body-l text-neutral-black">{t('invitationFuel')}</p>
      <div className="body-m mt-[16px] flex  justify-between gap-[40px] rounded-[16px] border border-neutral-light-gray bg-neutral-white px-[30px] py-[22px] text-neutral-black">
        <div className="flex flex-1 gap-[19px]">
          <div className="relative h-[40px] w-[40px] flex-shrink-0 overflow-hidden rounded-[50%]">
            <Image
              src={userInfo?.avatar as string}
              alt="avatar"
              fill
              className="object-cover"
            ></Image>
          </div>
          <div className="pt-[7px]">
            <p>{t('shareYourInviteCodetoEarnFuel')}</p>
            <p className="body-s text-neutral-medium-gray">
              {t('shareDescription')}
            </p>
          </div>
        </div>
        <div className="flex  h-full flex-shrink-0 flex-col justify-between gap-[20px]">
          <div className="flex items-center gap-[40px]">
            <div className="flex h-[40px] w-[145px] items-center justify-between rounded-r-[20px] border border-neutral-light-gray bg-neutral-off-white pr-[15px]">
              <div className="flex-center relative left-[-20px] h-[40px] w-[40px] rounded-[50%] bg-yellow-primary">
                <div className="flex-center body-l h-[32px] w-[32px] rounded-[50%] bg-yellow-light">
                  🚀
                </div>
              </div>
              <span>{`${separationNumber(500)}`}</span>
            </div>

            <div className="flex h-[40px] w-[145px] items-center justify-between rounded-r-[20px] border border-neutral-light-gray bg-neutral-off-white pr-[15px]">
              <div className="flex-center relative left-[-20px] h-[40px] w-[40px] rounded-[50%] bg-neutral-light-gray">
                <div className="flex-center body-l h-[32px] w-[32px] rounded-[50%] bg-neutral-off-white text-neutral-medium-gray">
                  <FaUser size={20} />
                </div>
              </div>
              <span>0 {t('inv')}</span>
            </div>
          </div>
          <div className="relative left-[-20px] flex h-[40px] w-[calc(100%+20px)] items-center justify-between rounded-[20px] border border-neutral-light-gray bg-neutral-off-white p-[15px]">
            <div className="body-s flex items-center gap-[5px] text-neutral-off-black">
              <InviteCodeIcon />
              <span>HJJKWERCS654982168</span>
            </div>
            <div
              className="caption-14pt flex cursor-pointer items-center gap-[6px] text-neutral-medium-gray"
              onClick={async (e) => {
                try {
                  await navigator.clipboard.writeText('1111');
                  message.success('Copy success!');
                } catch (e) {
                  message.warning(
                    'The browser version is too low or incompatible！'
                  );
                }
              }}
            >
              <CopyIcon
                width={17}
                height={21}
                color={'var(--neutral-light-gray)'}
              />
              <span>{t('copy')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationFuel;
