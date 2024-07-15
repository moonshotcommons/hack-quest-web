import MenuLink from '@/constants/MenuLink';
import { permanentRedirect } from 'next/navigation';
import React from 'react';

interface HackathonAuditPageProp {}

const HackathonAuditPage: React.FC<HackathonAuditPageProp> = ({}) => {
  permanentRedirect(`${MenuLink.HACKATHON_ORGANIZER}`);
};

export default HackathonAuditPage;
