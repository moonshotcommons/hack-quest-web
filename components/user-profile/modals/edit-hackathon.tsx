'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '../common/textarea';
import { Input } from '../common/input';
import { hackathonSchema, type HackathonSchema } from '../validations/hackathon';
import { Checkbox } from '@/components/ui/checkbox';
import { UserHackathonType } from '@/service/webApi/user/type';
import { EditIcon } from '@/components/ui/icons/edit';
import { PlusIcon } from 'lucide-react';
import { RemoveAlert } from '../common/remove-alert';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { useToggle } from '@/hooks/utils/use-toggle';
import { message } from 'antd';
import { useProfile } from '../modules/profile-provider';

export function EditHackathon({
  type,
  initialValues = null
}: {
  type: 'create' | 'edit';
  initialValues?: UserHackathonType | null;
}) {
  const [open, toggle] = useToggle(false);
  const { invalidate } = useProfile();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const form = useForm<HackathonSchema>({
    resolver: zodResolver(hackathonSchema),
    defaultValues: {
      projectTitle: '',
      hackathonName: '',
      description: '',
      winner: false
    }
  });

  const create = useMutation({
    mutationFn: (data: any) => webApi.userApi.addHackathon(data),
    onSuccess: () => {
      toggle(false);
      message.success('Hackathon added successfully');
      invalidate();
    }
  });

  const update = useMutation({
    mutationKey: ['update-hackathon', initialValues?.id],
    mutationFn: (data: any) => webApi.userApi.editHackathon(initialValues?.id as string, data),
    onSuccess: () => {
      toggle(false);
      message.success('Hackathon updated successfully');
      invalidate();
    }
  });

  const remove = useMutation({
    mutationFn: () => webApi.userApi.deleteHackathon(initialValues?.id as string),
    onSuccess: () => {
      toggle(false);
      message.success('Hackathon removed successfully');
      invalidate();
    }
  });

  function onSubmit(values: HackathonSchema) {
    if (type === 'create') {
      create.mutate(values);
    } else {
      update.mutate(values);
    }
  }

  React.useEffect(() => {
    if (initialValues) {
      form.reset({
        projectTitle: initialValues?.projectTitle,
        hackathonName: initialValues?.hackathonName,
        description: initialValues?.description,
        winner: initialValues?.winner
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <button type="button" className="outline-none" onClick={toggle}>
          {type === 'edit' ? (
            <EditIcon className="h-5 w-5 text-neutral-medium-gray" />
          ) : (
            <PlusIcon className="h-6 w-6" />
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="flex h-screen flex-col gap-0 px-5 py-0 sm:h-auto sm:w-[900px] sm:max-w-[900px] sm:gap-6 sm:px-8 sm:py-16 sm:pb-8">
        <DialogHeader className="shrink-0 text-left">
          <DialogTitle className="text-[22px]">{type === 'create' ? 'Add' : 'Edit'} Hackathon</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="no-scrollbar mt-5 flex-1 space-y-5 overflow-y-auto p-0.5 sm:mt-0 sm:space-y-6"
          >
            <FormField
              control={form.control}
              name="projectTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hackathonName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hackathon Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Hackathon Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea maxLength={600} placeholder="Description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="winner"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2.5 space-y-0">
                  <FormControl>
                    <Checkbox
                      size="large"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked as any)}
                    />
                  </FormControl>
                  <FormLabel className="text-neutral-medium-gray peer-aria-checked:text-neutral-off-black">
                    I am the winner of the Hackathon
                  </FormLabel>
                </FormItem>
              )}
            />
            <input ref={inputRef} type="submit" className="hidden" />
          </form>
          <div className="flex w-full shrink-0 flex-col justify-end gap-3 pb-5 sm:flex-row sm:pb-0">
            {type === 'edit' && (
              <RemoveAlert
                loading={remove.isPending}
                title="Are you sure you want to remove this hackathon?"
                description="This action cannot be undone."
                onConfirm={() => remove.mutate()}
              />
            )}
            <Button
              className="w-[165px] shrink-0 self-end"
              isLoading={create.isPending || update.isPending}
              onClick={() => inputRef.current?.click()}
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
