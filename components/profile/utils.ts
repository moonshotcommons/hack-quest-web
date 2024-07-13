import { useQueryClient } from '@tanstack/react-query';
import { UserProfileType } from '@/service/webApi/user/type';

export const PROFILE_QUERY_KEY = 'profile';

export function useProfile() {
  const queryClient = useQueryClient();
  const state = queryClient.getQueryState<UserProfileType>([PROFILE_QUERY_KEY]);
  return {
    data: state?.data,
    loading: state?.status === 'pending',
    invalidate: () =>
      queryClient.invalidateQueries({
        queryKey: [PROFILE_QUERY_KEY]
      })
  };
}

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
