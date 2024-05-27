import MenuLink from '@/constants/MenuLink';
import { BuildOnWebType, MoreReourceType } from './type';

export const buildOnWeb3Data: BuildOnWebType[] = [
  {
    type: 'project',
    count: 0,
    link: MenuLink.PRACTICES
  },
  {
    type: 'elective',
    count: 0,
    link: MenuLink.ELECTIVES
  }
];

export const moreRoursesData: MoreReourceType[] = [
  {
    type: 'glossary',
    link: MenuLink.GLOSSARY
  },
  {
    type: 'hackathon',
    link: MenuLink.HACKATHON
  },
  {
    type: 'blog',
    link: MenuLink.BLOG
  }
];
