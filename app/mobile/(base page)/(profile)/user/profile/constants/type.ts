import { UserProfileType } from '@/service/webApi/user/type';
import { createContext } from 'react';

export enum ProfileHandleType {
  PERSONAL_EDIT = 'PersonalEdit',
  GITHUB_ACTIVITY = 'GithubActivity',
  EXPERIENCE = 'Experience',
  HACKATHON = 'Hackathon',
  ON_CHAIN_ACTIVITY = 'OnChainActivity',
  PERSONAL_LINKS = 'PersonalLinks'
}

export interface ProfileType {
  profile: UserProfileType;
  refresh: VoidFunction;
  // loadingType: ProfileHandleType | '';
  loading: boolean;
}
export const ProfileContext = createContext<ProfileType>({
  profile: {} as UserProfileType,
  refresh: () => {},
  loading: false
});
