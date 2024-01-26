import { MenuLink, NavbarListType } from './type';

export const dashBoard = {
  label: 'Home',
  path: MenuLink.DASHBOARD
};

export const navbarList: NavbarListType[] = [
  {
    label: 'Home',
    id: 'learn',
    menu: []
  },
  {
    label: 'Explore',
    id: 'explore',
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
    label: 'Rewards',
    id: 'rewards',
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

export const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 64px 64px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: 'circle(30px at -32px -32px)'
    // transition: {
    //   delay: 0.5,
    //   type: 'spring',
    //   stiffness: 400,
    //   damping: 40
    // }
  }
};

export const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export const isBadgeIds = ['missions'];
