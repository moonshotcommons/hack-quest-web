import { ApplicationSectionType } from '../type';
import { AboutSectionComponentList } from './About';
import { OnlineProfilesSectionComponentList } from './OnlineProfiles';
import { ApplicationTypeSectionComponentList } from './ApplicationType';
import { ContactSectionComponentList } from './Contact';

export const ApplicationSectionConfig = {
  [ApplicationSectionType.About]: AboutSectionComponentList,
  [ApplicationSectionType.OnlineProfiles]: OnlineProfilesSectionComponentList,
  [ApplicationSectionType.ApplicationType]: ApplicationTypeSectionComponentList,
  [ApplicationSectionType.Contact]: ContactSectionComponentList
};

export * from './About';
export * from './OnlineProfiles';
export * from './ApplicationType';
export * from './Contact';
