import { Lang } from '@/i18n/config';
import { NavbarListType } from '../../BasePage/Navbar/type';
import MenuLink from '@/constants/MenuLink';

export const navbarList: NavbarListType[] = [
  {
    label: 'Projects',
    id: 'projects',
    menu: [
      {
        label: '',
        link: `${MenuLink.LAUNCH}#all-projects`
      }
    ]
  },
  {
    label: 'FAQ',
    id: 'faq',
    menu: [
      {
        label: '',
        link: `${MenuLink.LAUNCH}#FAQ`
      }
    ]
  }
];

export const inltData = [
  {
    label: 'English',
    value: Lang.EN
  },
  {
    label: '简体中文',
    value: Lang.ZH
  }
];
