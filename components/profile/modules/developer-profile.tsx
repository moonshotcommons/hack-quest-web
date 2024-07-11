'use client';

import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/ui/icons/github';
import webApi from '@/service';
import { useMutation } from '@tanstack/react-query';

function openWindow(url: string) {
  const width = 680;
  const height = 500;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;

  window.open(
    url,
    '_blank',
    `toolbar=no, menubar=no, location=no, status=no, width=${width}, height=${height}, top=${top}, left=${left}`
  );
}

export function DeveloperProfile() {
  const connectMutation = useMutation({
    mutationFn: () => webApi.userApi.getGithubConnectUrl(),
    onSuccess: ({ url }) => {
      openWindow(url);
    }
  });

  return (
    <div className="bg-neutral-white px-5 py-4 sm:rounded-2xl sm:border sm:border-neutral-light-gray sm:p-6">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Developer Profile</h2>
      <Button
        className="mt-4 inline-flex w-[140px] gap-3 sm:mt-6"
        variant="outline"
        size="small"
        onClick={() => connectMutation.mutate()}
        disabled={connectMutation.isPending}
      >
        <GithubIcon className="h-5 w-5" />
        <span>connect</span>
      </Button>
    </div>
  );
}
