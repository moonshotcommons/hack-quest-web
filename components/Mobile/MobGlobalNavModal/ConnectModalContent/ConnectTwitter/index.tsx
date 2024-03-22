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
    <div className="flex w-full flex-col gap-5 pt-5">
      <h3 className="text-h2-mob text-neutral-rich-gray">
        {t('followHackquestTwitter', { hackquest: 'HACKQUEST' })}
      </h3>

      <div className="flex w-full items-center gap-6 rounded-[16px] bg-neutral-off-white p-6">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.4337 10.5391H36.9317L27.105 21.7704L38.6654 37.0537H29.6137L22.5241 27.7844L14.412 37.0537H9.91127L20.4219 25.0405L9.33203 10.5391H18.6135L25.0219 19.0115L32.4337 10.5391ZM30.8551 34.3614H33.3475L17.2592 13.0899H14.5846L30.8551 34.3614Z"
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
      <div className="flex w-full items-center gap-6 rounded-[16px] bg-neutral-off-white p-6">
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
  );
};

export default ConnectTwitter;
