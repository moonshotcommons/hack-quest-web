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
