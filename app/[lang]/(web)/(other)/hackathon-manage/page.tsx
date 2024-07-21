import MenuLink from '@/constants/MenuLink';
import { permanentRedirect } from 'next/navigation';
import React from 'react';

interface HackathonManagePageProp {}

const HackathonManagePage: React.FC<HackathonManagePageProp> = ({}) => {
  permanentRedirect(`${MenuLink.HACKATHON_ORGANIZER}`);
};

export default HackathonManagePage;
