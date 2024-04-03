import Button from '@/components/Common/Button';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { FC, useContext } from 'react';

interface ConnectWalletProps {}

const ConnectWallet: FC<ConnectWalletProps> = (props) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="flex h-full  flex-col gap-5 py-5">
      <h2 className="text-h2-mob text-neutral-off-black">{t('connectWallet')}</h2>
      <div className="flex flex-col gap-4 rounded-[16px] bg-neutral-off-white p-4">
        <svg width="59" height="34" viewBox="0 0 59 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M42.0595 33C50.8632 33 58 25.8366 58 17C58 8.16344 50.8632 1 42.0595 1C33.2557 1 26.1189 8.16344 26.1189 17C26.1189 25.8366 33.2557 33 42.0595 33Z"
            fill="white"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42.0605 28.5609C48.4217 28.5609 53.5785 23.3849 53.5785 16.9999C53.5785 10.615 48.4217 5.43896 42.0605 5.43896C35.6993 5.43896 30.5425 10.615 30.5425 16.9999C30.5425 23.3849 35.6993 28.5609 42.0605 28.5609Z"
            fill="#EDEDED"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 6"
          />
          <path
            d="M26.8019 2.15332H9.72293L1.18213 17.0001L9.72293 31.8469H26.8019L35.3427 17.0001L26.8019 2.15332Z"
            fill="white"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.0425 6.95068H12.4825L6.70117 17.0004L12.4825 27.0501H24.0425L29.8211 17.0004L24.0425 6.95068Z"
            fill="#FFE866"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 6"
          />
        </svg>
        <p className="body-m text-neutral-off-black">{t('connectWalletWarn')}</p>
      </div>

      <Button type="primary" className="button-text-m w-[165px] px-0 py-4 uppercase text-neutral-black">
        {t('connectWallet')}
      </Button>
    </div>
  );
};

export default ConnectWallet;
