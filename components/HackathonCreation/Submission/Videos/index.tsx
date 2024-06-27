import { omit } from 'lodash-es';
import { PresetComponentConfig, IgnoreFields } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import PitchVideoConfig from './PitchVideo';
import DemoVideoConfig from './DemoVideo';

export const VideosSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [PitchVideoConfig.type]: PitchVideoConfig,
  [DemoVideoConfig.type]: DemoVideoConfig
};

export const VideosSectionComponentList: Omit<PresetComponentConfig, IgnoreFields>[] = Object.values(
  VideosSectionComponentMap
).map((cfg) => omit(cfg, IGNORE_FIELDS));
