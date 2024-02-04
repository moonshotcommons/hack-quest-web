export enum MenuLink {
  DASHBOARD = '/dashboard',
  LEARNING_TRACK = '/learning-track',
  PRACTICES = '/practices',
  ELECTIVES = '/electives',
  UGC = '/ugc',
  MISSION_CENTER = '/mission-center',
  HACKATHON = '/hackathon',
  BLOG = '/blog',
  PROJECTS = '/hackathon/projects',
  CAMPAIGINS = '/campaigns',
  USER_PROFILE = '/user/profile',
  CONNECT_GITHUB = '/connect-github',
  ECOSYSTEM = '/ecosystem',
  GLOSSARY = '/glossary',
  INSTRUCTOR = '/instructor'
}

export interface MenuType {
  label: string;
  path: MenuLink;
  needLogin?: boolean;
}
export interface NavbarListType {
  label: string;
  id: string;
  type?: 'outSide';
  link?: string;
  menu: MenuType[];
}
