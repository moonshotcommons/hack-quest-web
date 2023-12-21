import {
  missionCenterColors,
  missionCenterBackgroundColor,
  missionCenterBorderColor,
  missionCenterBackgroundImage
} from './missionCenter';
import { courseBackgroundImage, courseThemeColors } from './course';
import { layoutThemeColors } from './layout';
import { landingThemeColors } from './landing';
import { settingThemeColors, settingBorderColors } from './setting';
import { notionRendererThemeColors } from './notionRenderer';
import {
  lessonThemeColors,
  lessonThemeBackgroundColor,
  lessonThemeBorderColor
} from './lesson';
import {
  homeThemeColors,
  homeThemeBackgroundColor,
  homeThemeBorderColor
} from './home';
import {
  learningTrackThemeColors,
  learningTrackThemeBackgroundColor,
  learningTrackThemeBorderColor
} from './learningTrack';
import {
  selectiveCoursesThemeColors,
  selectiveCoursesThemeBackgroundColor,
  selectiveCoursesThemeBorderColor
} from './selectiveCourses';
import { authThemeColors } from './auth';

export const themeColors = {
  'primary-color': 'var(--primary-green-yellow)',
  'default-global-bg': 'var(--default-global-bg)',
  'neutral-dark-gray': 'var(--neutral-dark-gray)',
  'neutral-light-gray': 'var(--neutral-light-gray)',
  'neutral-off-white': 'var(--neutral-off-white)',
  'neutral-white': 'var(--neutral-white)',
  'neutral-medium-gray': 'var(--neutral-medium-gray)',
  'neutral-black': 'var(--neutral-black)',
  'text-default-color': 'var(--text-default-color)',
  'text-second-color': 'var(--text-second-color)',
  ...layoutThemeColors,
  ...landingThemeColors,
  ...missionCenterColors,
  ...courseThemeColors,
  ...settingThemeColors,
  ...notionRendererThemeColors,
  ...lessonThemeColors,
  ...authThemeColors,
  ...homeThemeColors,
  ...learningTrackThemeColors,
  ...selectiveCoursesThemeColors
};

export const backgroundImage = {
  ...courseBackgroundImage,
  ...missionCenterBackgroundImage
};

export const backgroundColor = {
  ...missionCenterBackgroundColor,
  ...lessonThemeBackgroundColor,
  ...homeThemeBackgroundColor,
  ...learningTrackThemeBackgroundColor,
  ...selectiveCoursesThemeBackgroundColor
};

export const borderColor = {
  ...missionCenterBorderColor,
  ...lessonThemeBorderColor,
  ...homeThemeBorderColor,
  ...learningTrackThemeBorderColor,
  ...selectiveCoursesThemeBorderColor,
  ...settingBorderColors
};
