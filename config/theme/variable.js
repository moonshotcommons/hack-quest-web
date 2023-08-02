const missionCenterColors = {
  'mission-center-bg': 'var(--mission-center-bg)',
  'mission-card-bg': 'var(--mission-card-bg)',
  'mission-button-primary-bg': 'var(--mission-button-primary-bg)',
  'mission-button-second-bg': 'var(--mission-button-second-bg)',
  'mission-text-color': 'var(--mission-text-color)'
};

const themeColors = {
  'primary-color': 'var(--primary-green-yellow)',
  'neutral-dark-gray': 'var(--neutral-dark-gray)',
  'neutral-light-gray': 'var(--neutral-light-gray)',
  'neutral-off-white': 'var(--neutral-off-white)',
  'neutral-white': 'var(--neutral-white)',
  'neutral-medium-gray': 'var(--neutral-medium-gray)',
  'neutral-black': 'var(--neutral-black)',
  ...missionCenterColors
};

const neutralColors = {};

module.exports = {
  themeColors,
  neutralColors
};
