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
      <div className="flex flex-col gap-8">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.98 10.64C41.8624 8.98653 39.9958 7.997 38 8.00001H10C6.68629 8.00001 4 10.6863 4 14V34C4 37.3137 6.68629 40 10 40H38C41.3137 40 44 37.3137 44 34V14C44.0027 12.8034 43.6475 11.6332 42.98 10.64ZM9.99953 12H37.9995C38.574 12.0007 39.1204 12.2484 39.4995 12.68L23.9995 21.74L8.51953 12.66C8.89765 12.241 9.43517 12.0013 9.99953 12ZM38 36.0005C39.1046 36.0005 40 35.105 40 34.0005V16.9805L26 25.1805C25.3923 25.533 24.7025 25.7192 24 25.7205C23.2993 25.7253 22.6096 25.546 22 25.2005L8 16.9805V34.0005C8 35.105 8.89543 36.0005 10 36.0005H38Z"
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
