export const sort = [
  // {
  //   label: 'Featured',
  //   value: true,
  //   key: 'featured'
  // },
  {
    label: 'Level: low to high',
    value: '+level'
  },
  {
    label: 'Level: high to low',
    value: '-level'
  },
  {
    label: 'Duration: Short to long',
    value: '+duration'
  },
  {
    label: 'Duration: Long to short',
    value: '-duration'
  }
];
export const courseType = [
  {
    label: 'All',
    value: 'All'
  },
  {
    label: 'Guided project',
    value: 'GUIDED_PROJECT',
    key: 'type'
  },
  {
    label: 'Mini',
    value: 'Mini',
    key: 'type'
  }
];
export const experienceLevel = [
  {
    label: 'All',
    value: 'All'
  },
  {
    label: 'Beginner',
    value: 'BEGINNER'
  },
  {
    label: 'Intermediate',
    value: 'INTERMEDIATE'
  },
  {
    label: 'Advanced',
    value: 'ADVANCED'
  }
];

export const initFilter = {
  sort: sort[0].value,
  courseType: [courseType[0].value],
  experienceLevel: [experienceLevel[0].value]
};
