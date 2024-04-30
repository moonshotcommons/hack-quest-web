import { StepItem } from '@/components/Common/Steps';
import { ProjectLocation, ProjectSubmitStepType } from '@/service/webApi/resourceStation/type';

export const HACKATHON_SUBMIT_STEPS: (StepItem & { type: ProjectSubmitStepType; stepNumber: number })[] = [
  {
    title: 'Info',
    type: ProjectSubmitStepType.INFO,
    stepNumber: 0
  },
  {
    title: 'Pitch Video',
    type: ProjectSubmitStepType.PITCH_VIDEO,
    stepNumber: 1
  },
  {
    title: 'Project Demo',
    type: ProjectSubmitStepType.DEMO,
    stepNumber: 2
  },
  {
    title: 'Others',
    type: ProjectSubmitStepType.OTHERS,
    stepNumber: 3
  },
  {
    title: 'Wallet',
    type: ProjectSubmitStepType.WALLET,
    stepNumber: 4
  },
  {
    title: 'Review',
    type: ProjectSubmitStepType.REVIEW,
    stepNumber: 5
  }
];

export const LOCATIONS_SHORT = {
  [ProjectLocation.AMERICAS]: 'Americas',
  [ProjectLocation.ASIA_PACIFIC]: 'Asia Pacific',
  [ProjectLocation.EUROPE]: 'Europe',
  [ProjectLocation.MIDDLE_EAST_AFRICA]: 'Middle East/Africa',
  [ProjectLocation.OTHER]: 'Other'
};

//   {
//     label: 'Asia Pacific (Central & South Asia, Northeastern Asia, Southeastern Asia, Australia and Oceania)',
//     value: ProjectLocation.ASIA_PACIFIC
//   },
//   {
//     label: 'Europe (Northern Europe, Southern Europe, Eastern Europe, Western Europe)',
//     value: ProjectLocation.EUROPE
//   },
//   {
//     label: 'Middle East/Africa (Middle East, Northern Africa, Southern Africa)',
//     value: ProjectLocation.ASIA_PACIFIC
//   },
//   {
//     label: 'Other',
//     value: 'Other'
//   }
// ];

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
    value: ProjectLocation.ASIA_PACIFIC
  },
  {
    label: 'Other',
    value: 'Other'
  }
];
