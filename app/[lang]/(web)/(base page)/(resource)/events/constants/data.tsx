import AdvocateImg from '@/public/images/resource/advocate_link.png';
import HackathonImg from '@/public/images/resource/hackathon_link.png';
import BlogImg from '@/public/images/resource/blog_link.png';
import MenuLink from '@/constants/MenuLink';
export const eventsBannerData = [
  {
    number: 10,
    label: 'Meet-ups Organized',
    id: 1
  },
  {
    number: 20,
    label: 'Co-learning Camps Initiated',
    id: 2
  },
  {
    number: 30,
    label: 'Hackathons Hosted',
    id: 3
  },
  {
    number: 8000,
    label: 'Builders Attended',
    id: 4
  }
];

export const eventsExploreLinkData = [
  {
    img: AdvocateImg,
    label: 'Advocate Center',
    path: MenuLink.ADVOCATE,
    id: 1
  },
  {
    img: HackathonImg,
    label: 'Hackathon',
    path: MenuLink.HACKATHON,
    id: 2
  },
  {
    img: BlogImg,
    label: 'Blog',
    path: MenuLink.BLOG,
    id: 3
  }
];
