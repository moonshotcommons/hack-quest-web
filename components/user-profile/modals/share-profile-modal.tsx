'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '../common/input';
import { EditIcon } from '@/components/ui/icons/edit';
import { ShareIcon } from '@/components/ui/icons/share';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { useRouter } from 'next/navigation';
import {
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'next-share';
import { useProfile } from '../modules/profile-provider';
import toast from 'react-hot-toast';

export function ShareProfile() {
  const router = useRouter();
  const { profile } = useProfile();
  const [isEditing, setIsEditing] = React.useState(false);
  const [username, setUsername] = React.useState(profile?.user?.username);
  const [error, setError] = React.useState('');

  const url = `https://www.hackquest.io/user/${username}`;

  const mutation = useMutation({
    mutationFn: (username: string) => webApi.userApi.updateUsername(username),
    onSuccess: () => {
      router.replace('/user/' + username);
      setIsEditing(false);
      setError('');
    }
  });

  React.useEffect(() => {
    if (profile) {
      setUsername(profile?.user?.username);
    }
  }, [profile]);

  function copyLink() {
    try {
      navigator.clipboard.writeText(url);
      toast.success('Link copied');
    } catch (error) {
      toast.error('The browser version is too low or incompatible');
    }
  }

  function onSave() {
    if (!username) {
      setError('Please enter a username');
      return;
    }
    if (!username.match(/^[a-zA-Z0-9]{3,50}$/)) {
      setError('The URL is usually 3-50 letters or numbers without special characters like @, !, &');
      return;
    }
    if (profile?.user?.username === username) {
      setIsEditing(false);
      return;
    }
    mutation.mutate(username);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="outline-none">
          <ShareIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[92.5%] gap-5 rounded-xl px-5 pb-5 pt-12 sm:w-[640px] sm:max-w-[640px] sm:gap-8 sm:p-12">
        <DialogHeader className="shrink-0 text-left">
          <DialogTitle className="text-[22px]">Share Profile</DialogTitle>
        </DialogHeader>
        <div className="">
          <label className="text-neutral-rich-gray">
            {profile?.isCurrentUser ? 'Custom' : 'HackQuest'} Profile URL
          </label>
          <div className="flex items-center">
            <p className="h-12 leading-[48px] text-neutral-off-black">www.hackquest.io/user/</p>
            {isEditing ? (
              <Input className="ml-1" value={username} onChange={(e) => setUsername(e.target.value)} />
            ) : (
              <div className="flex w-full items-center justify-between">
                <span>{username}</span>
                {profile?.isCurrentUser && (
                  <button className="hidden outline-none sm:flex" onClick={() => setIsEditing(true)}>
                    <EditIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
          {isEditing ? (
            <div className="mt-4 flex flex-col">
              {error ? (
                <p className="text-status-error-dark">{error}</p>
              ) : (
                <p className="text-neutral-medium-gray">The URL is usually 3-50 letters or numbers</p>
              )}
              <Button
                className="mt-5 w-full sm:mt-8 sm:w-[165px] sm:self-end"
                isLoading={mutation.isPending}
                onClick={onSave}
              >
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="mt-5 flex flex-col items-center gap-5 sm:mt-8 sm:flex-row sm:gap-8">
              <Button className="w-full sm:hidden sm:w-[165px]" onClick={() => setIsEditing(true)}>
                Edit Link
              </Button>
              <Button variant="outline" className="w-full sm:w-[165px]" onClick={copyLink}>
                Copy Link
              </Button>
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <span>Or Share With</span>
                <div className="flex gap-6">
                  <TwitterShareButton url={url}>
                    <TwitterIcon className="h-6 w-6" round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={url}>
                    <WhatsappIcon className="h-6 w-6" round />
                  </WhatsappShareButton>
                  <TelegramShareButton url={url}>
                    <TelegramIcon className="h-6 w-6" round />
                  </TelegramShareButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
