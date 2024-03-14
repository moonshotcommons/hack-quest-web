import { NavbarListType } from '../../BasePage/Navbar/type';
import { IntlEnum } from './type';

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
    value: IntlEnum.EN
  },
  {
    label: '简体中文',
    value: IntlEnum.ZH_CN
  }
];
