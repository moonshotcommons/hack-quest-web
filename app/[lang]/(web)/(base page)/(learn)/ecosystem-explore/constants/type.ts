import MenuLink from '@/constants/MenuLink';

export interface BuildOnWebType {
  type: 'project' | 'elective';
  count: number;
  link: MenuLink;
}
export interface MoreReourceType {
  type: 'glossary' | 'hackathon' | 'blog';
  link: MenuLink;
}
