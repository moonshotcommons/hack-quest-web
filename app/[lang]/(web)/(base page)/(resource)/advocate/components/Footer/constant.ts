import { HACKQUEST_DISCORD, HACKQUEST_LINKEDIN, HACKQUEST_TELEGRAM, HACKQUEST_TWITTER } from '@/constants/links';

export const FOOTER_LINKS = [
  {
    group: 'LEARN',
    links: [
      {
        title: 'Learning Tracks',
        link: '/learning-track'
      },
      {
        title: 'Electives',
        link: '/electives'
      },
      {
        title: 'Projects',
        link: '/practices'
      },
      {
        title: 'Playground',
        link: process.env.IDE_URL || 'https://ide.dev.hackquest.io'
      }
    ]
  },
  {
    group: 'COMMUNITY',
    links: [
      {
        title: 'Discord',
        link: HACKQUEST_DISCORD
      },
      {
        title: 'X',
        link: HACKQUEST_TWITTER
      },
      {
        title: 'Telegram',
        link: HACKQUEST_TELEGRAM
      },
      {
        title: 'Linkedin',
        link: HACKQUEST_LINKEDIN
      }
    ]
  },
  {
    group: 'RESOURCES',
    links: [
      {
        title: 'Hackathon',
        link: '/hackathon'
      },
      {
        title: 'Blog',
        link: '/blog'
      }
    ]
  }
];
