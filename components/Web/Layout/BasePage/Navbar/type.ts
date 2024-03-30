import MenuLink from '@/constants/MenuLink';

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
  outSide?: OutSideType[];
}
export interface NavbarListType {
  label: string;
  id: string;
  type?: 'outSide';
  menu: MenuType[];
}
