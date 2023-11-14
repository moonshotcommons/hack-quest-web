export enum MenuLink {
  HOME = '/home',
  LEARNING_TRACK = '/learning-track',
  ELECTIVES = '/electives',
  MISSION_CENTER = '/mission-center',
  HACKATHON = '/resource-station/hackathon',
  PROJECTS = '/resource-station/hackathon/projects',
  CAMPAIGINS = '/campaigns'
}
export interface MenuType {
  label: string;
  path: MenuLink;
}
export interface NavbarListType {
  label: string;
  id: string;
  menu: MenuType[];
}
