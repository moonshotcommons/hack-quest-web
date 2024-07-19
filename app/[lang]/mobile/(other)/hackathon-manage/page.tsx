import { useNeedPCRedirect } from '@/hooks/router/useNeedPCRedirect';
import React from 'react';

interface HackathonManagePageProp {}

const HackathonManagePage: React.FC<HackathonManagePageProp> = ({}) => {
  useNeedPCRedirect();
  return <></>;
};

export default HackathonManagePage;
