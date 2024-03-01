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
  COURSE_MARKET = '/course-market'
}

export interface MenuType {
  label: string;
  path: MenuLink;
  needLogin?: boolean;
  needPC?: boolean;
}
export interface NavbarListType {
  label: string;
  id: string;
  type?: 'outSide';
  link?: string;
  menu: MenuType[];
  needPC?: boolean;
}
