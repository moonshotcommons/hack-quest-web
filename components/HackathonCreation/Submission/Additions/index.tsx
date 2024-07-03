import { omit } from 'lodash-es';
import { PresetComponentConfig } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import GithubOpenSourceConfig from './GithubOpenSource';
import ContractAddressConfig from './ContractAddress';
import FundraisingStatusConfig from './FundraisingStatus';

export const AdditionsSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [GithubOpenSourceConfig.type]: GithubOpenSourceConfig,
  [ContractAddressConfig.type]: ContractAddressConfig,
  [FundraisingStatusConfig.type]: FundraisingStatusConfig
};

export const AdditionsSectionComponentList = Object.values(AdditionsSectionComponentMap).map((cfg) =>
  omit(cfg, IGNORE_FIELDS)
);
