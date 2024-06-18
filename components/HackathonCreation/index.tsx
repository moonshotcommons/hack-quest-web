import {
  AboutSectionComponentMap,
  ContractSectionComponentMap,
  OnlineProfilesSectionComponentMap,
  ApplicationTypeSectionComponentMap
} from './Application';

import {
  BasicInfoSectionComponentMap,
  ProjectDetailSectionComponentMap,
  AdditionsSectionComponentMap
} from './Submission';

export const PresetComponentMap = {
  ...AboutSectionComponentMap,
  ...ContractSectionComponentMap,
  ...OnlineProfilesSectionComponentMap,
  ...ApplicationTypeSectionComponentMap,
  ...BasicInfoSectionComponentMap,
  ...ProjectDetailSectionComponentMap,
  ...AdditionsSectionComponentMap
};

export * from './Application';
export * from './Submission';
