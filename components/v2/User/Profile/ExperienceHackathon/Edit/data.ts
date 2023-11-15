export const employmentTypeList = [
  {
    label: 'Full-time',
    value: 'Full-time'
  },
  {
    label: 'Part-time',
    value: 'Part-time'
  },
  {
    label: 'Contractor',
    value: 'Contractor'
  },
  {
    label: 'Internship',
    value: 'Internship'
  }
];
const months = [
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
  'October',
  'December'
];
const curYear = new Date().getFullYear();
const yearStart = 1949;
export const monthList = months.map((label, i) => ({
  label,
  value: String(i + 1)
}));
export const yearList = Array.from({ length: curYear - yearStart + 1 }).map(
  (_, i) => ({
    label: String(curYear - i),
    value: String(curYear - i)
  })
);
