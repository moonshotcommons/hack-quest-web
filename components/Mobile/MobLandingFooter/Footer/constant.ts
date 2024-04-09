import { HACKQUEST_DISCORD, HACKQUEST_LINKEDIN, HACKQUEST_TELEGRAM, HACKQUEST_TWITTER } from '@/constants/links';

export const FOOTER_LINKS = [
  {
    group: 'learn',
    links: [
      {
        title: 'learningTrack',
        link: '/learning-track'
      },
      {
        title: 'electives',
        link: '/electives'
      },
      {
        title: 'projects',
        link: '/practices'
      },
      {
        title: 'playground',
        link: process.env.IDE_URL || 'https://ide.dev.hackquest.io'
      }
    ]
  },
  {
    group: 'community',
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
    group: 'resources',
    links: [
      {
        title: 'hackathon',
        link: '/hackathon'
      },
      {
        title: 'blog',
        link: '/blog'
      }
    ]
  }
];
