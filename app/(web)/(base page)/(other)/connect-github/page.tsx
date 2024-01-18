'use client';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Loading from '@/public/images/other/loading.png';

interface ConnectGithubProp {}

const ConnectGithub: React.FC<ConnectGithubProp> = () => {
  const query = useSearchParams();
  const {} = useRequest(async () => {
    const code = query.get('code');
    if (code) {
      await webApi.userApi.linkGithub(code as string);
      localStorage.setItem('linkGitHub', `${+new Date()}`);
      window.close();
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
