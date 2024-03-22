import Button from '@/components/Common/Button';
import Image from 'next/image';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { FC, useContext } from 'react';

interface ConnectDiscordProps {}

const ConnectDiscord: FC<ConnectDiscordProps> = (props) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="flex flex-col gap-5 pt-5">
      <h3 className="text-h3 text-neutral-rich-gray">
        {t('joinHackquestDiscord', { hackquest: 'HACKQUEST' })}
      </h3>
      <div className="flex flex-1 items-center gap-6 rounded-[16px] bg-neutral-off-white p-6">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.0894 13.5414C33.0498 12.6056 30.8626 11.9161 28.5759 11.5212C28.5342 11.5136 28.4926 11.5326 28.4712 11.5707C28.1899 12.071 27.8783 12.7237 27.6601 13.2366C25.2005 12.8684 22.7536 12.8684 20.3444 13.2366C20.1262 12.7123 19.8033 12.071 19.5208 11.5707C19.4993 11.5339 19.4577 11.5148 19.4161 11.5212C17.1305 11.9148 14.9434 12.6043 12.9026 13.5414C12.8849 13.549 12.8698 13.5617 12.8597 13.5782C8.71119 19.7761 7.57473 25.8215 8.13224 31.7921C8.13476 31.8213 8.15116 31.8492 8.17386 31.867C10.9109 33.877 13.5623 35.0973 16.1644 35.9061C16.206 35.9188 16.2501 35.9036 16.2766 35.8693C16.8922 35.0287 17.4409 34.1424 17.9113 33.2104C17.9391 33.1558 17.9126 33.091 17.8558 33.0694C16.9855 32.7393 16.1568 32.3368 15.3596 31.8797C15.2966 31.8428 15.2915 31.7527 15.3495 31.7095C15.5173 31.5838 15.6851 31.453 15.8453 31.3209C15.8743 31.2968 15.9146 31.2917 15.9487 31.307C21.1857 33.698 26.8554 33.698 32.0306 31.307C32.0647 31.2905 32.1051 31.2956 32.1353 31.3197C32.2955 31.4517 32.4633 31.5838 32.6323 31.7095C32.6903 31.7527 32.6865 31.8428 32.6235 31.8797C31.8263 32.3457 30.9976 32.7393 30.126 33.0682C30.0693 33.0898 30.044 33.1558 30.0718 33.2104C30.5523 34.1411 31.101 35.0274 31.7052 35.868C31.7304 35.9036 31.7758 35.9188 31.8175 35.9061C34.4322 35.0973 37.0835 33.877 39.8206 31.867C39.8446 31.8492 39.8597 31.8225 39.8622 31.7933C40.5294 24.8907 38.7447 18.8948 35.131 13.5795C35.1221 13.5617 35.107 13.549 35.0894 13.5414ZM18.6934 28.1566C17.1167 28.1566 15.8175 26.7091 15.8175 24.9314C15.8175 23.1537 17.0915 21.7061 18.6934 21.7061C20.3078 21.7061 21.5944 23.1664 21.5692 24.9314C21.5692 26.7091 20.2952 28.1566 18.6934 28.1566ZM29.3263 28.1566C27.7497 28.1566 26.4505 26.7091 26.4505 24.9314C26.4505 23.1537 27.7244 21.7061 29.3263 21.7061C30.9408 21.7061 32.2274 23.1664 32.2022 24.9314C32.2022 26.7091 30.9408 28.1566 29.3263 28.1566Z"
            fill="#131313"
          />
        </svg>

        <div className="flex flex-col gap-2">
          <p className="body-m-bold text-neutral-rich-gray">
            {t('authDiscordAccount')}
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
          alt="hackquest Discord"
          width={48}
          height={48}
        ></Image>
        <div className="flex flex-col gap-2">
          <p className="body-m-bold text-neutral-rich-gray">
            {t('joinHackquestDiscord', { hackquest: 'Hackquest' })}
          </p>
          <Button
            type="primary"
            className="button-text-s w-[140px] py-2 uppercase text-neutral-black "
          >
            {t('join')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectDiscord;
