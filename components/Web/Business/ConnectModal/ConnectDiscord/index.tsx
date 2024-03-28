'use client';
import Button from '@/components/Common/Button';
import Image from 'next/image';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useContext, useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { message } from 'antd';
import { ConnectType } from '@/service/webApi/user/type';
import { errorMessage } from '@/helper/ui';
import Link from 'next/link';
import { HACKQUEST_DISCORD } from '@/constants/links';

export interface TwitterConnectState {
  type: ConnectType.DISCORD;
  isConnect: boolean;
  connectInfo: {
    thirdPartyName: 'wallet';
    username: string;
    isJoin: boolean;
  };
}

interface ConnectDiscordProps<T> {
  refreshConnectState: () => Promise<unknown>;
  connectState: T;
}

const ConnectDiscord = <T,>(props: ConnectDiscordProps<T>) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);

  const { connectState: propConnectState, refreshConnectState } = props;
  const connectState = propConnectState as TwitterConnectState;
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  // const { data: discordInfo, refresh: refreshDiscordInfo } = useRequest(() => {
  //   return webApi.userApi.getDiscordInfo();
  // });

  const { run: connectDiscord, loading: connectLoading } = useRequest(
    async () => {
      const res = await webApi.userApi.getConnectUrlByDiscord();
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
        message.success('Connect discord success!');
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  useEffect(() => {
    const refreshDiscordConnect = (e: StorageEvent) => {
      if (e.key === 'linkDiscord') {
        refreshState();
      }
    };
    window.addEventListener('storage', refreshDiscordConnect);
    return () => {
      window.removeEventListener('storage', refreshDiscordConnect);
      window.localStorage.removeItem('linkDiscord');
      window.localStorage.removeItem('linkDiscordData');
    };
  }, [refreshState]);

  useEffect(() => {
    if (!connectState.connectInfo.isJoin && !intervalId) {
      const id = setInterval(() => {
        refreshConnectState();
      }, 2000);

      setIntervalId(id);
    }

    if (connectState.connectInfo.isJoin && intervalId) {
      clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId, connectState.connectInfo.isJoin, refreshConnectState]);

  return (
    <div className="flex flex-col gap-8 py-8">
      <h3 className="text-h3 text-neutral-rich-gray">{t('joinHackquestDiscord', { hackquest: 'HACKQUEST' })}</h3>
      <div className="flex justify-between gap-8">
        <div className="flex flex-1 items-center gap-6 rounded-[16px] bg-neutral-off-white p-6">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M27.0894 5.54142C25.0498 4.60557 22.8626 3.91609 20.5759 3.52119C20.5342 3.51357 20.4926 3.53261 20.4712 3.57071C20.1899 4.07099 19.8783 4.72366 19.6601 5.23665C17.2005 4.86842 14.7536 4.86842 12.3444 5.23665C12.1262 4.71225 11.8033 4.07099 11.5208 3.57071C11.4993 3.53388 11.4577 3.51484 11.4161 3.52119C9.13055 3.91482 6.94341 4.60431 4.90258 5.54142C4.88491 5.54903 4.86977 5.56174 4.85972 5.57824C0.711189 11.7761 -0.425267 17.8215 0.13224 23.7921C0.134763 23.8213 0.15116 23.8492 0.173864 23.867C2.91095 25.877 5.56228 27.0973 8.16437 27.9061C8.20602 27.9188 8.25014 27.9036 8.27664 27.8693C8.89217 27.0287 9.44086 26.1424 9.9113 25.2104C9.93906 25.1558 9.91256 25.091 9.85582 25.0694C8.98551 24.7393 8.1568 24.3368 7.35964 23.8797C7.29659 23.8428 7.29154 23.7527 7.34954 23.7095C7.5173 23.5838 7.68509 23.453 7.84527 23.3209C7.87425 23.2968 7.91464 23.2917 7.94871 23.307C13.1857 25.698 18.8554 25.698 24.0306 23.307C24.0647 23.2905 24.1051 23.2956 24.1353 23.3197C24.2955 23.4517 24.4633 23.5838 24.6323 23.7095C24.6903 23.7527 24.6865 23.8428 24.6235 23.8797C23.8263 24.3457 22.9976 24.7393 22.126 25.0682C22.0693 25.0898 22.044 25.1558 22.0718 25.2104C22.5523 26.1411 23.101 27.0274 23.7052 27.868C23.7304 27.9036 23.7758 27.9188 23.8175 27.9061C26.4322 27.0973 29.0835 25.877 31.8206 23.867C31.8446 23.8492 31.8597 23.8225 31.8622 23.7933C32.5294 16.8907 30.7447 10.8948 27.131 5.5795C27.1221 5.56174 27.107 5.54903 27.0894 5.54142ZM10.6934 20.1566C9.11666 20.1566 7.81751 18.7091 7.81751 16.9314C7.81751 15.1537 9.09147 13.7061 10.6934 13.7061C12.3078 13.7061 13.5944 15.1664 13.5692 16.9314C13.5692 18.7091 12.2952 20.1566 10.6934 20.1566ZM21.3263 20.1566C19.7497 20.1566 18.4505 18.7091 18.4505 16.9314C18.4505 15.1537 19.7244 13.7061 21.3263 13.7061C22.9408 13.7061 24.2274 15.1664 24.2022 16.9314C24.2022 18.7091 22.9408 20.1566 21.3263 20.1566Z"
              fill="#131313"
            />
          </svg>

          <div className="flex flex-col gap-2">
            <p className="body-m-bold text-neutral-rich-gray">{t('authDiscordAccount')}</p>
            {!connectState?.connectInfo.thirdPartyName && (
              <Button
                loading={refreshLoading || connectLoading}
                disabled={refreshLoading || connectLoading}
                type="primary"
                className="button-text-s w-[140px] py-2 uppercase text-neutral-black "
                onClick={connectDiscord}
              >
                {t('connect')}
              </Button>
            )}
            {connectState?.connectInfo.thirdPartyName && (
              <div className="body-m-bold flex items-center py-1 text-status-success-dark">
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
          <Image src={'/images/logo/hackquest_twitter_avatar.webp'} alt="hackquest Discord" width={48} height={48}></Image>
          <div className="flex flex-col gap-2">
            <p className="body-m-bold text-neutral-rich-gray">{t('joinHackquestDiscord', { hackquest: 'Hackquest' })}</p>
            {!connectState.connectInfo.isJoin && (
              <Link href={HACKQUEST_DISCORD} target="_blank">
                <Button type="primary" className="button-text-s w-[140px] py-2 uppercase text-neutral-black ">
                  {t('join')}
                </Button>
              </Link>
            )}
            {connectState.connectInfo.isJoin && (
              <div className="body-m-bold flex items-center gap-1 py-1 text-status-success-dark">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.4871 3.78628L5.82045 13.1196C5.6948 13.2551 5.51856 13.3323 5.33378 13.3329C5.15658 13.334 4.98626 13.2644 4.86045 13.1396L1.52712 9.80628C1.2657 9.54486 1.2657 9.12102 1.52712 8.85961C1.78853 8.59819 2.21237 8.59819 2.47378 8.85961L5.33378 11.7063L13.5138 2.87961C13.6707 2.68612 13.9224 2.59625 14.1663 2.64659C14.4103 2.69693 14.6058 2.87908 14.6733 3.11887C14.7408 3.35866 14.669 3.61607 14.4871 3.78628Z"
                    fill="#06884A"
                  />
                </svg>

                <span className="capitalize">{t('joined')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectDiscord;
