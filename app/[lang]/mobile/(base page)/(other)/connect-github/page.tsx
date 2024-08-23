'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import webApi from '@/service';

const ConnectGithub = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  async function authorizeWithGitHub(code: string) {
    try {
      await webApi.userApi.linkGithub(code);
      window.opener.postMessage({ message: 'success', source: 'github' }, '*');
      window.close();
    } catch (error) {
      window.opener.postMessage({ message: 'error', source: 'github' }, '*');
      window.close();
    }
  }

  React.useEffect(() => {
    if (code) {
      authorizeWithGitHub(code);
    }
  }, [code]);

  return (
    <div className="flex-center fixed left-0 top-0 z-[9999] h-screen w-screen bg-neutral-white">
      <Spinner size={40} />
    </div>
  );
};

export default ConnectGithub;
