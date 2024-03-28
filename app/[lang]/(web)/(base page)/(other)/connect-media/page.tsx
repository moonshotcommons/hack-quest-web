'use client';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import React from 'react';
import Image from 'next/image';
import Loading from '@/public/images/other/loading.png';
import { ThirdPartyMediaType } from '@/helper/thirdPartyMedia';
import { errorMessage } from '@/helper/ui';

interface ConnectGithubProp {}
// https://www.dev.hackquest.io/en/connect-media?type=twitter&state=state&code=RFpCaVFOQTlXVjItdjdwQXdaNUpWT2JfRHhJVTE3TFppaG1yejFhWXc4Tlh5OjE3MTE1Mjg1MDY3OTE6MToxOmFjOjE
const ConnectGithub: React.FC<ConnectGithubProp> = () => {
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const hashQuery = new URLSearchParams(typeof window !== 'undefined' ? window.location.hash : '');
  const { data } = useRequest(async () => {
    switch (query.get('type')) {
      case ThirdPartyMediaType.DISCORD: {
        const tokenType = hashQuery.get('#token_type');
        const accessToken = hashQuery.get('access_token');
        if (!tokenType || !accessToken) {
          return;
        }
        try {
          const res = await webApi.userApi.linkDiscord(tokenType, accessToken);
          localStorage.setItem('linkDiscord', `${+new Date()}`);
          localStorage.setItem('linkDiscordData', JSON.stringify(res));
        } catch (e) {
          errorMessage(e);
        } finally {
          window.close();
        }
      }

      case ThirdPartyMediaType.TWITTER:
        const code = query.get('code');
        if (!code) {
          return;
        }
        try {
          const res = await webApi.userApi.connectTwitter(code);
          localStorage.setItem('linkTwitter', `${+new Date()}`);
          localStorage.setItem('linkTwitterData', JSON.stringify(res));
        } catch (err) {
          errorMessage(err);
        }

        break;
      default:
        break;
    }
  });

  return (
    <div className="flex-center fixed left-0 top-0 z-[9999] h-[100vh] w-[100vw] bg-neutral-white">
      <Image src={Loading} width={40} alt="loading" className="animate-spin object-contain opacity-100"></Image>
    </div>
  );
};

export default ConnectGithub;
