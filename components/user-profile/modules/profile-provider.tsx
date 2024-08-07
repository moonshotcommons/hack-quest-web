'use client';

import * as React from 'react';
import { Attestation, UserProfileType } from '@/service/webApi/user/type';

type ProfileContextValue = {
  profile?: UserProfileType & {
    isCurrentUser: boolean;
    attestations: Attestation[];
  };
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
