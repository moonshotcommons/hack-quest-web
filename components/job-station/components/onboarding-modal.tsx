'use client';

import * as React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { CheckIcon, MoveRightIcon, PlusIcon } from 'lucide-react';
import { GithubIcon } from '@/components/ui/icons/github';
import { DiscordIcon } from '@/components/ui/icons/discord';
import { TwitterIcon } from '@/components/ui/icons/twitter';
import { LinkedInIcon } from '@/components/ui/icons/linkedin';
import { TelegramIcon } from '@/components/ui/icons/telegram';
import { WeChatIcon } from '@/components/ui/icons/wechat';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Spinner } from '@/components/ui/spinner';
import { omit } from 'lodash-es';
import { useProfile } from './profile-provider';
import {
  personalLinks,
  PersonalLinks,
  profileSchema,
  ProfileSchema
} from '@/components/user-profile/validations/profile';
import { Input } from '@/components/user-profile/common/input';
import { Textarea } from '@/components/user-profile/common/textarea';
import { Skills } from '@/components/user-profile/modals/skills';
import { MobileModalHeader } from '@/components/user-profile/modals/mobile-modal-header';
import { Steps } from '@/components/user-profile/common/steps';
import { UserAvatar } from '@/components/user-profile/modals/user-avatar';

function Step1({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) {
  const submitRef = React.useRef<HTMLInputElement>(null);
  const { profile, invalidate, isLoading } = useProfile();

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: profile?.user.nickname || '',
      email: profile?.user.email || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      techStack: profile?.techStack || []
    }
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (value: any) => webApi.userApi.editUserProfile(value),
    onSuccess: () => {
      toast.success('Profile updated');
      invalidate();
      setStep(2);
    }
  });

  function onSubmit(values: ProfileSchema) {
    mutate({
      ...values,
      progress: 1
    });
  }

  return (
    <React.Fragment>
      <h2 className="shrink-0 text-[22px] font-bold">We would like to know more about you!</h2>
      <div className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto sm:flex-row">
        <UserAvatar profile={profile} isLoading={isLoading} invalidate={invalidate} />
        <div className="flex w-full flex-col gap-8 sm:flex-1">
          <Form {...form}>
            <form
              className="no-scrollbar flex flex-1 flex-col space-y-5 overflow-y-auto sm:space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your nickname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea maxLength={160} placeholder="Your bio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Your location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Skills form={form} profile={profile} />
              <input ref={submitRef} type="submit" className="hidden" />
            </form>
          </Form>
        </div>
      </div>
      <Button
        isLoading={isPending}
        onClick={() => {
          submitRef.current?.click();
        }}
        className="mt-auto w-full shrink-0 sm:w-[270px] sm:self-end"
      >
        Continue
      </Button>
    </React.Fragment>
  );
}

