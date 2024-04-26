import MenuLink from '@/constants/MenuLink';
import { ReactNode } from 'react';

export interface OutSideType {
  label: string;
  link: string;
  id?: string;
}

export interface MenuType {
  label: string;
  path?: MenuLink;
  id?: string;
  link?: string;
  description?: string;
  needLogin?: boolean;
  needPC?: boolean;
  menu?: MenuType[];
  icon?: ReactNode;
  outSide?: boolean;
}
export interface NavbarListType {
  label: string;
  id: string;
  type?: 'outSide';
  menu: MenuType[];
}
