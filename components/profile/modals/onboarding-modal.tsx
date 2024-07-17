'use client';

import * as React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '../common/textarea';
import { Input } from '../common/input';
import { type ProfileSchema, profileSchema } from '../validations/profile';
import { Label } from '@/components/ui/label';
import { MoveRightIcon, PlusIcon, XIcon } from 'lucide-react';
import { Steps } from '../common/steps';
import { GithubIcon } from '@/components/ui/icons/github';
import { useProfile } from '../modules/profile-provider';
import { MobileModalHeader } from './mobile-modal-header';
import { UserAvatar } from './user-avatar';

function Step1() {
  const { isLoading, profile } = useProfile();
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      bio: '',
      location: ''
    }
  });
  return (
    <div className="flex h-full flex-col gap-8">
      <h2 className="text-[22px] font-bold">We would like to know more about you!</h2>
      <div className="flex flex-1 flex-col gap-8 sm:flex-row">
        <UserAvatar />
        <div className="flex flex-1 flex-col">
          <Form {...form}>
            <form className="no-scrollbar flex flex-1 flex-col space-y-5 overflow-y-auto sm:space-y-6">
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
              <div>
                <Label className="text-base text-neutral-rich-gray">Skills</Label>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <button className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-neutral-off-white px-3 py-1">
                    <XIcon size={20} />
                    <span>TypeScript</span>
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-neutral-off-white px-3 py-1">
                    <XIcon size={20} />
                    <span>React</span>
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-neutral-light-gray px-3 py-1 transition-colors duration-300 hover:border-neutral-medium-gray">
                    <PlusIcon size={20} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </form>
            <Button type="submit" className="mt-auto w-full sm:w-[270px] sm:self-end">
              Continue
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Step2() {
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
                <p className="text-xs text-neutral-rich-gray">evan976</p>
              </div>
              <button className="ml-auto outline-none">
                <PlusIcon size={20} className="text-neutral-medium-gray" />
              </button>
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
                <p className="text-xs text-neutral-rich-gray">evan976</p>
              </div>
              <button className="ml-auto outline-none">
                <PlusIcon size={20} className="text-neutral-medium-gray" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Other Web3 IDs</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex items-center rounded-2xl border border-neutral-medium-gray p-4">
              <Image src="/images/profile/metamask.svg" width={32} height={32} alt="metamask" />
              <div className="ml-4 flex flex-col">
                <h4 className="font-bold">Metamask</h4>
                <p className="text-xs text-neutral-rich-gray">evan976</p>
              </div>
              <button className="ml-auto outline-none">
                <PlusIcon size={20} className="text-neutral-medium-gray" />
              </button>
            </div>
            <div className="flex items-center rounded-2xl border border-neutral-medium-gray p-4">
              <Image src="/images/profile/metamask.svg" width={32} height={32} alt="metamask" />
              <div className="ml-4 flex flex-col">
                <h4 className="font-bold">Metamask</h4>
                <p className="text-xs text-neutral-rich-gray">evan976</p>
              </div>
              <button className="ml-auto outline-none">
                <PlusIcon size={20} className="text-neutral-medium-gray" />
              </button>
            </div>
            <div className="flex items-center rounded-2xl border border-neutral-medium-gray p-4">
              <Image src="/images/profile/metamask.svg" width={32} height={32} alt="metamask" />
              <div className="ml-4 flex flex-col">
                <h4 className="font-bold">Metamask</h4>
                <p className="text-xs text-neutral-rich-gray">evan976</p>
              </div>
              <button className="ml-auto outline-none">
                <PlusIcon size={20} className="text-neutral-medium-gray" />
              </button>
            </div>
            <div className="flex items-center rounded-2xl border border-neutral-medium-gray p-4">
              <Image src="/images/profile/metamask.svg" width={32} height={32} alt="metamask" />
              <div className="ml-4 flex flex-col">
                <h4 className="font-bold">Metamask</h4>
                <p className="text-xs text-neutral-rich-gray">evan976</p>
              </div>
              <button className="ml-auto outline-none">
                <PlusIcon size={20} className="text-neutral-medium-gray" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 flex-col-reverse items-center justify-between gap-4 sm:flex-row">
        <button className="flex items-center gap-2 outline-none">
          <span>Skip for Now</span>
          <MoveRightIcon className="h-4 w-4" />
        </button>
        <Button className="w-full sm:w-[270px]">Continue</Button>
      </div>
    </React.Fragment>
  );
}

function Step3() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="shrink-0 text-[22px] font-bold">Connect accounts to grow your network</h2>
    </div>
  );
}

const steps = [Step1, Step2, Step3];

export function OnboardingModal() {
  const [step, setStep] = React.useState(1);

  const Component = steps[step - 1] || null;

  return (
    <Dialog open={false}>
      <DialogContent className="flex h-screen flex-col gap-5 px-5 pt-0 sm:h-auto sm:w-[1000px] sm:max-w-[1000px] sm:gap-8 sm:p-12">
        <MobileModalHeader />
        <Steps currentStep={step} />
        <Component />
      </DialogContent>
    </Dialog>
  );
}
