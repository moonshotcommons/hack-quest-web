'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '../common/textarea';
import { Input } from '../common/input';
import { type ProfileSchema, profileSchema } from '../validations/profile';
import { EditIcon } from '@/components/ui/icons/edit';
import { SocialMedia } from '../modules/social-media';
import { Skills } from './skills';
import { UserAvatar } from './user-avatar';
import { Background } from './background';
import { useProfile } from '../modules/profile-provider';
import { MobileModalHeader } from './mobile-modal-header';

export const EditProfile = () => {
  const { isLoading, profile } = useProfile();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema)
  });

  React.useEffect(() => {
    form.reset({
      name: profile?.user.nickname,
      email: profile?.user.email,
      location: profile?.location
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  function onSubmit(data: ProfileSchema) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <EditIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="flex h-screen flex-col gap-0 p-0 sm:h-auto sm:w-[900px] sm:max-w-[900px] sm:gap-6">
        <MobileModalHeader />
        <Background />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="no-scrollbar relative flex flex-1 flex-col gap-5 overflow-y-auto p-5 sm:flex-row sm:gap-8 sm:p-8"
          >
            <UserAvatar />
            <div className="flex flex-1 flex-col gap-5 sm:gap-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
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
              <Skills />
              <SocialMedia />
            </div>
            <input ref={inputRef} type="submit" className="hidden" />
          </form>
          <div className="flex shrink-0 px-5 pb-5 sm:self-end sm:px-8 sm:pb-8">
            <Button type="submit" className="w-full sm:w-[165px]" onClick={() => inputRef.current?.click()}>
              Save Changes
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
