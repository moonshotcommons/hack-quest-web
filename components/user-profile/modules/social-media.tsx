'use client';

import * as React from 'react';
import { Input } from '../common/input';
import { DiscordIcon } from '@/components/ui/icons/discord';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { TwitterIcon } from '@/components/ui/icons/twitter';
import { LinkedInIcon } from '@/components/ui/icons/linkedin';
import { TelegramIcon } from '@/components/ui/icons/telegram';
import { WeChatIcon } from '@/components/ui/icons/wechat';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { useProfile } from './profile-provider';
import { UseFormReturn } from 'react-hook-form';
import { ProfileSchema } from '../validations/profile';
import { GithubIcon } from '@/components/ui/icons/github';

export function SocialMedia({ form }: { form: UseFormReturn<ProfileSchema> }) {
  const { profile, invalidate } = useProfile();

  const connectMutation = useMutation({
    mutationFn: () => webApi.userApi.getConnectUrlByDiscord(),
    onSuccess: ({ url }) => {
      window.open(url, '_blank', 'width=500,height=500,toolbar=no,menubar=no,location=no,status=no');
    }
  });

  const disconnectMutation = useMutation({
    // @ts-ignore
    mutationFn: () => webApi.userApi.disconnect('discord'),
    onSuccess: () => {
      invalidate();
    }
  });

  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-base text-neutral-rich-gray">Social Media</h2>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <DiscordIcon className="h-6 w-6" />
            <span className="hidden min-w-28 text-sm sm:block">Discord</span>
          </div>
          {profile?.personalLinks?.discord ? (
            <div className="flex w-full items-center gap-4">
              <div className="relative flex-1">
                <Input readOnly className="h-[38px]" defaultValue={profile?.personalLinks?.discord} />
                <span className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 text-status-success-dark">
                  <CheckIcon className="h-4 w-4" />
                  <span className="text-xs">Linked</span>
                </span>
              </div>
              <button
                className="text-xs text-status-error-dark outline-none"
                onClick={() => disconnectMutation.mutate()}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              disabled={connectMutation.isPending}
              className="inline-flex items-center justify-center gap-1 rounded-[8px] border border-neutral-light-gray px-3 py-2 text-sm outline-none"
              onClick={() => connectMutation.mutate()}
            >
              <PlusIcon className="h-5 w-5" />
              <span>Link Account</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <TwitterIcon className="h-6 w-6" />
            <span className="hidden min-w-28 text-sm sm:block">Twitter</span>
          </div>
          <FormField
            control={form.control}
            name="personalLinks.twitter"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="h-[38px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <GithubIcon className="h-6 w-6" />
            <span className="hidden min-w-28 text-sm sm:block">Github</span>
          </div>
          <FormField
            control={form.control}
            name="personalLinks.github"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="h-[38px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <LinkedInIcon className="h-6 w-6" />
            <span className="hidden min-w-28 text-sm sm:block">LinkedIn</span>
          </div>
          <FormField
            control={form.control}
            name="personalLinks.linkedIn"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="h-[38px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <TelegramIcon className="h-6 w-6" />
            <span className="hidden min-w-28 text-sm sm:block">Telegram</span>
          </div>
          <FormField
            control={form.control}
            name="personalLinks.telegram"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="h-[38px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <WeChatIcon className="h-6 w-6" />
            <span className="hidden min-w-28 text-sm sm:block">WeChat</span>
          </div>
          <FormField
            control={form.control}
            name="personalLinks.wechat"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input className="h-[38px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
