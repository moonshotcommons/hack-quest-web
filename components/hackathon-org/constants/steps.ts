export enum Steps {
  BASIC_INFO = 1,
  // JUDGING = 2,
  LINKS = 2,
  COVER = 3,
  TIMELINE = 4,
  REWARDS = 5,
  APPLICATION = 6,
  SUBMISSION = 7,
  JUDGING = 8
}

export const STEP_ITEMS = [
  {
    value: Steps.BASIC_INFO,
    label: 'Info'
  },
  // {
  //   value: Steps.JUDGING,
  //   label: 'Judging'
  // },
  {
    value: Steps.LINKS,
    label: 'Links'
  },
  {
    value: Steps.COVER,
    label: 'Cover'
  },
  {
    value: Steps.TIMELINE,
    label: 'Timeline'
  },
  {
    value: Steps.REWARDS,
    label: 'Rewards'
  },
  {
    value: Steps.APPLICATION,
    label: 'Appl.'
  },
  {
    value: Steps.SUBMISSION,
    label: 'Sub.'
  },
  {
    value: Steps.JUDGING,
    label: 'Judging'
  }
];
