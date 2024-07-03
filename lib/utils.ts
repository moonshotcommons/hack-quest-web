export const noop = () => {};

export function numberToOrdinal(num: number) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = num % 100;
  return num + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function numberToOrdinalWord(n: number): string {
  const ordinalWords: { [key: number]: string } = {
    1: 'First',
    2: 'Second',
    3: 'Third',
    4: 'Fourth',
    5: 'Fifth',
    6: 'Sixth',
    7: 'Seventh',
    8: 'Eighth',
    9: 'Ninth',
    10: 'Tenth'
  };

  return ordinalWords[n] || 'unknown';
}
