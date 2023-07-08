export const tuple = <T extends string[]>(...args: T) => args;

type TimeType = 'Hour' | 'Minute' | 'Day';

export const computeTime = (
  minutes: number,
  type: TimeType,
  includeSuffix = true
) => {
  // const minutes = Math.floor(time / 60);

  const hours = Number((minutes / 60).toFixed(1));
  const days = Number((hours / 60).toFixed(1));

  switch (type) {
    case 'Minute':
      return includeSuffix
        ? minutes + ' ' + `${minutes > 1 ? 'Minutes' : 'Minute'}`
        : minutes;

    case 'Hour':
      return includeSuffix
        ? hours + ' ' + `${hours > 1 ? 'Hours' : 'Hour'}`
        : hours;

    case 'Day':
      return includeSuffix ? days + ' ' + `${days > 1 ? 'Days' : 'Day'}` : days;
  }
};

export const computeProgress = (n: number) => {
  return Math.floor(n * 100);
};

export const tagFormate = (input: string) => {
  if (!input) return input;
  // 利用正则表达式将字符串分割成单词数组
  const words = input.split(/[_\- ]+/);

  // 将每个单词的首字母大写，并拼接成新的字符串
  const formatted = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return formatted;
};
