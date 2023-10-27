import { QueryIdType, MenuNameType, Menu } from './type';

export const menuName: MenuNameType = {
  [Menu.LEARNING_TRACK]: 'learning-track',
  [Menu.ELECTIVES]: 'electives',
  [Menu.RESOURCE_STATION]: 'resource-station',
  [Menu.HACKATHON]: 'resource-station',
  [Menu.PROJECTS]: 'resource-station'
};

export const menuLink: MenuNameType = {
  [Menu.LEARNING_TRACK]: `/${menuName.learningTrack}`,
  [Menu.ELECTIVES]: `/${menuName.electives}`,
  [Menu.RESOURCE_STATION]: `/${menuName.resourceStation}`,
  [Menu.HACKATHON]: `/${menuName.resourceStation}/hackathon`,
  [Menu.PROJECTS]: `/${menuName.resourceStation}/hackathon`
};

export const navLinks = [
  menuLink.learningTrack,
  menuLink.electives,
  menuLink.electives,
  menuLink.hackathon,
  menuLink.projects
];
export const navIdType = [
  QueryIdType.LEARNING_TRACK_ID,
  QueryIdType.MENU_COURSE_ID,
  QueryIdType.LESSON_ID,
  QueryIdType.HACKATHON_ID,
  QueryIdType.PROJECT_ID
];
