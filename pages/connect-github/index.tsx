import webApi from '@/service';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import React from 'react';

interface ConnectGithubProp {}

const ConnectGithub: React.FC<ConnectGithubProp> = () => {
  const router = useRouter();
  const {} = useRequest(async () => {
    await webApi.userApi.linkGithub('896c8b89738c3bfc7c43');
  });
  return <div></div>;
};

export default ConnectGithub;
