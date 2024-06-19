export enum Steps {
  BASIC_INFO = 1,
  JUDGING = 2,
  LINKS = 3,
  COVER = 4,
  TIMELINE = 5,
  REWARDS = 6,
  APPLICATION = 7,
  SUBMISSION = 8
}

export const STEP_ITEMS = [
  {
    value: Steps.BASIC_INFO,
    label: 'Info'
  },
  {
    value: Steps.JUDGING,
    label: 'Judging'
  },
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
  }
];
