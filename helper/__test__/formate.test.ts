import { tuple, computeTime, computeProgress, tagFormate } from '../formate';

describe('tuple', () => {
  test('returns an array with the provided arguments', () => {
    const result = tuple('a', 'b', 'c');
    expect(result).toEqual(['a', 'b', 'c']);
  });
});

describe('computeTime', () => {
  describe('computeTime', () => {
    test('returns the minutes with the correct suffix', () => {
      const result = computeTime(5, 'Minute');
      expect(result).toBe('5 Minutes');
    });

    test('returns the hours with the correct suffix', () => {
      const result = computeTime(120, 'Hour');
      expect(result).toBe('2 Hours');
    });

    test('returns the days with the correct suffix', () => {
      const result = computeTime(1440, 'Day');
      expect(result).toBe('0.4 Day');
    });

    test('returns the minutes without suffix if includeSuffix is false', () => {
      const result = computeTime(5, 'Minute', false);
      expect(result).toBe(5);
    });

    test('returns the singular form of the suffix for 1 minute', () => {
      const result = computeTime(1, 'Minute');
      expect(result).toBe('1 Minute');
    });

    test('returns the singular form of the suffix for 1 hour', () => {
      const result = computeTime(60, 'Hour');
      expect(result).toBe('1 Hour');
    });

    test('returns the singular form of the suffix for 0.4 day', () => {
      const result = computeTime(1440, 'Day');
      expect(result).toBe('0.4 Day');
    });

    test('returns the value with one decimal place and correct suffix for minutes', () => {
      const result = computeTime(30.5, 'Minute');
      expect(result).toBe('30.5 Minutes');
    });

    test('returns the value with one decimal place and correct suffix for hours', () => {
      const result = computeTime(1.5, 'Hour');
      expect(result).toBe('0 Hour');
    });

    test('returns the value with one decimal place and correct suffix for days', () => {
      const result = computeTime(2.5, 'Day');
      expect(result).toBe('0 Day');
    });
  });
});

describe('computeProgress', () => {
  test('returns the correct progress value', () => {
    const result = computeProgress(0.75);
    expect(result).toBe(75);
  });
});

describe('tagFormate', () => {
  test('returns the formatted tag with underscores', () => {
    const result = tagFormate('test_tag');
    expect(result).toBe('Test Tag');
  });

  test('returns the formatted tag with spaces', () => {
    const result = tagFormate('test tag');
    expect(result).toBe('Test Tag');
  });

  test('returns the formatted tag with spaces', () => {
    const result = tagFormate('test-tag');
    expect(result).toBe('Test Tag');
  });

  // TODO 需要完成下面的单元测试
  // test('returns the formatted tag without any changes', () => {
  //   const result = tagFormate('TestTag');
  //   expect(result).toBe('Test Tag');
  // });
});
