import MenuLink from '@/constants/MenuLink';
import { BuildOnWebType, MoreReourceType } from './type';
import GlossaryIcon from '@/public/images/learn/web3_cover.png';
import HackathonIcon from '@/public/images/learn/icon_hackathon.png';
import BlogIcon from '@/public/images/learn/icon_bounty.png';
import ProjectIcon from '@/public/images/learn/project_icon.png';
import ElectiveIcon from '@/public/images/learn/certified_learning_track_cover.png';

export const buildOnWeb3Data: BuildOnWebType[] = [
  {
    type: 'project',
    count: 0,
    link: MenuLink.PRACTICES,
    icon: ProjectIcon
  },
  {
    type: 'elective',
    count: 0,
    link: MenuLink.ELECTIVES,
    icon: ElectiveIcon
  }
];

export const moreRoursesData: MoreReourceType[] = [
  {
    type: 'glossary',
    link: MenuLink.GLOSSARY,
    icon: GlossaryIcon
  },
  {
    type: 'hackathon',
    link: MenuLink.HACKATHON,
    icon: HackathonIcon
  },
  {
    type: 'blog',
    link: MenuLink.BLOG,
    icon: BlogIcon
  }
];

export const introWeb3MockCourseId = 'd927cdac-7fcb-4516-abab-624af8e44894';
