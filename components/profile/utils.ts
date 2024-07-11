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
