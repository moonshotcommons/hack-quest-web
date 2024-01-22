import { MenuLink, NavbarListType } from './type';

export const navbarList: NavbarListType[] = [
  {
    label: 'Learn',
    id: 'learn',
    menu: [
      {
        label: 'Dashboard',
        path: MenuLink.DASHBOARD,
        needLogin: true
      },
      {
        label: 'Learning Track',
        path: MenuLink.LEARNING_TRACK
      },

      {
        label: 'Electives',
        path: MenuLink.ELECTIVES
      },
      {
        label: 'Projects',
        path: MenuLink.PRACTICES
      }
    ]
  },
  {
    label: 'Missions',
    id: 'missions',
    menu: [
      {
        label: 'Missions',
        path: MenuLink.MISSION_CENTER,
        needLogin: true
      },
      {
        label: 'Campaigns',
        path: MenuLink.CAMPAIGINS,
        needLogin: true
      }
    ]
  },
  {
    label: 'Resources',
    id: 'Resources',
    menu: [
      {
        label: 'Hackathon',
        path: MenuLink.HACKATHON
      },
      {
        label: 'Blog',
        path: MenuLink.BLOG
      }
    ]
  },
  {
    label: 'Playground',
    id: 'playground',
    type: 'outSide',
    link: process.env.IDE_URL || 'https://ide.dev.hackquest.io',
    menu: []
  }
];

export const excludeLink = [MenuLink.USER_PROFILE];
export const needLoginPath = [
  MenuLink.DASHBOARD,
  MenuLink.MISSION_CENTER,
  MenuLink.CAMPAIGINS,
  MenuLink.USER_PROFILE
];

export const isBadgeIds = ['missions'];
