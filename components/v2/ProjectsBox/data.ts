import { ALL, FilterType } from '@/components/v2/SearchFilter/type';

export const sort = {
  type: FilterType.RADIO,
  title: 'Sort By',
  value: 'sort',
  filterList: [
    {
      label: 'Featured',
      value: '-featured',
      checked: true
    },
    {
      label: 'Latest to oldest',
      value: '-startTime',
      checked: false
    },
    {
      label: 'Oldest to latest',
      value: 'startTime',
      checked: false
    }
  ]
};
export const projectType = {
  type: FilterType.RADIO,
  title: 'ProjectType',
  value: 'apolloDay',
  filterList: [
    {
      label: 'All',
      value: ALL,
      checked: true
    },
    {
      label: 'Apollo Day only',
      value: true,
      checked: false
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
    }
  ]
};

export const initPageInfo = {
  limit: 12,
  page: 1
};
export const filterData = [sort, projectType, tracks];
