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
    label: 'navbar.home.title',
    id: 'home',
    menu: [
      {
        label: 'navbar.home.learner',
        path: MenuLink.DASHBOARD,
        needLogin: true
      }
      // {
      //   label: 'navbar.home.instructor',
      //   path: MenuLink.INSTRUCTOR,
      //   needLogin: true,
      //   needPC: true
      // }
    ]
  },
  {
    label: 'navbar.learn.title',
    id: 'learn',
    menu: [
      {
        label: 'navbar.learn.learningTrack',
        path: MenuLink.LEARNING_TRACK,
        description: 'navbar.learn.learningTrackDesc'
      },
      {
        label: 'navbar.learn.electives',
        path: MenuLink.ELECTIVES,
        description: 'navbar.learn.electivesDesc'
      },
      {
        label: 'navbar.learn.projects',
        path: MenuLink.PRACTICES,
        description: 'navbar.learn.projectsDesc'
      }
      // {
      //   label: 'navbar.learn.courseMarket',
      //   path: MenuLink.COURSE_MARKET,
      //   description: 'navbar.learn.courseMarketDesc'
      //   needPC: true
      // }
    ]
  },
  {
    label: 'navbar.reward.title',
    id: 'reward',
    menu: [
      {
        label: 'navbar.reward.mission',
        path: MenuLink.MISSION_CENTER,
        description: 'navbar.reward.missionDesc',
        needLogin: true,
        needPC: true
      },
      {
        label: 'navbar.reward.campaign',
        path: MenuLink.CAMPAIGINS,
        description: 'navbar.reward.campaignDesc',
        needLogin: true
      }
    ]
  },
  {
    label: 'navbar.resources.title',
    id: 'resource',
    menu: [
      {
        label: 'navbar.resources.hackathon',
        path: MenuLink.HACKATHON,
        description: 'navbar.resources.hackathonDesc'
      },
      {
        label: 'navbar.resources.blog',
        path: MenuLink.BLOG,
        description: 'navbar.resources.blogDesc'
      },
      {
        label: 'navbar.resources.glossary',
        path: MenuLink.GLOSSARY,
        description: 'navbar.resources.glossaryDesc'
      },
      {
        label: 'navbar.resources.advocate',
        path: MenuLink.ADVOCATE,
        description: 'navbar.resources.advocateDesc',
        needPC: true
      },
      {
        label: 'navbar.resources.events',
        path: MenuLink.EVENTS,
        description: 'navbar.resources.eventsDesc'
      },
      {
        label: 'navbar.resources.partners',
        path: MenuLink.PARTNERS,
        description: 'navbar.resources.partnersDesc'
      }
    ]
  },
  {
    label: 'navbar.launch.title',
    id: 'launch',
    menu: [
      {
        label: 'navbar.launch.title',
        path: MenuLink.LAUNCH
      }
    ]
  },
  {
    label: 'navbar.more.title',
    id: 'more',
    type: 'outSide',
    menu: [
      {
        label: 'navbar.more.tools',
        id: 'tools',
        outSide: [
          {
            label: 'navbar.more.playground',
            id: 'playground',
            link: process.env.IDE_URL || 'https://ide.dev.hackquest.io'
          }
        ]
      },
      {
        label: 'navbar.more.community',
        id: 'community',
        outSide: [
          {
            label: 'navbar.more.Discord',
            link: HACKQUEST_DISCORD
          },
          {
            label: 'navbar.more.Twitter',
            link: HACKQUEST_TWITTER
          },
          {
            label: 'navbar.more.Telegram',
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
