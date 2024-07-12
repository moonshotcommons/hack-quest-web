'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '../common/textarea';
import { Input } from '../common/input';
import { type ProfileSchema, profileSchema } from '../validations/profile';
import { Label } from '@/components/ui/label';
import { PlusIcon, XIcon } from 'lucide-react';
import { EditIcon } from '@/components/ui/icons/edit';

export const EditProfile = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema)
  });
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
      <DialogContent className="flex w-[900px] max-w-[900px] flex-col gap-6 px-8 py-16 pb-8">
        <DialogHeader className="shrink-0 text-left">
          <DialogTitle className="text-[22px]">Edit Basic Information</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="no-scrollbar flex-1 space-y-6 overflow-y-auto px-0.5">
            <div className="grid grid-cols-2 gap-4">
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
                      <Input readOnly defaultValue="evan@gmail.com" placeholder="Your email" {...field} />
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
            <input ref={inputRef} type="submit" className="hidden" />
          </form>
          <Button className="w-[165px] shrink-0 self-end" onClick={() => inputRef.current?.click()}>
            Save Changes
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
