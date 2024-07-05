import { StepItem } from '@/components/Common/Steps';
import { ProjectLocation, SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import { SubmissionSectionType } from '@/components/HackathonCreation/type';
export const HACKATHON_SUBMIT_STEPS: (StepItem & { type: SubmissionSectionType | 'Review'; stepNumber: number })[] = [
  {
    title: 'Basic Info',
    type: SubmissionSectionType.BasicInfo,
    stepNumber: 0
  },
  {
    title: 'Project Detail',
    type: SubmissionSectionType.ProjectDetail,
    stepNumber: 1
  },
  {
    title: 'Videos',
    type: SubmissionSectionType.Videos,
    stepNumber: 2
  },
  {
    title: 'Additions',
    type: SubmissionSectionType.Additions,
    stepNumber: 3
  },
  {
    title: 'Review',
    type: 'Review',
    stepNumber: 4
  }
];

export const getHackathonSubmissionSteps = (
  application: SimpleHackathonInfo['info']['submission'],
  ignoreTypes: string[] = []
) => {
  const sections = Object.keys(application) as SubmissionSectionType[];
  return HACKATHON_SUBMIT_STEPS.filter(
    (item) =>
      (sections.includes(item.type as SubmissionSectionType) || item.type === 'Review') &&
      !ignoreTypes.includes(item.type)
  ).map((item, index) => ({ ...item, stepNumber: index }));
};

export const getHackathonStepInfo = (hackatgonSteps: typeof HACKATHON_SUBMIT_STEPS, type: SubmissionSectionType) => {
  const currentStep = hackatgonSteps.find((step) => step.type === type)!;
  const nextStep = currentStep && hackatgonSteps[currentStep.stepNumber + 1];
  return { currentStep, nextStep };
};

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
    value: ProjectLocation.OTHER
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

export enum HackathonPartner {
  Linea = '61b378f5-14ce-4136-b0f4-74b659175013',
  Hack4Bengal = 'f56dcb6f-5e0e-4ef4-a456-d036fbc5c2da'
}
