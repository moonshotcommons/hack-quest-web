'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/ui/icons/github';
import webApi from '@/service';
import { useMutation } from '@tanstack/react-query';
import { useProfile } from './profile-provider';
import { UnlinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const colors = ['#DB9038', '#f8b400', '#FAD81C', '#D4CC1B', '#FFE866'] as const;

export function openWindow(url: string) {
  const width = 550;
  const height = 470;
  const left = Math.max(0, (screen.width - width) / 2);
  const top = Math.max(0, (screen.height - height) / 2);
  window.open(
    url,
    'authWindow',
    `width=${width},height=${height},left=${left},top=${top}status=0,location=0,toolbar=0,menubar=0`
  );
}

export function DeveloperProfile() {
  const { profile, invalidate } = useProfile();
  const connectMutation = useMutation({
    mutationFn: () => webApi.userApi.getGithubConnectUrl(),
    onSuccess: ({ url }) => {
      openWindow(url);
    }
  });

  const disconnect = useMutation({
    mutationFn: () => webApi.userApi.unLinkGithub(),
    onSuccess: () => {
      toast.success('Github Unlinked');
      invalidate();
    }
  });

  const getGithubInfo = useMutation({
    mutationFn: () => webApi.userApi.getGithubInfo(),
    onSuccess: () => {
      toast.success('Developer profile updated');
      invalidate();
    }
  });

  const languages = React.useMemo(() => {
    const githubActivity = profile?.githubActivity;
    if (githubActivity?.languages) {
      const langs = githubActivity.languages;
      const sorted = Object.entries(langs).sort((a, b) => b[1] - a[1]);
      const total = sorted.reduce((acc, [_, value]) => acc + value, 0);

      let languages = [];
      if (sorted.length > 5) {
        const top4 = sorted.slice(0, 4);
        const others = sorted.slice(4).reduce((acc, [_, value]) => acc + value, 0);
        languages = [...top4, ['Others', others]];
      } else {
        languages = sorted;
      }

      return languages.map(([key, value]) => ({
        name: key,
        percent: (((value as number) / total) * 100).toFixed(1)
      }));
    } else {
      return [];
    }
  }, [profile]);

  React.useEffect(() => {
    function handler(event: MessageEvent) {
      const data = event.data;
      if (data.source === 'github') {
        if (data.message === 'success') {
          getGithubInfo.mutate();
        } else {
          toast.error('GitHub authorization failed. Please try again.');
        }
      }
    }
    window.addEventListener('message', handler);
    return () => {
      window.removeEventListener('message', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative self-start bg-neutral-white px-5 py-4 sm:rounded-2xl sm:border sm:border-neutral-light-gray sm:p-6">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Developer Profile</h2>
      {languages.length > 0 ? (
        <React.Fragment>
          {profile?.isCurrentUser && (
            <button
              type="button"
              className="absolute right-5 top-5 rounded-full p-2 transition-colors hover:bg-neutral-off-white"
              onClick={() => disconnect.mutate()}
            >
              <UnlinkIcon size={20} />
            </button>
          )}
          <h3 className="mt-5 font-bold sm:mt-8">Tech Stack</h3>
          <div className="my-4 flex h-2 w-full items-center overflow-hidden rounded-full">
            {languages?.map(({ name, percent }, index) => (
              <span key={name} className="h-full" style={{ width: `${percent}%`, backgroundColor: colors[index] }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {languages?.map(({ name, percent }, index) => (
              <div key={name} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: colors[index] }} />
                <span className="text-xs">{name}</span>
                <span className="text-xs text-neutral-medium-gray">{percent}%</span>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-y-2 sm:mt-8">
            <div className="flex items-center gap-6">
              <span className="w-[100px] text-sm font-bold">Total Stars</span>
              <span className="text-sm">{profile?.githubActivity?.totalStar}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="w-[100px] text-sm font-bold">Total Commits</span>
              <span className="text-sm">{profile?.githubActivity?.totalCommit}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="w-[100px] text-sm font-bold">Total PRs</span>
              <span className="text-sm">{profile?.githubActivity?.totalPr}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="w-[100px] text-sm font-bold">Total Issues</span>
              <span className="text-sm">{profile?.githubActivity?.totalIssue}</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="w-[100px] whitespace-nowrap text-sm font-bold">Contributed to</span>
              <span className="text-sm">{profile?.githubActivity?.totalContributor}</span>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Button
          className="mt-4 inline-flex w-[140px] gap-3 sm:mt-6"
          variant="outline"
          size="small"
          onClick={() => connectMutation.mutate()}
          isLoading={getGithubInfo.isPending}
        >
          <GithubIcon className="h-5 w-5" />
          <span>connect</span>
        </Button>
      )}
    </div>
  );
}
