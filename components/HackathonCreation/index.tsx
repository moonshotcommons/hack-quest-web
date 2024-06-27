import {
  AboutSectionComponentMap,
  ContractSectionComponentMap,
  OnlineProfilesSectionComponentMap,
  ApplicationTypeSectionComponentMap
} from './Application';

import {
  BasicInfoSectionComponentMap,
  ProjectDetailSectionComponentMap,
  AdditionsSectionComponentMap,
  VideosSectionComponentMap
} from './Submission';

export const PresetComponentMap = {
  ...AboutSectionComponentMap,
  ...ContractSectionComponentMap,
  ...OnlineProfilesSectionComponentMap,
  ...ApplicationTypeSectionComponentMap,
  ...BasicInfoSectionComponentMap,
  ...ProjectDetailSectionComponentMap,
  ...AdditionsSectionComponentMap,
  ...VideosSectionComponentMap
};

export * from './Application';
export * from './Submission';
