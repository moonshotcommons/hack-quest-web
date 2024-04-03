import { MotionProps } from 'framer-motion';
import { NavbarListType } from './type';
import { HACKQUEST_DISCORD, HACKQUEST_TELEGRAM, HACKQUEST_TWITTER } from '@/constants/links';
import MenuLink from '@/constants/MenuLink';

export const animateProps: MotionProps = {
  initial: { scaleY: 0, opacity: 0, translateY: '95%' },
  animate: {
    opacity: 1,
    scaleY: 1,
    translateY: '100%',
    position: 'absolute'
  },
  exit: {
    opacity: 1,
    scaleY: 1,
    translateY: '100%',
    position: 'absolute'
  },
  transition: { duration: 0.5, type: 'spring' },
  style: { originY: 0 }
};

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
      //   path: MenuLink.INSTRUCTOR,
      //   needLogin: true,
      //   needPC: true
      // }
    ]
  },
  {
    label: 'Learn',
    id: 'learn',
    menu: [
      {
        label: 'Learning Track',
        path: MenuLink.LEARNING_TRACK,
        description: 'Master a coding language'
      },
      {
        label: 'Electives',
        path: MenuLink.ELECTIVES,
        description: 'Focus on a Web 3 topic'
      },
      {
        label: 'Projects',
        path: MenuLink.PRACTICES,
        description: 'Learn how to build a project step by step'
      }
      // {
      //   label: 'Course Market',
      //   path: MenuLink.COURSE_MARKET,
      //   needPC: true
      // }
    ]
  },
  {
    label: 'Reward',
    id: 'reward',
    menu: [
      {
        label: 'Mission',
        path: MenuLink.MISSION_CENTER,
        description: 'Earn rewards on your Web 3 journey',
        needLogin: true,
        needPC: true
      },
      {
        label: 'Campaign',
        path: MenuLink.CAMPAIGINS,
        description: 'Become a certified builder',
        needLogin: true
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
        description: 'Explore hackathons and past projects'
      },
      {
        label: 'Blog',
        path: MenuLink.BLOG,
        description: 'View news, events, and study blogs'
      },
      {
        label: 'Glossary',
        path: MenuLink.GLOSSARY,
        description: 'Learn about Web 3 essential terms'
      }
    ]
  },
  {
    label: 'Advocate',
    id: 'advocate',
    menu: [
      {
        label: 'advocate',
        path: MenuLink.ADVOCATE,
        needPC: true
      }
    ]
  },
  {
    label: 'Launch',
    id: 'launch',
    menu: [
      // {
      //   label: 'launch pool',
      //   path: MenuLink.LAUNCH,
      // }
    ]
  },
  {
    label: 'More',
    id: 'more',
    type: 'outSide',
    menu: [
      {
        label: 'TOOLS',
        id: 'tools',
        outSide: [
          {
            label: 'Playground',
            id: 'playground',
            link: process.env.IDE_URL || 'https://ide.dev.hackquest.io'
          }
        ]
      },
      {
        label: 'COMMUNITY',
        id: 'community',
        outSide: [
          {
            label: 'Discord',
            link: HACKQUEST_DISCORD
          },
          {
            label: 'Twitter',
            link: HACKQUEST_TWITTER
          },
          {
            label: 'Telegram',
            link: HACKQUEST_TELEGRAM
          }
        ]
      }
    ]
  }
];

export const excludeLink = [MenuLink.USER_PROFILE];
export const needLoginPath = [MenuLink.DASHBOARD, MenuLink.MISSION_CENTER, MenuLink.CAMPAIGINS, MenuLink.USER_PROFILE];

export const isBadgeIds = ['missions'];
