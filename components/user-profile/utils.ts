export function convertMonthYear(dateStr: string) {
  const [month, year] = dateStr.split(' ');
  const shortMonth = month.substring(0, 3);
  return `${shortMonth} ${year}`;
}

export function calculateWorkExperience(startTime: string, endTime?: string) {
  const parseDate = (dateStr: string) => {
    const [month, year] = dateStr.split(' ');
    const shortMonth = month.substring(0, 3);
    return new Date(`${shortMonth} 1, ${year}`);
  };

  const startDate = parseDate(startTime);
  const endDate = endTime ? parseDate(endTime) : new Date();

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return years > 0 ? `${years} yr ${months} mos` : `${months} mos`;
}

const gradeRanges: Record<string, [number, number]> = {
  S: [95, 100],
  'A+': [90, 95],
  A: [80, 90],
  'A-': [70, 80],
  'B+': [60, 70],
  B: [50, 60],
  'B-': [40, 50],
  C: [0, 40]
};

export function getGrade(score?: number) {
  if (!score) return 'C';
  for (let grade in gradeRanges) {
    const [min, max] = gradeRanges[grade];
    if (score >= min && score <= max) {
      return grade;
    }
  }
  throw new Error('Invalid score');
}
