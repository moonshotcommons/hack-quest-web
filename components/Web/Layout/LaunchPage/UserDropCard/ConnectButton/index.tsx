import { FC } from 'react';
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { TFunction } from 'i18next';
import { AiOutlineWallet } from 'react-icons/ai';
interface ConnectButtonProps {
  t: TFunction;
}

const ConnectButton: FC<ConnectButtonProps> = ({ t }) => {
  return (
    <RainbowConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none'
              }
            })}
            className="w-full"
          >
            {(() => {
              if (!connected) {
                return (
                  // <button onClick={openConnectModal} type="button">
                  //   Connect Wallet
                  // </button>
                  <div
                    className="group mt-[8px] flex w-full cursor-pointer items-center gap-[12px] px-[30px] py-[12px] hover:bg-neutral-off-white"
                    onClick={openConnectModal}
                  >
                    <span>
                      <AiOutlineWallet size={24} />
                    </span>
                    <span> {t('connectWallet')}</span>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <div
                    className="group mt-[8px] flex w-full cursor-pointer items-center gap-[12px] px-[30px] py-[12px] hover:bg-neutral-off-white"
                    onClick={openChainModal}
                  >
                    <span>
                      <AiOutlineWallet size={24} />
                    </span>
                    <span> Wrong network</span>
                  </div>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  {/* <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}

                  <div
                    className="group mt-[8px] flex w-full cursor-pointer items-center gap-[12px] px-[30px] py-[12px] hover:bg-neutral-off-white"
                    onClick={openAccountModal}
                  >
                    <span>
                      <AiOutlineWallet size={24} />
                    </span>
                    <div className="flex flex-col">
                      <p>{account.displayName}</p>
                      <p className="body-xs hidden text-status-error-dark group-hover:block">{t('disConnect')}</p>
                    </div>
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''} */}
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};

export default ConnectButton;
// {true ? (
//   <span>{t('connectWallet')}</span>
// ) : (
//   <div>
//     <div className="flex items-center">
//       <span>0x238c...22b2</span>
//     </div>
//     <p className="body-xs hidden text-status-error-dark group-hover:block">
//       {t('disConnect')}
//     </p>
//   </div>
// )}
