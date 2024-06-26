import { omit } from 'lodash-es';
import { PresetComponentConfig, IgnoreFields } from '../../type';
import { IGNORE_FIELDS } from '../../constants';
import ProjectLogoConfig from './ProjectLogo';
import ProjectNameConfig from './ProjectName';
import LocationConfig from './Location';
import PrizeTrackConfig from './PrizeTrack';
import HackathonTrackConfig from './HackathonTrack';
import WalletConnectConfig from './WalletConnect';

export const BasicInfoSectionComponentMap: Record<string, PresetComponentConfig<any>> = {
  [ProjectLogoConfig.type]: ProjectLogoConfig,
  [ProjectNameConfig.type]: ProjectNameConfig,
  [LocationConfig.type]: LocationConfig,
  [PrizeTrackConfig.type]: PrizeTrackConfig,
  [HackathonTrackConfig.type]: HackathonTrackConfig,
  [WalletConnectConfig.type]: WalletConnectConfig
};

export const BasicInfoSectionComponentList: Omit<PresetComponentConfig, IgnoreFields>[] = Object.values(
  BasicInfoSectionComponentMap
).map((cfg) => omit(cfg, IGNORE_FIELDS));
