import Button from '@/components/Common/Button';
import { FC } from 'react';

interface ConnectWalletProps {}

const ConnectWallet: FC<ConnectWalletProps> = (props) => {
  return (
    <div className="py-[64px]">
      <div className="flex justify-between gap-4 rounded-[16px] bg-neutral-off-white p-4">
        <p className="body-m">
          {`Warning：As we require you stake $Manta Token in order to get airdrop share, please use wallet that has $Manta asset so you don't have to transfer assets later.`}
        </p>
        <svg
          width="59"
          height="34"
          viewBox="0 0 59 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
      </div>
      <Button
        type="primary"
        className="button-text-l mt-[64px] px-[53px] py-4 uppercase text-neutral-black"
      >
        Connect wallet
      </Button>
    </div>
  );
};

export default ConnectWallet;