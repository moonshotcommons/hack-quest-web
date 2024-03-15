import { Lang } from '@/i18n/config';
import { NavbarListType } from '../../BasePage/Navbar/type';

export const navbarList: NavbarListType[] = [
  {
    label: 'Projects',
    id: 'projects',
    menu: [
      {
        label: '',
        link: ''
      }
    ]
  },
  {
    label: 'FAQ',
    id: 'faq',
    menu: [
      {
        label: '',
        link: ''
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
