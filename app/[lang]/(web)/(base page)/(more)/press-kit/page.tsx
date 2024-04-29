import MenuLink from '@/constants/MenuLink';
import { permanentRedirect } from 'next/navigation';
import React from 'react';

interface PressKitProp {}

const PressKit: React.FC<PressKitProp> = ({}) => {
  permanentRedirect(`${MenuLink.PRESS_KIT}/about`);
};

export default PressKit;
