import React from 'react';
import { Lang } from '@/i18n/config';
import { useNeedPCRedirect } from '@/hooks/router/useNeedPCRedirect';

interface HackathonManageProp {
  params: { alias: string; manageNavId: string; lang: Lang };
}

const HackathonManage: React.FC<HackathonManageProp> = ({ params }) => {
  useNeedPCRedirect();
  return <></>;
};

export default HackathonManage;
