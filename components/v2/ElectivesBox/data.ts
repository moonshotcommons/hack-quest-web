export interface ParamType {
  label: string;
  value: string;
  checked: boolean;
}

export const sort = [
  // {
  //   label: 'Featured',
  //   value: true,
  //   key: 'featured'
  // },
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
];
export const courseType = [
  {
    label: 'All',
    value: 'ALL',
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
];
export const experienceLevel = [
  {
    label: 'All',
    value: 'ALL',
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
];

export const initPageInfo = {
  limit: 12,
  page: 1
};

export enum SearchFiled {
  sort = 'sort',
  type = 'type',
  level = 'level'
}
export type SearchParamType = Record<SearchFiled, ParamType[]>;

export const initParam = {
  sort: [...sort],
  type: [...courseType],
  level: [...experienceLevel]
};
