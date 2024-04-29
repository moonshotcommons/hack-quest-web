import { MotionProps } from 'framer-motion';
import { NavbarListType } from './type';
import { HACKQUEST_DISCORD, HACKQUEST_TELEGRAM, HACKQUEST_TWITTER } from '@/constants/links';
import MenuLink from '@/constants/MenuLink';
import { FaDiscord, FaTelegram } from 'react-icons/fa6';
import TwitterXIcon from '@/components/Common/Icon/TwitterX';

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
        id: 'learner',
        label: 'navbar.home.learner',
        path: MenuLink.DASHBOARD,
        needLogin: true
      }
      // {
      //  id:'instructor',
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
        id: 'learningTrack',
        label: 'navbar.learn.learningTrack',
        path: MenuLink.LEARNING_TRACK,
        description: 'navbar.learn.learningTrackDesc'
      },
      {
        id: 'electives',
        label: 'navbar.learn.electives',
        path: MenuLink.ELECTIVES,
        description: 'navbar.learn.electivesDesc'
      },
      {
        id: 'projects',
        label: 'navbar.learn.projects',
        path: MenuLink.PRACTICES,
        description: 'navbar.learn.projectsDesc'
      }
      // {
      // id:'courseMarket',
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
        id: 'mission',
        label: 'navbar.reward.mission',
        path: MenuLink.MISSION_CENTER,
        description: 'navbar.reward.missionDesc',
        needLogin: true,
        needPC: true
      },
      {
        id: 'campaign',
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
        id: 'hackathon',
        label: 'navbar.resources.hackathon',
        path: MenuLink.HACKATHON,
        description: 'navbar.resources.hackathonDesc'
      },
      {
        id: 'blog',
        label: 'navbar.resources.blog',
        path: MenuLink.BLOG,
        description: 'navbar.resources.blogDesc'
      },
      {
        id: 'glossary',
        label: 'navbar.resources.glossary',
        path: MenuLink.GLOSSARY,
        description: 'navbar.resources.glossaryDesc'
      },
      {
        id: 'advocate',
        label: 'navbar.resources.advocate',
        path: MenuLink.ADVOCATE,
        description: 'navbar.resources.advocateDesc',
        needPC: true
      },
      {
        id: 'events',
        label: 'navbar.resources.events',
        path: MenuLink.EVENTS,
        description: 'navbar.resources.eventsDesc'
      }
      // {
      //id:'partners',
      //   label: 'navbar.resources.partners',
      //   path: MenuLink.PARTNERS,
      //   description: 'navbar.resources.partnersDesc'
      // }
    ]
  },
  {
    label: 'navbar.launch.title',
    id: 'launch',
    menu: [
      // {
      //id:'lanuch-pool',
      //   label: 'navbar.launch.title',
      //   path: MenuLink.LAUNCH
      // }
    ]
  },
  {
    label: 'navbar.more.title',
    id: 'more',
    menu: [
      {
        label: 'navbar.more.aboutUs',
        id: 'aboutUs',
        menu: [
          {
            id: 'pressKit',
            label: 'navbar.more.pressKit',
            path: MenuLink.PRESS_KIT
          },
          {
            id: 'docs',
            label: 'navbar.more.docs',
            link: `${MenuLink.DOCS}`
          }
        ]
      },
      {
        label: 'navbar.more.tools',
        id: 'tools',
        menu: [
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
        menu: [
          {
            id: 'discord',
            label: 'navbar.more.Discord',
            link: HACKQUEST_DISCORD,
            icon: <FaDiscord />,
            outSide: true
          },
          {
            id: 'twitter',
            label: 'navbar.more.Twitter',
            link: HACKQUEST_TWITTER,
            icon: <TwitterXIcon size={12} color="var(--neutral-rich-gray)" />,
            outSide: true
          },
          {
            id: 'telegram',
            label: 'navbar.more.Telegram',
            link: HACKQUEST_TELEGRAM,
            icon: <FaTelegram />,
            outSide: true
          }
        ]
      }
    ]
  }
];

export const excludeLink = [MenuLink.USER_PROFILE];
export const needLoginPath = [MenuLink.DASHBOARD, MenuLink.MISSION_CENTER, MenuLink.CAMPAIGINS, MenuLink.USER_PROFILE];

export const isBadgeIds = ['missions'];
