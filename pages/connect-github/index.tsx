import webApi from '@/service';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import React from 'react';

interface ConnectGithubProp {}

const ConnectGithub: React.FC<ConnectGithubProp> = () => {
  const router = useRouter();
  const {} = useRequest(async () => {
    if (router.query.code) {
      await webApi.userApi.linkGithub(router.query.code as string);
    }
  });
  return <div></div>;
};

export default ConnectGithub;
