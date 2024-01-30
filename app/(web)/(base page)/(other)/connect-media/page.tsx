'use client';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import React from 'react';
import Image from 'next/image';
import Loading from '@/public/images/other/loading.png';
import { ThirdPartyMediaType } from '@/helper/thirdPartyMedia';
import { errorMessage } from '@/helper/ui';

interface ConnectGithubProp {}

const ConnectGithub: React.FC<ConnectGithubProp> = () => {
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const hashQuery = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.hash : ''
  );
  const { data } = useRequest(async () => {
    switch (query.get('type')) {
      case ThirdPartyMediaType.DISCORD: {
        const tokenType = hashQuery.get('#token_type');
        const accessToken = hashQuery.get('access_token');
        if (!tokenType || !accessToken) {
          return;
        }
        try {
          debugger;
          const res = await webApi.userApi.linkDiscord(tokenType, accessToken);
          localStorage.setItem('linkDiscord', `${+new Date()}`);
          localStorage.setItem('linkDiscordData', JSON.stringify(res));
        } catch (e) {
          errorMessage(e);
        }
        window.close();
      }

      case 'disconnect':
        // await webApi.user.disconnectGithub();
        break;
      default:
        break;
    }
  });

  return (
    <div className="fixed w-[100vw] h-[100vh] bg-[#fff] left-0 top-0 z-[9999] flex-center">
      <Image
        src={Loading}
        width={40}
        alt="loading"
        className="object-contain animate-spin opacity-100"
      ></Image>
    </div>
  );
};

export default ConnectGithub;
