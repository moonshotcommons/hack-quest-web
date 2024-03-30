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
import { lessonThemeColors, lessonThemeBackgroundColor, lessonThemeBorderColor } from './lesson';
import { homeThemeColors, homeThemeBackgroundColor, homeThemeBorderColor } from './home';
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
  'default-global-bg': 'var(--default-global-bg)',
  'text-default-color': 'var(--text-default-color)',
  'text-second-color': 'var(--text-second-color)',
  /* 主题黄色 */
  'yellow-dark': 'var(--yellow-dark)',
  'yellow-primary': 'var(--yellow-primary)',
  'yellow-hover': 'var(--yellow-hover)',
  'yellow-light': 'var(--yellow-light)',
  'yellow-extra-light': 'var(--yellow-extra-light)',

  /* 中性色 */
  'neutral-black': 'var(--neutral-black)',
  'neutral-off-black': 'var(--neutral-off-black)',
  'neutral-dark-gray': 'var(--neutral-dark-gray)',
  'neutral-rich-gray': 'var(--neutral-rich-gray)',
  'neutral-medium-gray': 'var(--neutral-medium-gray)',
  'neutral-light-gray': 'var(--neutral-light-gray)',
  'neutral-off-white': 'var(--neutral-off-white)',
  'neutral-white': 'var(--neutral-white)',

  /* 状态色 */
  'status-success-dark': 'var(--status-success-dark)',
  'status-success': 'var(--status-success)',
  'status-success-light': 'var(--status-success-light)',
  'status-error-dark': 'var(--status-error-dark)',
  'status-error': 'var(--status-error)',
  'status-error-light': 'var(--status-error-light)',

  /* Code */
  'code-gray': 'var(--code-gray)',
  'code-dark-blue': 'var(--code-dark-blue)',
  'code-blue': 'var(--code-blue)',
  'code-brown': 'var(--code-brown)',
  'code-wine-red': 'var(--code-wine-red)',
  'code-rose-red': 'var(--code-rose-red)',
  'code-red': 'var(--code-red)',
  'code-green': 'var(--code-green)',
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
