'use client';

import { UserProfileType } from '@/service/webApi/user/type';
import * as React from 'react';

type ProfileContextValue = {
  profile?: UserProfileType & { isMe: boolean };
  isLoading: boolean;
  invalidate: () => void;
};

export const ProfileContext = React.createContext<ProfileContextValue>(null!);

export const ProfileProvider = ProfileContext.Provider;

export function useProfile() {
  if (!ProfileContext) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return React.useContext(ProfileContext);
}
