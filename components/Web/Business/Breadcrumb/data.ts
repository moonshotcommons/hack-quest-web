import MenuLink from '@/constants/MenuLink';
import { QueryIdType, MenuNameType, Menu } from './type';

export const menuName: MenuNameType = {
  [Menu.LEARNING_TRACK]: 'learning-track',
  [Menu.ELECTIVES]: 'electives',
  [Menu.PRACTICES]: 'projects',
  [Menu.RESOURCE_STATION]: 'resource',
  [Menu.HACKATHON]: 'hackathon',
  [Menu.PROJECTS]: 'hackathon'
};

export const menuLink: MenuNameType = {
  [Menu.LEARNING_TRACK]: MenuLink.LEARNING_TRACK,
  [Menu.ELECTIVES]: MenuLink.ELECTIVES,
  [Menu.PRACTICES]: MenuLink.PRACTICES,
  [Menu.RESOURCE_STATION]: MenuLink.HACKATHON,
  [Menu.HACKATHON]: MenuLink.HACKATHON,
  [Menu.PROJECTS]: MenuLink.HACKATHON
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
