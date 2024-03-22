import Button from '@/components/Common/Button';
import Image from 'next/image';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { FC, useContext } from 'react';

interface ConnectTwitterProps {}

const ConnectTwitter: FC<ConnectTwitterProps> = (props) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="flex flex-col gap-8 py-8">
      <h3 className="text-h3 text-neutral-rich-gray">
        {t('followHackquestTwitter', { hackquest: 'HACKQUEST' })}
      </h3>
      <div className="flex justify-between gap-8">
        <div className="flex flex-1 items-center gap-6 rounded-[16px] bg-neutral-off-white p-6">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.435 2.53906H28.9329L19.1062 13.7704L30.6666 29.0537H21.6149L14.5253 19.7844L6.41318 29.0537H1.91249L12.4232 17.0405L1.33325 2.53906H10.6147L17.0231 11.0115L24.435 2.53906ZM22.8563 26.3614H25.3487L9.26044 5.08991H6.58587L22.8563 26.3614Z"
              fill="#131313"
            />
          </svg>
          <div className="flex flex-col gap-2">
            <p className="body-m-bold text-neutral-rich-gray">
              {t('authTwitterAccount')}
            </p>
            <Button
              type="primary"
              className="button-text-s w-[140px] py-2 uppercase text-neutral-black "
            >
              {t('connect')}
            </Button>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-6 rounded-[16px] bg-neutral-off-white p-6">
          <Image
            src={'/images/logo/hackquest_twitter_avatar.webp'}
            alt="hackquest twitter"
            width={48}
            height={48}
          ></Image>
          <div className="flex flex-col gap-2">
            <p className="body-m-bold text-neutral-rich-gray">
              {t('followHackquestTwitter', { hackquest: 'Hackquest' })}
            </p>
            <Button
              type="primary"
              className="button-text-s w-[140px] py-2 uppercase text-neutral-black "
            >
              {t('follow')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectTwitter;
