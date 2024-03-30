import Button from '@/components/Common/Button';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { FC, useContext } from 'react';
interface JoinedSuccessProps {
  onClose: VoidFunction;
}

const JoinedSuccess: FC<JoinedSuccessProps> = ({ onClose }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-6">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M57.3063 14.187C55.8162 11.9824 53.3273 10.663 50.6663 10.667H13.333C8.91473 10.667 5.33301 14.2487 5.33301 18.667V45.3337C5.33301 49.7519 8.91473 53.3337 13.333 53.3337H50.6663C55.0846 53.3337 58.6663 49.7519 58.6663 45.3337V18.667C58.6699 17.0715 58.1963 15.5113 57.3063 14.187ZM13.3327 16H50.666C51.432 16.001 52.1605 16.3312 52.666 16.9067L31.9994 28.9867L11.3594 16.88C11.8635 16.3214 12.5802 16.0018 13.3327 16ZM50.666 48.0006C52.1388 48.0006 53.3327 46.8067 53.3327 45.334V22.6406L34.666 33.5739C33.8558 34.044 32.936 34.2923 31.9993 34.2939C31.0651 34.3004 30.1455 34.0613 29.3327 33.6006L10.666 22.6406V45.334C10.666 46.8067 11.8599 48.0006 13.3327 48.0006H50.666Z"
            fill="#131313"
          />
        </svg>

        <h1 className="text-h3 flex gap-2 text-neutral-off-black">
          <span>{t('waitListJoined')}</span>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M28.9723 7.57334L11.6389 26.24C11.3876 26.511 11.0352 26.6655 10.6656 26.6667C10.3112 26.6687 9.97057 26.5296 9.71895 26.28L3.05228 19.6133C2.52945 19.0905 2.52945 18.2428 3.05228 17.72C3.57511 17.1972 4.42278 17.1972 4.94561 17.72L10.6656 23.4133L27.0256 5.76001C27.3394 5.37304 27.8428 5.19329 28.3307 5.29397C28.8186 5.39465 29.2097 5.75896 29.3447 6.23853C29.4797 6.71811 29.3361 7.23293 28.9723 7.57334Z"
              fill="#06884A"
            />
          </svg>
        </h1>
        <p className="body-l text-neutral-medium-gray">{t('waitListJoinedDesc')}</p>
      </div>
      <Button
        onClick={() => {
          onClose();
        }}
        block
        type="primary"
        className="
          button-text-l py-4 uppercase
          "
      >
        {t('close')}
      </Button>
    </div>
  );
};

export default JoinedSuccess;
