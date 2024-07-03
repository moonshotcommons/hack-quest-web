import { omit } from 'lodash-es';
import { PresetComponentConfig } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import SubmissionTypeConfig from './SubmissionType';

export const ApplicationTypeSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [SubmissionTypeConfig.type]: SubmissionTypeConfig
};

export const ApplicationTypeSectionComponentList = Object.values(ApplicationTypeSectionComponentMap).map((cfg) =>
  omit(cfg, IGNORE_FIELDS)
);
