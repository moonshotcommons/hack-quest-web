'use client';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import React from 'react';
import Image from 'next/image';
import Loading from '@/public/images/other/loading.png';

interface ConnectGithubProp {}

const ConnectGithub: React.FC<ConnectGithubProp> = () => {
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  const code = query.get('code');
  const {} = useRequest(async () => {
    if (code) {
      await webApi.userApi.linkGithub(code as string);
      localStorage.setItem('linkGitHub', `${+new Date()}`);
      window.close();
    }
  });
  return (
    <div className="flex-center fixed left-0 top-0 z-[9999] h-[100vh] w-[100vw] bg-neutral-white">
      <Image
        src={Loading}
        width={40}
        alt="loading"
        className="animate-spin object-contain opacity-100"
      ></Image>
    </div>
  );
};

export default ConnectGithub;
