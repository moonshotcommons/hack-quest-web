import MenuLink from '@/constants/MenuLink';

export interface MenuType {
  label: string;
  path: MenuLink;
}
export interface NavbarListType {
  label: string;
  id: string;
  type?: 'outSide';
  link?: string;
  menu: MenuType[];
}
