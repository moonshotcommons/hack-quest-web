import { months } from './Edit/data';
export const dealDate = (date: string) => {
  const dateArr = date.split(' ');
  return `${dateArr[0].slice(0, 3)} ${dateArr[1]}`;
};

export const dateInterval = (start: string, end?: string) => {
  let y, m;
  let startArr = start.split(' ');
  if (end) {
    y = (end.split(' ')[1] as any) - (startArr[1] as any);
    m = months.indexOf(end.split(' ')[0]) - months.indexOf(startArr[0]);
  } else {
    y = new Date().getFullYear() - (startArr[1] as any);
    m = new Date().getMonth() + 1 - months.indexOf(startArr[0]);
  }
  return y > 0 ? `${y} yr ${m} mos` : `${m} mos`;
};
