import { WorkExperienceType } from '@/service/webApi/user/type';

export const employmentTypeList = [
  {
    label: WorkExperienceType.FULL_TIME,
    value: WorkExperienceType.FULL_TIME
  },
  {
    label: WorkExperienceType.PART_TIME,
    value: WorkExperienceType.PART_TIME
  },
  {
    label: WorkExperienceType.CONTRACTOR,
    value: WorkExperienceType.CONTRACTOR
  },
  {
    label: WorkExperienceType.INTERNSHIP,
    value: WorkExperienceType.INTERNSHIP
  }
];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const curYear = new Date().getFullYear();
const yearStart = 1949;
export const monthList = months.map((v, i) => ({
  label: v,
  value: v
}));
export const yearList = Array.from({ length: curYear - yearStart + 1 }).map((_, i) => ({
  label: String(curYear - i),
  value: String(curYear - i)
}));
