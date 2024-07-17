import MenuLink from '@/constants/MenuLink';
import { permanentRedirect } from 'next/navigation';
import React from 'react';
import { hackathonAuditNavData } from '../constants/data';

interface HackathonAuditAliasProp {
  params: { alias: string };
}

const HackathonAuditAlias: React.FC<HackathonAuditAliasProp> = ({ params }) => {
  const { alias } = params;
  permanentRedirect(`${MenuLink.HACKATHON_AUDIT}/${alias}/${hackathonAuditNavData[0].id}`);
};

export default HackathonAuditAlias;
