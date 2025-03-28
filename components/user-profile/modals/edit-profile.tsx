'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '../common/textarea';
import { Input } from '../common/input';
import { type ProfileSchema, profileSchema } from '../validations/profile';
import { SocialMedia } from '../modules/social-media';
import { Skills } from './skills';
import { UserAvatar } from './user-avatar';
import { Background } from './background';
import { useProfile } from '../modules/profile-provider';
import { MobileModalHeader } from './mobile-modal-header';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import toast from 'react-hot-toast';
import { useModal } from '../utils/modal';

export const EditProfile = () => {
  const { open, type, onClose } = useModal();
  const { profile, invalidate, isLoading } = useProfile();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isOpen = open && type === 'profile';

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: profile?.user.nickname || '',
      email: profile?.user.email || '',
      bio: profile?.bio || '',
      location: profile?.location || '',
      techStack: profile?.techStack || [],
      personalLinks: profile?.personalLinks || {}
    }
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (value: any) => webApi.userApi.editUserProfile(value),
    onSuccess: () => {
      toast.success('Profile updated');
      invalidate();
      onClose();
    }
  });

  React.useEffect(() => {
    form.reset({
      nickname: profile?.user.nickname || '',
      bio: profile?.bio || '',
      email: profile?.user.email || '',
      location: profile?.location || '',
      techStack: profile?.techStack || [],
      personalLinks: profile?.personalLinks || {}
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  function onSubmit(data: ProfileSchema) {
    mutate(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="flex h-full flex-col gap-0 p-0 sm:h-auto sm:w-[900px] sm:max-w-[900px] sm:gap-6">
        <MobileModalHeader />
        <Background />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="documentation-scrollbar relative flex flex-1 flex-col gap-5 overflow-y-auto p-5 sm:flex-row sm:gap-8 sm:p-8"
          >
            <UserAvatar profile={profile} isLoading={isLoading} invalidate={invalidate} />
            <div className="flex flex-1 flex-col gap-5 sm:gap-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input readOnly type="email" placeholder="Your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
              <SocialMedia form={form} />
            </div>
            <input ref={inputRef} type="submit" className="hidden" />
          </form>
          <div className="flex shrink-0 px-5 pb-5 sm:self-end sm:px-8 sm:pb-8">
            <Button
              isLoading={isPending}
              type="submit"
              className="w-full sm:w-[165px]"
              onClick={() => inputRef.current?.click()}
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
