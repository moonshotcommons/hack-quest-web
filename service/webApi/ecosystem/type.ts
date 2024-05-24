import { Lang } from '@/i18n/config';

export interface EcosystemType {
  id: string;
  name: string;
  description: string;
  image: string;
  lang: Lang;
  language: string;
  tags: string[];
  track: string;
}

export interface EcosystemLevelType {
  ecosystemId: string;
  label: string;
  level: number;
  currentExp: number;
  maxExp: number;
  certificationId: string;
}

export interface EcosystemDetailType {
  info: EcosystemType;
  level: EcosystemLevelType;
}
