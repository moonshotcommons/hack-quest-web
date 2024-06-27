import MenuLink from '@/constants/MenuLink';
import { permanentRedirect } from 'next/navigation';
import React from 'react';
import { pressKitNavData } from './constants/data';

interface PressKitProp {}

const PressKit: React.FC<PressKitProp> = ({}) => {
  permanentRedirect(`${MenuLink.PRESS_KIT}/${pressKitNavData[0].id}`);
};

export default PressKit;
