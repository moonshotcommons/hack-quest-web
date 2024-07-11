import AdvocateImg from '@/public/images/resource/advocate_link.png';
import HackathonImg from '@/public/images/resource/hackathon_link.png';
import BlogImg from '@/public/images/resource/blog_link.png';
import MenuLink from '@/constants/MenuLink';

export const eventsBannerData = [
  {
    number: 100,
    label: 'meetUpsOrganized',
    id: 1
  },
  {
    number: 30,
    label: 'colearningCampsInitiated',
    id: 2
  },
  {
    number: 30,
    label: 'HackathonsHosted',
    id: 3
  },
  {
    number: 12000,
    label: 'buildersAttended',
    id: 4
  }
];

export const eventsExploreLinkData = [
  {
    img: AdvocateImg,
    label: 'advocateCenter',
    path: MenuLink.ADVOCATE,
    id: 1
  },
  {
    img: HackathonImg,
    label: 'hackathon',
    path: MenuLink.EXPLORE_HACKATHON,
    id: 2
  },
  {
    img: BlogImg,
    label: 'blog',
    path: MenuLink.BLOG,
    id: 3
  }
];
