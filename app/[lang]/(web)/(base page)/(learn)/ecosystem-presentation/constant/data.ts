import { MintType } from './type';

export const mintTab = [
  {
    value: MintType.HALF_WAY,
    label: 'Half Way'
  },
  {
    value: MintType.LEVEL1,
    label: 'Level 1'
  },
  {
    value: MintType.LEVEL2,
    label: 'Level 2'
  },
  {
    value: MintType.COURSE_COMPLETED,
    label: 'Counse Completed'
  },
  {
    value: MintType.APPROACH_MINT,
    label: 'Approach Mint'
  }
];

export const mintTableInformation = [
  {
    label: 'Avatar',
    value: 'avatar'
  },
  {
    label: 'Nickname',
    value: 'nickname'
  },
  {
    label: 'Courses Completed',
    value: 'courseCount'
  },
  {
    label: 'Certification Earned',
    value: 'certificationCount'
  }
];

export const mockMintData = Array.from({ length: 10 }).map((_, i) => ({
  avatar: 'https://hackquest-s3-public-dev-apne1.s3.ap-northeast-1.amazonaws.com/users/avatars/avatar-default-04.png',
  id: i + 1,
  nickname: `Hacker ${i + 1}`,
  courseCount: 40 + i,
  certificationCount: 20 + i
}));
