export enum MenuLink {
  HOME = '/home',
  LEARNING_TRACK = '/learning-track',
  PRACTICES = '/practices',
  ELECTIVES = '/electives',
  MISSION_CENTER = '/mission-center',
  HACKATHON = '/resource-station/hackathon',
  BLOG = '/resource-station/blog',
  PROJECTS = '/resource-station/hackathon/projects',
  CAMPAIGINS = '/campaigns',
  USER_PROFILE = '/user/profile',
  CONNECT_GITHUB = '/connect-github',
  PROFILE = '/profile'
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
