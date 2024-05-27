import Button from '@/components/Common/Button';
import Image from 'next/image';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useContext, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { ConnectType } from '@/service/webApi/user/type';
import message from 'antd/es/message';
import Link from 'next/link';
import { HACKQUEST_TWITTER } from '@/constants/links';

export interface TwitterConnectState {
  type: ConnectType.TWITTER;
  isConnect: boolean;
  connectInfo: {
    thirdPartyName: 'wallet';
    username: string;
    isFollow: boolean;
  };
}

interface ConnectTwitterProps<T> {
  refreshConnectState: () => Promise<unknown>;
  connectState: T;
}

const ConnectTwitter = <T,>(props: ConnectTwitterProps<T>) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);

  const { connectState: propConnectState, refreshConnectState } = props;
  const connectState = propConnectState as TwitterConnectState;
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const { run: connectTwitter, loading: connectLoading } = useRequest(
    async () => {
      const res = await webApi.userApi.getConnectUrlByTwitter();
      window.open(res.url, '_blank', 'width=500,height=500,toolbar=no,menubar=no,location=no,status=no');
      return res;
    },
    {
      manual: true,
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const { run: refreshState, loading: refreshLoading } = useRequest(
    () => {
      return refreshConnectState();
    },
    {
      manual: true,
      onSuccess() {
        message.success('Connect Twitter success!');
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  useEffect(() => {
    const refreshDiscordConnect = (e: StorageEvent) => {
      if (e.key === 'linkTwitter') {
        refreshState();
      }
    };

    window.addEventListener('storage', refreshDiscordConnect);
    return () => {
      window.removeEventListener('storage', refreshDiscordConnect);
      window.localStorage.removeItem('linkTwitter');
      window.localStorage.removeItem('linkTwitterData');
    };
  }, [refreshConnectState, refreshState]);

  useEffect(() => {
    if (connectState.connectInfo.isFollow && intervalId) {
      clearInterval(intervalId);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId, connectState.connectInfo.isFollow, refreshConnectState]);

  return (
    <div className="flex flex-col gap-8 py-8">
      <h3 className="text-h3 text-neutral-rich-gray">{t('followHackquestTwitter', { hackquest: 'HACKQUEST' })}</h3>
      <div className="flex justify-between gap-8">
        <div className="flex flex-1 items-center gap-6 rounded-[16px] bg-neutral-off-white p-6">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24.435 2.53906H28.9329L19.1062 13.7704L30.6666 29.0537H21.6149L14.5253 19.7844L6.41318 29.0537H1.91249L12.4232 17.0405L1.33325 2.53906H10.6147L17.0231 11.0115L24.435 2.53906ZM22.8563 26.3614H25.3487L9.26044 5.08991H6.58587L22.8563 26.3614Z"
              fill="#131313"
            />
          </svg>
          <div className="flex flex-col gap-2">
            <p className="body-m-bold text-neutral-rich-gray">{t('authTwitterAccount')}</p>
            {!connectState.connectInfo.thirdPartyName && (
              <Button
                type="primary"
                className="button-text-s w-[140px] py-2 uppercase text-neutral-black "
                loading={refreshLoading || connectLoading}
                disabled={refreshLoading || connectLoading}
                onClick={connectTwitter}
              >
                {t('connect')}
              </Button>
            )}
            {connectState.connectInfo.thirdPartyName && (
              <div className="body-m-bold flex items-center gap-1 py-1 text-status-success-dark">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.4871 3.78628L5.82045 13.1196C5.6948 13.2551 5.51856 13.3323 5.33378 13.3329C5.15658 13.334 4.98626 13.2644 4.86045 13.1396L1.52712 9.80628C1.2657 9.54486 1.2657 9.12102 1.52712 8.85961C1.78853 8.59819 2.21237 8.59819 2.47378 8.85961L5.33378 11.7063L13.5138 2.87961C13.6707 2.68612 13.9224 2.59625 14.1663 2.64659C14.4103 2.69693 14.6058 2.87908 14.6733 3.11887C14.7408 3.35866 14.669 3.61607 14.4871 3.78628Z"
                    fill="#06884A"
                  />
                </svg>

                <span className="capitalize">{t('connected')}</span>
              </div>
            )}
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
            {!connectState.connectInfo.isFollow && (
              <Link href={HACKQUEST_TWITTER} target="_blank">
                <Button
                  type="primary"
                  className="button-text-s w-[140px] py-2 uppercase text-neutral-black"
                  onClick={() => {
                    if (!connectState.connectInfo.isFollow && !intervalId) {
                      const id = setInterval(() => {
                        refreshConnectState();
                      }, 2000);

                      setIntervalId(id);
                    }
                  }}
                >
                  {t('follow')}
                </Button>
              </Link>
            )}
            {connectState.connectInfo.isFollow && (
              <div className="body-m-bold flex items-center gap-1 py-1 text-status-success-dark">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.4871 3.78628L5.82045 13.1196C5.6948 13.2551 5.51856 13.3323 5.33378 13.3329C5.15658 13.334 4.98626 13.2644 4.86045 13.1396L1.52712 9.80628C1.2657 9.54486 1.2657 9.12102 1.52712 8.85961C1.78853 8.59819 2.21237 8.59819 2.47378 8.85961L5.33378 11.7063L13.5138 2.87961C13.6707 2.68612 13.9224 2.59625 14.1663 2.64659C14.4103 2.69693 14.6058 2.87908 14.6733 3.11887C14.7408 3.35866 14.669 3.61607 14.4871 3.78628Z"
                    fill="#06884A"
                  />
                </svg>

                <span className="capitalize">{t('followed')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectTwitter;
