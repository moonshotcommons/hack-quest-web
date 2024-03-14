export enum MenuLink {
  DASHBOARD = '/dashboard',
  LEARNING_TRACK = '/learning-track',
  PRACTICES = '/practices',
  ELECTIVES = '/electives',
  UGC = '/ugc',
  UGC_CREATE = '/ugc-create',
  MISSION_CENTER = '/mission-center',
  HACKATHON = '/hackathon',
  BLOG = '/blog',
  PROJECTS = '/hackathon/projects',
  CAMPAIGINS = '/campaigns',
  USER_PROFILE = '/user/profile',
  CONNECT_GITHUB = '/connect-github',
  ECOSYSTEM = '/ecosystem',
  GLOSSARY = '/glossary',
  INSTRUCTOR = '/instructor',
  ADVOCATE = '/advocate',
  COURSE_MARKET = '/course-market',
  LANUNCH = '/launch-pool'
}
export interface OutSideType {
  label: string;
  link: string;
  id?: string;
}

export interface MenuType {
  label: string;
  path?: MenuLink;
  id?: string;
  link?: string;
  description?: string;
  needLogin?: boolean;
  needPC?: boolean;
  outSide?: OutSideType[];
}
export interface NavbarListType {
  label: string;
  id: string;
  type?: 'outSide';
  menu: MenuType[];
}
