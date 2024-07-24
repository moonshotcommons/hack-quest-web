import React from 'react';
import { useNeedPCRedirect } from '@/hooks/router/useNeedPCRedirect';

interface HackathonManageAliasProp {
  params: { alias: string };
}

const HackathonManageAlias: React.FC<HackathonManageAliasProp> = ({ params }) => {
  useNeedPCRedirect();
  return <></>;
};

export default HackathonManageAlias;
