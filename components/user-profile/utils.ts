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
