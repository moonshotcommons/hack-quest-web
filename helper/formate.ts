export const tuple = <T extends string[]>(...args: T) => args;

type TimeType = 'Hour' | 'Minute' | 'Day';

export const computeTime = (
  minutes: number,
  type: TimeType,
  includeSuffix = true
) => {
  // const minutes = Math.floor(time / 60);

  const hours = Number((minutes / 60).toFixed(2));
  const days = Number((hours / 60).toFixed(2));

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
  return Math.floor(n * 100 * 100) / 100;
};

export const tagFormate = (tag: string) => {
  if (!tag) return tag;
  if (tag.includes('_')) {
    return tag
      .split('_')
      .map((s) => {
        return s.toLowerCase().replace(/^./, s[0].toUpperCase());
      })
      .join(' ');
  }

  if (tag.includes(' ')) {
    return tag
      .split(' ')
      .map((s) => s.toLowerCase().replace(/^./, s[0].toUpperCase()))
      .join(' ');
  }
  return tag.toLowerCase().replace(/^./, tag[0].toUpperCase());
};
