import MenuLink from '@/constants/MenuLink';
import { permanentRedirect } from 'next/navigation';
import React from 'react';
import { hackathonAuditNavData } from '../constants/data';

interface HackathonManageAliasProp {
  params: { alias: string };
}

const HackathonManageAlias: React.FC<HackathonManageAliasProp> = ({ params }) => {
  const { alias } = params;
  permanentRedirect(`${MenuLink.HACKATHON_MANAGER}/${alias}/${hackathonAuditNavData[0].id}`);
};

export default HackathonManageAlias;
