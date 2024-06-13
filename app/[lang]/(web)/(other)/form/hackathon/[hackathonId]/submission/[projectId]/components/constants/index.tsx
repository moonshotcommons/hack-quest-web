import { StepItem } from '@/components/Common/Steps';
import { ProjectLocation, ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';

export const HACKATHON_SUBMIT_STEPS: (StepItem & { type: ProjectSubmitStepType; stepNumber: number })[] = [
  {
    title: 'Info',
    type: ProjectSubmitStepType.INFO,
    stepNumber: 0
  },
  {
    title: 'Project',
    type: ProjectSubmitStepType.PROJECT,
    stepNumber: 1
  },
  {
    title: 'Pitch Video',
    type: ProjectSubmitStepType.PITCH_VIDEO,
    stepNumber: 2
  },
  {
    title: 'Project Demo',
    type: ProjectSubmitStepType.DEMO,
    stepNumber: 3
  },
  {
    title: 'Links',
    type: ProjectSubmitStepType.LINKS,
    stepNumber: 4
  },
  {
    title: 'Others',
    type: ProjectSubmitStepType.OTHERS,
    stepNumber: 5
  },
  {
    title: 'Wallet',
    type: ProjectSubmitStepType.WALLET,
    stepNumber: 6
  },
  {
    title: 'Review',
    type: ProjectSubmitStepType.REVIEW,
    stepNumber: 7
  }
];

export const LOCATIONS_SHORT = {
  [ProjectLocation.AMERICAS]: 'Americas',
  [ProjectLocation.ASIA_PACIFIC]: 'Asia Pacific',
  [ProjectLocation.EUROPE]: 'Europe',
  [ProjectLocation.MIDDLE_EAST_AFRICA]: 'Middle East/Africa',
  [ProjectLocation.OTHER]: 'Other'
};

export const LOCATIONS = [
  {
    label: 'Americas (North America, South America, Central America, Caribbean)',
    value: ProjectLocation.AMERICAS
  },
  {
    label: 'Asia Pacific (Central & South Asia, Northeastern Asia, Southeastern Asia, Australia and Oceania)',
    value: ProjectLocation.ASIA_PACIFIC
  },
  {
    label: 'Europe (Northern Europe, Southern Europe, Eastern Europe, Western Europe)',
    value: ProjectLocation.EUROPE
  },
  {
    label: 'Middle East/Africa (Middle East, Northern Africa, Southern Africa)',
    value: ProjectLocation.MIDDLE_EAST_AFRICA
  },
  {
    label: 'Other',
    value: 'Other'
  }
];

export const TRACKS = [
  {
    label: 'SocialFi',
    value: 'SocialFi'
  },
  {
    label: 'DeFi',
    value: 'DeFi'
  },
  {
    label: 'NFT',
    value: 'NFT'
  },
  {
    label: 'GameFi',
    value: 'GameFi'
  },
  {
    label: 'Infra',
    value: 'Infra'
  },
  {
    label: 'DAO',
    value: 'DAO'
  },
  {
    label: 'RWA',
    value: 'RWA'
  },
  {
    label: 'AI',
    value: 'AI'
  },
  {
    label: 'Other',
    value: 'Other'
  }
];

export const ProjectTypes = [
  {
    label: 'A tutorial guide',
    value: 'A tutorial guide'
  },
  {
    label: 'A dapp or frame',
    value: 'A dapp or frame'
  },
  {
    label: 'Other',
    value: 'Other'
  }
];
