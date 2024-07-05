import {
  AboutSectionComponentMap,
  ContactSectionComponentMap,
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
  ...ContactSectionComponentMap,
  ...OnlineProfilesSectionComponentMap,
  ...ApplicationTypeSectionComponentMap,
  ...BasicInfoSectionComponentMap,
  ...ProjectDetailSectionComponentMap,
  ...AdditionsSectionComponentMap,
  ...VideosSectionComponentMap
};

export * from './Application';
export * from './Submission';
