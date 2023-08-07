export type MilestonesTab = {
  label: string;
  id: number;
};

export type MilestonesData = {
  id: number;
  totalQuest: number;
  comQuest: number;
  integral: number;
  typeId: number;
  status: string;
  title?: string;
};

export const questsData = [
  {
    id: 1,
    type: 'hidden',
    integral: 5,
    totalQuest: 0,
    comQuest: 0
  },
  {
    id: 2,
    type: 'view',
    integral: 10,
    totalQuest: 10,
    comQuest: 6
  },
  {
    id: 3,
    type: 'view',
    integral: 25,
    totalQuest: 20,
    comQuest: 6
  }
];

export const milestonesTab: MilestonesTab[] = [
  {
    label: 'Course Completion',
    id: 1
  },
  {
    label: 'Quest Winning Streak',
    id: 2
  },
  {
    label: 'Track Completion',
    id: 3
  }
];

export const milestonesData = [
  {
    id: 1,
    totalQuest: 3,
    comQuest: 1,
    integral: 25,
    typeId: 1,
    status: 'claim'
  },
  {
    id: 2,
    totalQuest: 6,
    comQuest: 1,
    integral: 50,
    typeId: 1,
    status: 'learn'
  },
  {
    id: 3,
    totalQuest: 10,
    comQuest: 1,
    integral: 120,
    typeId: 1,
    status: 'learn'
  },
  {
    id: 4,
    totalQuest: 3,
    comQuest: 1,
    integral: 25,
    typeId: 2,
    status: 'claim',
    title: 'Quest Winning Streak 1'
  },
  {
    id: 5,
    totalQuest: 6,
    comQuest: 1,
    integral: 50,
    typeId: 2,
    status: 'learn',
    title: 'Quest Winning Streak 2'
  },
  {
    id: 6,
    totalQuest: 10,
    comQuest: 1,
    integral: 120,
    typeId: 2,
    status: 'learn',
    title: 'Quest Winning Streak 3'
  },
  {
    id: 7,
    totalQuest: 3,
    comQuest: 1,
    integral: 25,
    typeId: 3,
    status: 'claim',
    title: 'Track Completion 1'
  },
  {
    id: 8,
    totalQuest: 6,
    comQuest: 1,
    integral: 50,
    typeId: 3,
    status: 'learn',
    title: 'Track Completion 2'
  },
  {
    id: 9,
    totalQuest: 10,
    comQuest: 1,
    integral: 120,
    typeId: 3,
    status: 'learn',
    title: 'Track Completion 3'
  }
];
