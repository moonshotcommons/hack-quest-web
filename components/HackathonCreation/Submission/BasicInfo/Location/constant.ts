import { ProjectLocation } from '@/service/webApi/resourceStation/type';

export const LOCATIONS_SHORT = {
  [ProjectLocation.AMERICAS]: 'Americas',
  [ProjectLocation.ASIA_PACIFIC]: 'Asia Pacific',
  [ProjectLocation.EUROPE]: 'Europe',
  [ProjectLocation.MIDDLE_EAST_AFRICA]: 'Middle East/Africa',
  [ProjectLocation.OTHER]: 'Other'
};

export const LOCATIONS = [
  {
    label: 'Americas (North America, South America, Central America, Caribbean)',
    value: ProjectLocation.AMERICAS
  },
  {
    label: 'Asia Pacific (Central & South Asia, Northeastern Asia, Southeastern Asia, Australia and Oceania)',
    value: ProjectLocation.ASIA_PACIFIC
  },
  {
    label: 'Europe (Northern Europe, Southern Europe, Eastern Europe, Western Europe)',
    value: ProjectLocation.EUROPE
  },
  {
    label: 'Middle East/Africa (Middle East, Northern Africa, Southern Africa)',
    value: ProjectLocation.MIDDLE_EAST_AFRICA
  },
  {
    label: 'Other',
    value: ProjectLocation.OTHER
  }
];
