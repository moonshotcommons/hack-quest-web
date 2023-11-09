import { MenuLink, NavbarListType } from './type';

export const navbarList: NavbarListType[] = [
  {
    label: 'Learn',
    id: 'learn',
    menu: [
      {
        label: 'DASHBOARD',
        path: MenuLink.HOME
      },
      {
        label: 'LEARNING TRACK',
        path: MenuLink.LEARNING_TRACK
      },
      {
        label: 'ELECTIVES',
        path: MenuLink.ELECTIVES
      }
    ]
  },
  {
    label: 'Missions',
    id: 'missions',
    menu: [
      {
        label: 'CENTER',
        path: MenuLink.MISSION_CENTER
      }
    ]
  },
  {
    label: 'Hackathon',
    id: 'Resources',
    menu: [
      {
        label: 'HACKATHON',
        path: MenuLink.HACKATHON
      }
    ]
  },
  {
    label: 'Campaigns',
    id: 'Campaigns',
    menu: [
      {
        label: 'XXXX',
        path: MenuLink.CAMPAIGINS
      }
    ]
  }
];
