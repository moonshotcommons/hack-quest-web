'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import webApi from '@/service';

const ConnectMedia = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const hashQuery = new URLSearchParams(typeof window !== 'undefined' ? window.location.hash : '');

  async function authorizeWithDiscord(tokenType: string, accessToken: string) {
    try {
      await webApi.userApi.linkDiscord(tokenType, accessToken);
      window.opener.postMessage({ message: 'success', source: 'discord' }, '*');
      window.close();
    } catch (error) {
      window.opener.postMessage({ message: 'error', source: 'discord' }, '*');
      window.close();
    }
  }

  React.useEffect(() => {
    if (type === 'discord') {
      const tokenType = hashQuery.get('#token_type');
      const accessToken = hashQuery.get('access_token');
      if (tokenType && accessToken) {
        authorizeWithDiscord(tokenType, accessToken);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="flex-center fixed left-0 top-0 z-[9999] h-screen w-screen bg-neutral-white">
      <Spinner size={40} />
    </div>
  );
};

export default ConnectMedia;
