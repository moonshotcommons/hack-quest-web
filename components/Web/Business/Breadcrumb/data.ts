import { QueryIdType, MenuNameType, Menu } from './type';

export const menuName: MenuNameType = {
  [Menu.LEARNING_TRACK]: 'learning-track',
  [Menu.ELECTIVES]: 'electives',
  [Menu.RESOURCE_STATION]: 'resource-station',
  [Menu.HACKATHON]: 'hackathon',
  [Menu.PROJECTS]: 'hackathon'
};

export const menuLink: MenuNameType = {
  [Menu.LEARNING_TRACK]: `/${menuName[Menu.LEARNING_TRACK]}`,
  [Menu.ELECTIVES]: `/${menuName[Menu.ELECTIVES]}`,
  [Menu.RESOURCE_STATION]: `/${menuName[Menu.RESOURCE_STATION]}`,
  [Menu.HACKATHON]: `/${menuName[Menu.HACKATHON]}`,
  [Menu.PROJECTS]: `/${menuName[Menu.HACKATHON]}`
};

export const navLinks = [
  menuLink[Menu.LEARNING_TRACK],
  menuLink[Menu.ELECTIVES],
  menuLink[Menu.ELECTIVES],
  menuLink[Menu.HACKATHON],
  menuLink[Menu.PROJECTS]
];
export const navIdType = [
  QueryIdType.LEARNING_TRACK_ID,
  QueryIdType.MENU_COURSE_ID,
  QueryIdType.LESSON_ID,
  QueryIdType.HACKATHON_ID,
  QueryIdType.PROJECT_ID
];
