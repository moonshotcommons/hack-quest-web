export enum Steps {
  BASIC_INFO = 'info',
  LINKS = 'links',
  COVER = 'cover',
  TIMELINE = 'timeline',
  APPLICATION = 'application',
  SUBMISSION = 'submission',
  REWARDS = 'rewards',
  JUDGING = 'judge'
}

export const STEP_ITEMS = [
  {
    value: Steps.BASIC_INFO,
    label: 'Info'
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
    value: Steps.APPLICATION,
    label: 'Appl.'
  },
  {
    value: Steps.SUBMISSION,
    label: 'Sub.'
  },
  {
    value: Steps.REWARDS,
    label: 'Rewards'
  },
  {
    value: Steps.JUDGING,
    label: 'Judging'
  }
];
