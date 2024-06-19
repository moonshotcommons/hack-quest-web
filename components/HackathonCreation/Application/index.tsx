import { ApplicationSectionType } from '../type';
import { AboutSectionComponentList } from './About';
import { OnlineProfilesSectionComponentList } from './OnlineProfiles';
import { ContractSectionComponentList } from './Contract';

export const ApplicationSectionConfig = {
  [ApplicationSectionType.About]: AboutSectionComponentList,
  [ApplicationSectionType.OnlineProfiles]: OnlineProfilesSectionComponentList,
  [ApplicationSectionType.ApplicationType]: OnlineProfilesSectionComponentList,
  [ApplicationSectionType.Contact]: ContractSectionComponentList
};

export * from './About';
export * from './OnlineProfiles';
export * from './ApplicationType';
export * from './Contract';
