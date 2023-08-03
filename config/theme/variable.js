const { missionCenterColors } = require('./missionCenter');
const { courseBackgroundImage, courseThemeColors } = require('./course');

const themeColors = {
  'primary-color': 'var(--primary-green-yellow)',
  'global-bg': 'var(--global-bg)',
  'neutral-dark-gray': 'var(--neutral-dark-gray)',
  'neutral-light-gray': 'var(--neutral-light-gray)',
  'neutral-off-white': 'var(--neutral-off-white)',
  'neutral-white': 'var(--neutral-white)',
  'neutral-medium-gray': 'var(--neutral-medium-gray)',
  'neutral-black': 'var(--neutral-black)',
  'text-default-color': 'var(--text-default-color)',
  'text-second-color': 'var(--text-second-color)',
  ...missionCenterColors,
  ...courseThemeColors
};

const backgroundImage = {
  ...courseBackgroundImage
};

module.exports = {
  themeColors,
  backgroundImage
};
