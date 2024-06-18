import { omit } from 'lodash-es';
import { PresetComponentConfig, IgnoreFields } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import SubmissionConfig from './SubmissionType';

export const ApplicationTypeSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [SubmissionConfig.type]: SubmissionConfig
};

export const ApplicationTypeSectionComponentList: Omit<PresetComponentConfig, IgnoreFields>[] = Object.values(
  ApplicationTypeSectionComponentMap
).map((cfg) => omit(cfg, IGNORE_FIELDS));
