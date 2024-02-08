import { MenuLink, NavbarListType } from './type';

export const navbarList: NavbarListType[] = [
  {
    label: 'Home',
    id: 'home',
    menu: [
      {
        label: 'Learner',
        path: MenuLink.DASHBOARD,
        needLogin: true
      }
      // {
      //   label: 'Instructor',
      //   path: MenuLink.INSTRUCTOR
      // }
    ]
  },
  {
    label: 'Learn',
    id: 'learn',
    menu: [
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
    label: 'Reward',
    id: 'reward',
    menu: [
      {
        label: 'Mission',
        path: MenuLink.MISSION_CENTER,
        needLogin: true,
        needPC: true
      },
      {
        label: 'Campaign',
        path: MenuLink.CAMPAIGINS,
        needLogin: true,
        needPC: true
      }
    ]
  },
  {
    label: 'Resource',
    id: 'resource',
    menu: [
      {
        label: 'Hackathon',
        path: MenuLink.HACKATHON,
        needPC: true
      },
      {
        label: 'Blog',
        path: MenuLink.BLOG
      }
      // {
      //   label: 'Glossary',
      //   path: MenuLink.GLOSSARY
      // }
    ]
  },
  {
    label: 'Advocate',
    id: 'advocate',
    menu: [
      {
        label: 'advocate',
        path: MenuLink.ADVOCATE
      }
    ],
    link: '/advocate',
    needPC: true
  },
  {
    label: 'Playground',
    id: 'playground',
    type: 'outSide',
    link: process.env.IDE_URL || 'https://ide.dev.hackquest.io',
    menu: [],
    needPC: true
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
