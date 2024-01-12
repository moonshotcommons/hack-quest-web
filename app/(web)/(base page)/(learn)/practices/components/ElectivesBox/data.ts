import { ALL, FilterType } from '@/components/Web/Business/SearchFilter/type';

export const sort = {
  type: FilterType.RADIO,
  title: 'Sort By',
  value: 'sort',
  filterList: [
    {
      label: 'Level: low to high',
      value: 'level',
      checked: true
    },
    {
      label: 'Level: high to low',
      value: '-level',
      checked: false
    },
    {
      label: 'Duration: Short to long',
      value: 'duration',
      checked: false
    },
    {
      label: 'Duration: Long to short',
      value: '-duration',
      checked: false
    }
  ]
};
export const courseType = {
  type: FilterType.CHECKBOX,
  title: 'Course type',
  value: 'type',
  filterList: [
    {
      label: 'All',
      value: ALL,
      checked: true
    },
    {
      label: 'Guided project',
      value: 'GUIDED_PROJECT',
      checked: true
    },
    {
      label: 'Mini',
      value: 'MINI',
      checked: true
    }
  ]
};
export const level = {
  type: FilterType.CHECKBOX,
  title: 'Experience level',
  value: 'level',
  filterList: [
    {
      label: 'All',
      value: ALL,
      checked: true
    },
    {
      label: 'Beginner',
      value: 'BEGINNER',
      checked: true
    },
    {
      label: 'Intermediate',
      value: 'INTERMEDIATE',
      checked: true
    },
    {
      label: 'Advanced',
      value: 'ADVANCED',
      checked: true
    }
  ]
};

export const initPageInfo = {
  limit: 12,
  page: 1
};
export const filterData = [sort, courseType, level];
