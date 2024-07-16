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
import { useProfile } from '../utils';
import { Skeleton } from '@/components/shared/skeleton';
import { useCropImage } from './crop-image-modal';
import { FileInput } from '../common/file-input';
import { GithubIcon } from '@/components/ui/icons/github';

function Step1() {
  const { loading, data: profile } = useProfile();
  const { onOpen, onClose } = useCropImage();
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
    <div className="flex flex-col gap-8">
      <h2 className="text-[22px] font-bold">We would like to know more about you!</h2>
      <div className="flex gap-8">
        <div className="group relative h-40 w-40 shrink-0 rounded-full">
          <Skeleton loading={loading} className="rounded-full">
            <Image src={profile?.user?.avatar || ''} alt="avatar" fill className="rounded-full" />
            <FileInput
              className="absolute inset-0 rounded-full bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              onFileChange={onOpen}
            />
          </Skeleton>
        </div>
        <div className="flex-1">
          <Form {...form}>
            <form className="flex flex-col space-y-6">
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
              <Button type="submit" className="w-[270px] self-end">
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-[22px] font-bold">Generate your Web3 builder profile</h2>
      <div>
        <h3 className="font-bold">Web 3 Builder Experience</h3>
        <div className="mt-4 grid grid-cols-2">
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
        <div className="mt-4 grid grid-cols-2">
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
        <div className="mt-4 grid grid-cols-2 gap-4">
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
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 outline-none">
          <span>Skip for Now</span>
          <MoveRightIcon className="h-4 w-4" />
        </button>
        <Button className="w-[270px]">Continue</Button>
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-[22px] font-bold">Connect accounts to grow your network</h2>
    </div>
  );
}

const steps = [Step1, Step2, Step3];

export function OnboardingModal() {
  const [step, setStep] = React.useState(2);

  const Component = steps[step - 1] || null;

  return (
    <Dialog open={false}>
      <DialogContent className="flex w-[1000px] max-w-[1000px] flex-col gap-8 p-12">
        <Steps currentStep={step} />
        <Component />
      </DialogContent>
    </Dialog>
  );
}
