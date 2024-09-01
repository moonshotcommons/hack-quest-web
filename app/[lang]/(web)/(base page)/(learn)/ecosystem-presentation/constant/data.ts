import { MintType } from './type';

export const mintTab = [
  {
    value: MintType.HALF_WAY,
    label: 'Half-Way Through'
  },
  {
    value: MintType.LEVEL1,
    label: 'Lv1 Certificate'
  },
  {
    value: MintType.LEVEL2,
    label: 'Lv2 Certificate'
  },
  {
    value: MintType.COURSE_COMPLETED,
    label: 'Finish the first course'
  },
  {
    value: MintType.APPROACH_MINT,
    label: '90% mint condition'
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
    value: 'completedCourseCount'
  },
  {
    label: 'User Profile',
    value: 'link'
  }
  // {
  //   label: 'Certification Earned',
  //   value: 'EarnedCertificationCount'
  // }
];

export const mockMintData = Array.from({ length: 10 }).map((_, i) => ({
  avatar: 'https://hackquest-s3-public-dev-apne1.s3.ap-northeast-1.amazonaws.com/users/avatars/avatar-default-04.png',
  id: i + 1,
  nickname: `Hacker ${i + 1}`,
  courseCount: 40 + i,
  certificationCount: 20 + i
}));
