export const tuple = <T extends string[]>(...args: T) => args;

type TimeType = 'Hour' | 'Minute' | 'Day';

export const computeTime = (minutes: number, type: TimeType) => {
  // const minutes = Math.floor(time / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  switch (type) {
    case 'Minute':
      return minutes;
    case 'Hour':
      return hours;
    case 'Day':
      return days;
  }
};

export const computeProgress = (n: number) => {
  return Math.floor(n * 100 * 100) / 100;
};
