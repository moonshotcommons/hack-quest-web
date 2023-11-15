import { UserProfileType } from '@/service/webApi/user/type';
import { createContext } from 'react';

export interface ProfileType {
  profile: UserProfileType;
  refresh: VoidFunction;
}
export const ProfileContext = createContext<ProfileType>({
  profile: {} as UserProfileType,
  refresh: () => {}
});
