import { omit } from 'lodash-es';
import { PresetComponentConfig } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import BioConfig from './Bio';
import ResumeUploadConfig from './ResumeUpload';
import FirstNameAndLastNameConfig from './FirstNameAndLastName';
import GenderConfig from './Gender';
import LocationConfig from './Location';
import UniversityConfig from './University';

export const AboutSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [ResumeUploadConfig.type]: ResumeUploadConfig,
  [FirstNameAndLastNameConfig.type]: FirstNameAndLastNameConfig,
  [BioConfig.type]: BioConfig,
  [GenderConfig.type]: GenderConfig,
  [LocationConfig.type]: LocationConfig,
  [UniversityConfig.type]: UniversityConfig
};

export const AboutSectionComponentList = Object.values(AboutSectionComponentMap).map((cfg) => omit(cfg, IGNORE_FIELDS));
