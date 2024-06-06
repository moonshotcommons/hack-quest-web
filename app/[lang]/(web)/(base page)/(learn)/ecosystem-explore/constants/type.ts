import MenuLink from '@/constants/MenuLink';
import { StaticImageData } from 'next/image';

export interface BuildOnWebType {
  type: 'project' | 'elective';
  count: number;
  link: MenuLink;
  icon: StaticImageData;
}
export interface MoreReourceType {
  type: 'glossary' | 'hackathon' | 'blog';
  link: MenuLink;
  icon: StaticImageData;
}
