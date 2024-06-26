import { omit } from 'lodash-es';
import { PresetComponentConfig, IgnoreFields } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import OneLineIntroConfig from './OneLineIntro';
import DetailedIntroLogoConfig from './DetailedIntro';
import TeamBackgroundLogoConfig from './TeamBackground';
import ProgressDuringHackathonConfig from './ProgressDuringHackathon';

export const ProjectDetailSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [OneLineIntroConfig.type]: OneLineIntroConfig,
  [DetailedIntroLogoConfig.type]: DetailedIntroLogoConfig,
  [TeamBackgroundLogoConfig.type]: TeamBackgroundLogoConfig,
  [ProgressDuringHackathonConfig.type]: ProgressDuringHackathonConfig
};

export const ProjectDetailSectionComponentList: Omit<PresetComponentConfig, IgnoreFields>[] = Object.values(
  ProjectDetailSectionComponentMap
).map((cfg) => omit(cfg, IGNORE_FIELDS));
