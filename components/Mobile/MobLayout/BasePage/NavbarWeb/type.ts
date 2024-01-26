export enum MenuLink {
  DASHBOARD = '/dashboard',
  LEARNING_TRACK = '/learning-track',
  PRACTICES = '/practices',
  ELECTIVES = '/electives',
  MISSION_CENTER = '/mission-center',
  HACKATHON = '/hackathon',
  BLOG = '/blog',
  PROJECTS = '/hackathon/projects',
  CAMPAIGINS = '/campaigns',
  USER_PROFILE = '/user/profile',
  CONNECT_GITHUB = '/connect-github',
  ECOSYSTEM = '/ecosystem'
}

export interface MenuType {
  label: string;
  path: MenuLink;
}
export interface NavbarListType {
  label: string;
  id: string;
  type?: 'outSide';
  link?: string;
  menu: MenuType[];
}
