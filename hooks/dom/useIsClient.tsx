'use client';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};

export const ClientOnly: FC<PropsWithChildren> = (props) => {
  const isClient = useIsClient();
  if (!isClient) return null;
  return <>{props.children}</>;
};
