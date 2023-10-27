import { ALL, FilterType } from '@/components/v2/SearchFilter/type';

export const sort = {
  type: FilterType.RADIO,
  title: 'Sort By',
  value: 'sort',
  filterList: [
    {
      label: 'Featured',
      vlaue: 'featured',
      checked: true
    },
    {
      label: 'Latest to oldest',
      value: 'oldest',
      checked: false
    },
    {
      label: 'Oldest to latest',
      value: 'latest',
      checked: false
    }
  ]
};
export const projectType = {
  type: FilterType.CHECKBOX,
  title: 'ProjectType',
  value: 'project',
  filterList: [
    {
      label: 'All',
      value: ALL,
      checked: true
    },
    {
      label: 'Apollo Day only',
      value: 'APOLLO_DAY_ONLY',
      checked: true
    }
  ]
};
export const tracks = {
  type: FilterType.CHECKBOX,
  title: 'Tracks',
  value: 'tracks',
  filterList: [
    {
      label: 'All',
      value: ALL,
      checked: true
    },
    {
      label: 'DeFi',
      value: 'DEFI',
      checked: true
    },
    {
      label: 'NFT',
      value: 'NFT',
      checked: true
    },
    {
      label: 'GameFi',
      value: 'GAMEFI',
      checked: true
    },
    {
      label: 'SociFi',
      value: 'SOCIFI',
      checked: true
    },
    {
      label: 'Infra',
      value: 'INFRA',
      checked: true
    }
  ]
};

export const initPageInfo = {
  limit: 12,
  page: 1
};
export const filterData = [sort, projectType, tracks];