function Step2({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) {
  const { profile, invalidate } = useProfile();

  const account = useAccount();
  const { connectModalOpen, openConnectModal } = useConnectModal();

  const connectMutation = useMutation({
    mutationFn: () => webApi.userApi.getGithubConnectUrl(),
    onSuccess: ({ url }) => {
      window.open(url, '_blank', 'width=500,height=500,toolbar=no,menubar=no,location=no,status=no');
    }
  });

  const getGithubInfo = useMutation({
    mutationFn: () => webApi.userApi.getGithubInfo(),
    onSuccess: () => {
      toast.success('Developer profile updated');
      invalidate();
    }
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!account?.isConnected && openConnectModal) {
        openConnectModal();
        return;
      }
      if (account) {
        const result = await webApi.userApi.linkChain(account?.address!);
        return result;
      }
    },
    onSuccess: () => {
      invalidate();
    }
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (value: any) => webApi.userApi.editUserProfile(value),
    onSuccess: () => {
      toast.success('Profile updated');
      invalidate();
      setStep(3);
    }
  });

  React.useEffect(() => {
    if (connectModalOpen) {
      document.body.style.pointerEvents = 'auto';
    }
  }, [connectModalOpen]);

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

  function onSubmit() {
    if (!profile?.githubActivity?.name) {
      toast.error('Please connect your GitHub account first');
      return;
    }
    if (!profile?.onChainActivity?.address) {
      toast.error('Please connect your wallet first');
      return;
    }
    mutate({ progress: 2 });
  }

  return (
    <React.Fragment>
      <h2 className="shrink-0 text-[22px] font-bold">Generate your Web3 builder profile</h2>
      <div className="no-scrollbar flex flex-1 flex-col gap-5 overflow-y-auto sm:gap-8">
        <div>
          <h3 className="font-bold">Web 3 Builder Experience</h3>
          <div className="mt-4 grid sm:grid-cols-2">
            <div className="flex items-center rounded-2xl border border-neutral-medium-gray p-4">
              <GithubIcon className="h-8 w-8" />
              <div className="ml-4 flex flex-col">
                <h4 className="font-bold">GitHub</h4>
                {profile?.githubActivity.name && (
                  <p className="text-xs text-neutral-rich-gray">{profile?.githubActivity.name}</p>
                )}
              </div>
              {profile?.githubActivity.name ? (
                <button className="ml-auto outline-none">
                  <CheckIcon size={20} className="text-status-success-dark" />
                </button>
              ) : (
                <button className="ml-auto outline-none" onClick={() => connectMutation.mutate()}>
                  {getGithubInfo.isPending ? (
                    <Spinner size={20} />
                  ) : (
                    <PlusIcon size={20} className="text-neutral-medium-gray" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold">On Chain Activities</h3>
          <div className="mt-4 grid sm:grid-cols-2">
            <div className="flex items-center rounded-2xl border border-neutral-medium-gray p-4">
              <Image src="/images/profile/metamask.svg" width={32} height={32} alt="metamask" />
              <div className="ml-4 flex flex-col">
                <h4 className="font-bold">Metamask</h4>
                <p className="text-xs text-neutral-rich-gray">
                  {profile?.onChainActivity?.address?.replace(/(.{15})(.*)(.{4})/, '$1...$3')}
                </p>
              </div>
              {profile?.onChainActivity?.address ? (
                <button type="button" className="ml-auto outline-none">
                  <CheckIcon size={20} className="text-status-success-dark" />
                </button>
              ) : (
                <button
                  disabled={mutation.isPending}
                  type="button"
                  className="ml-auto outline-none"
                  onClick={() => mutation.mutate()}
                >
                  {mutation.isPending ? <Spinner /> : <PlusIcon size={20} className="text-neutral-medium-gray" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <button
          className="flex items-center gap-2 outline-none"
          type="button"
          onClick={() => setStep(3)}
          aria-label="Skip"
        >
          <span>Skip for Now</span>
          <MoveRightIcon className="h-4 w-4" />
        </button>
        <Button isLoading={isPending} className="w-full sm:w-[270px]" onClick={onSubmit}>
          Continue
        </Button>
      </div>
    </React.Fragment>
  );
}

function Step3({ onClose }: { onClose?: () => void }) {
  const submitRef = React.useRef<HTMLInputElement>(null);
  const { profile, invalidate } = useProfile();

  const form = useForm<PersonalLinks>({
    resolver: zodResolver(personalLinks),
    defaultValues: {
      ...profile?.personalLinks
    }
  });

  const connectMutation = useMutation({
    mutationFn: () => webApi.userApi.getConnectUrlByDiscord(),
    onSuccess: ({ url }) => {
      window.open(url, '_blank', 'width=500,height=500,toolbar=no,menubar=no,location=no,status=no');
    }
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (value: any) => webApi.userApi.editUserProfile(value),
    onSuccess: () => {
      toast.success('Profile updated');
      onClose?.();
      setTimeout(() => {
        invalidate();
      }, 1000);
    }
  });

  function onSubmit(data: PersonalLinks) {
    const omitedData = omit(data, ['github']);
    if (Object.values(omitedData).every((value) => !value)) {
      toast.error('Please fill in at least one link');
      return;
    }
    mutate({ personalLinks: data, progress: 3 });
  }

  return (
    <Form {...form}>
      <h2 className="shrink-0 text-[22px] font-bold">Connect accounts to grow your network</h2>
      <div className="no-scrollbar flex flex-1 flex-col gap-5 overflow-y-auto sm:gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="font-bold">Link Accounts</h3>
          <div className="grid sm:grid-cols-2">
            <div className="flex items-center rounded-2xl border border-neutral-medium-gray p-4">
              <DiscordIcon className="h-8 w-8" />
              <div className="ml-4 flex flex-col">
                <h4 className="font-bold">Discord</h4>
                {profile?.personalLinks?.discord && (
                  <p className="text-xs text-neutral-rich-gray">{profile?.personalLinks?.discord}</p>
                )}
              </div>
              {profile?.personalLinks?.discord ? (
                <button type="button" className="ml-auto outline-none">
                  <CheckIcon size={20} className="text-status-success-dark" />
                </button>
              ) : (
                <button type="button" className="ml-auto outline-none" onClick={() => connectMutation.mutate()}>
                  <PlusIcon size={20} className="text-neutral-medium-gray" />
                </button>
              )}
            </div>
          </div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <h3 className="font-bold">Display on Profile</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <TwitterIcon className="h-6 w-6" />
              <span className="min-w-24 hidden text-sm sm:block">Twitter</span>
            </div>
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <LinkedInIcon className="h-6 w-6" />
              <span className="min-w-24 hidden text-sm sm:block">LinkedIn</span>
            </div>
            <FormField
              control={form.control}
              name="linkedIn"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <TelegramIcon className="h-6 w-6" />
              <span className="min-w-24 hidden text-sm sm:block">Telegram</span>
            </div>
            <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <WeChatIcon className="h-6 w-6" />
              <span className="min-w-24 hidden text-sm sm:block">WeChat</span>
            </div>
            <FormField
              control={form.control}
              name="wechat"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <input ref={submitRef} type="submit" className="hidden" />
        </form>
      </div>
      <div className="flex shrink-0 flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <button className="flex items-center gap-2 outline-none" type="button" onClick={onClose} aria-label="skip">
          <span>Skip for Now</span>
          <MoveRightIcon className="h-4 w-4" />
        </button>
        <Button isLoading={isPending} className="w-full sm:w-[270px]" onClick={() => submitRef.current?.click()}>
          Continue
        </Button>
      </div>
    </Form>
  );
}

const steps = [Step1, Step2, Step3];

export function OnboardingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = React.useState(1);
  const { profile } = useProfile();

  const Component = steps[step - 1] || null;

  React.useEffect(() => {
    if (profile?.progress && open) {
      const progress = profile.progress;
      if (!progress.includes(1)) {
        setStep(1);
      } else if (!progress.includes(2)) {
        setStep(2);
      } else if (!progress.includes(3)) {
        setStep(3);
      }
    }
  }, [open, profile?.progress]);

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent
        className="flex h-full flex-col gap-5 px-5 pt-0 sm:h-auto sm:w-[1000px] sm:max-w-[1000px] sm:gap-8 sm:p-12"
        stopPropagation
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <MobileModalHeader />
        <Steps currentStep={step} />
        <Component setStep={setStep} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
