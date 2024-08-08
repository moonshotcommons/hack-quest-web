'use client';

import * as React from 'react';
import { BasicInfo } from './modules/basic-info';
import { BuilderScore } from './modules/builder-score';
import { Certification } from './modules/certification';
import { DeveloperProfile } from './modules/developer-profile';
import { OnChainActivity } from './modules/on-chain-activity';
import { Experience } from './modules/experience';
import { Hackathon } from './modules/hackathon';
import { Resume } from './modules/resume';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import webApi from '@/service';
import { CompleteProfile } from './modules/complete-profile';
import { useToggle } from '@/hooks/utils/use-toggle';
import { useParams, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/zustand/userStore';
import { ProfileProvider } from './modules/profile-provider';
import { ChevronRightIcon } from 'lucide-react';
import { Attestations } from './modules/attestations';
import { AddAttestation } from './modals/add-attestation';

export default function Page() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { username } = useParams<{ username: string }>();
  const { userInfo } = useUserStore();
  const [open, toggle] = useToggle(true);

  const {
    isLoading,
    isError,
    data: profile
  } = useQuery({
    queryKey: ['profile', username],
    staleTime: Infinity,
    queryFn: () => webApi.userApi.getUserProfileByUsername(username),
    select: (data) => {
      return {
        ...data,
        isCurrentUser: data.user.id === userInfo?.id,
        attestations: [
          ...data.certifications.map((c) => c.attestations).flat(),
          ...data.workExperiences.map((e) => e.attestations).flat(),
          ...data.hackathonExperiences.map((h) => h.attestations).flat()
        ]
      };
    }
  });

  React.useEffect(() => {
    if (isError) {
      router.push('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const invalidate = React.useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['profile']
    });
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = React.useMemo(() => {
    return {
      profile,
      isLoading,
      invalidate
    };
  }, [invalidate, isLoading, profile]);

  return (
    <ProfileProvider value={contextValue}>
      <div className="min-h-screen w-full sm:bg-neutral-white">
        <BasicInfo />
        <div className="mt-2 h-full sm:container sm:mx-auto sm:mt-[88px] sm:flex sm:justify-center">
          <div className="flex-1 sm:max-w-5xl sm:pb-10">
            {profile?.isCurrentUser && profile?.progress[0] < profile?.progress[1] && <CompleteProfile />}
            <BuilderScore />
            <div className="mt-2 grid grid-cols-1 gap-2 sm:mt-12 sm:grid-cols-2 sm:gap-8">
              {(profile?.isCurrentUser || Object.keys(profile?.githubActivity || {}).length > 0) && (
                <DeveloperProfile />
              )}
              {(profile?.isCurrentUser || Object.keys(profile?.onChainActivity || {}).length > 0) && (
                <OnChainActivity />
              )}
            </div>
            {(profile?.isCurrentUser || (profile?.certifications?.length || 0) > 0) && <Certification />}
            {(profile?.isCurrentUser || (profile?.resumes?.length || 0) > 0) && <Resume />}
            {(profile?.isCurrentUser || (profile?.workExperiences?.length || 0) > 0) && <Experience />}
            {(profile?.isCurrentUser || (profile?.hackathonExperiences?.length || 0) > 0) && <Hackathon />}
          </div>
          {(profile?.attestations.length || 0) > 0 && !profile?.isCurrentUser && (
            <div
              data-state={open ? 'open' : 'closed'}
              className="group relative ml-7 hidden border-l border-l-neutral-light-gray p-3 duration-300 data-[state=closed]:w-0 data-[state=open]:w-80 data-[state-open]:animate-in data-[state=closed]:animate-out data-[state-open]:slide-in-from-left sm:flex sm:items-center"
            >
              <button
                className="absolute -left-4 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-rich-gray bg-neutral-white text-neutral-rich-gray outline-none"
                onClick={toggle}
              >
                <ChevronRightIcon className="duration-300 group-data-[state=closed]:rotate-180" size={20} />
              </button>
              <div className="group-data-[state=closed]:hidden">
                <Attestations />
              </div>
            </div>
          )}
        </div>
      </div>
      <AddAttestation />
    </ProfileProvider>
  );
}
