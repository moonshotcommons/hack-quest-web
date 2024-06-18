import { omit } from 'lodash-es';
import { PresetComponentConfig, IgnoreFields } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import BioConfig from './Bio';
import FirstNameAndLastNameConfig from './FirstNameAndLastName';
import GenderConfig from './Gender';
import LocationConfig from './Location';

export const AboutSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [FirstNameAndLastNameConfig.type]: FirstNameAndLastNameConfig,
  [BioConfig.type]: BioConfig,
  [GenderConfig.type]: GenderConfig,
  [LocationConfig.type]: LocationConfig
};

export const AboutSectionComponentList: Omit<PresetComponentConfig, IgnoreFields>[] = Object.values(
  AboutSectionComponentMap
).map((cfg) => omit(cfg, IGNORE_FIELDS));
