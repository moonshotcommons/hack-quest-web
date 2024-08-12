'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '../common/textarea';
import { Input } from '../common/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../common/select';
import { experienceSchema, type ExperienceSchema } from '../validations/experience';
import { EMPLOYMENT_TYPE, MONTHS, YEARS } from '../constants';
import { EditIcon } from '@/components/ui/icons/edit';
import { UserExperienceType } from '@/service/webApi/user/type';
import { PlusIcon } from 'lucide-react';
import { omit } from 'lodash-es';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { useToggle } from '@/hooks/utils/use-toggle';
import { RemoveAlert } from '../common/remove-alert';
import { useProfile } from '../modules/profile-provider';
import { MobileModalHeader } from './mobile-modal-header';
import toast from 'react-hot-toast';

export function EditExperience({
  type,
  iconOnly = true,
  initialValues = null,
  label
}: {
  type: 'create' | 'edit';
  iconOnly?: boolean;
  initialValues?: UserExperienceType | null;
  label?: string;
}) {
  const [open, toggle] = useToggle(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { invalidate } = useProfile();

  const form = useForm<ExperienceSchema>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: '',
      companyName: '',
      location: '',
      description: ''
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => webApi.userApi.addExperience(data),
    onSuccess: () => {
      toggle(false);
      toast.success('Experience created');
      invalidate();
    }
  });

  const updateMutation = useMutation({
    mutationKey: ['update-experience', initialValues?.id],
    mutationFn: (data: any) => webApi.userApi.editExperience(initialValues?.id as string, data),
    onSuccess: () => {
      toggle(false);
      toast.success('Experience updated');
      invalidate();
    }
  });

  const removeMutation = useMutation({
    mutationKey: ['remove-experience', initialValues?.id],
    mutationFn: () => webApi.userApi.deleteExperience(initialValues?.id as string),
    onSuccess: () => {
      toggle(false);
      toast.success('Experience removed');
      invalidate();
    }
  });

  function onSubmit(data: ExperienceSchema) {
    const values = {
      ...omit(data, 'startMonth', 'startYear', 'endMonth', 'endYear'),
      isCurrentWork: false,
      startDate: `${data.startMonth} ${data.startYear}`,
      ...(data.endYear &&
        data.endMonth && {
          endDate: `${data.endMonth} ${data.endYear}`
        })
    };

    if (type === 'create') {
      createMutation.mutate(values);
    } else {
      updateMutation.mutate(values);
    }
  }

  React.useEffect(() => {
    if (initialValues) {
      form.reset({
        ...initialValues,
        startMonth: initialValues.startDate?.split(' ')[0],
        startYear: initialValues.startDate?.split(' ')[1],
        endMonth: initialValues.endDate?.split(' ')[0],
        endYear: initialValues.endDate?.split(' ')[1]
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogTrigger asChild>
        {label ? (
          <button className="self-start text-sm underline outline-none" onClick={toggle}>
            {label}
          </button>
        ) : !iconOnly ? (
          <Button className="w-[165px]" size="small" onClick={toggle}>
            Add Experience
          </Button>
        ) : (
          <button type="button" className="outline-none" onClick={toggle}>
            {type === 'edit' ? (
              <EditIcon className="h-5 w-5 text-neutral-medium-gray" />
            ) : (
              <PlusIcon className="h-6 w-6" />
            )}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="flex h-full flex-col gap-0 px-5 py-0 sm:h-auto sm:w-[900px] sm:max-w-[900px] sm:gap-6 sm:px-8 sm:py-16 sm:pb-8">
        <MobileModalHeader />
        <DialogHeader className="shrink-0 text-left">
          <DialogTitle className="text-lg sm:text-[22px]">{type === 'edit' ? 'Edit' : 'Add'} Experience</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="no-scrollbar mt-5 flex-1 space-y-5 overflow-y-auto p-0.5 sm:mt-0 sm:space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Google" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. London" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type*</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EMPLOYMENT_TYPE.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea maxLength={600} placeholder="e.g. I worked on Google's product" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date*</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MONTHS.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="opacity-0">Start Date</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {YEARS.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="!mb-5 grid grid-cols-2 gap-4 sm:mb-0">
              <FormField
                control={form.control}
                name="endMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MONTHS.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="opacity-0">Start Date</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {YEARS.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <input ref={inputRef} type="submit" className="hidden" />
          </form>
          <div className="flex w-full shrink-0 flex-col justify-end gap-3 pb-5 sm:flex-row sm:pb-0">
            {type === 'edit' && (
              <RemoveAlert
                loading={removeMutation.isPending}
                title="Are you sure you want to remove this experience?"
                description="This action cannot be undone."
                onConfirm={() => {
                  removeMutation.mutate();
                }}
              />
            )}
            <Button
              className="w-full sm:w-[165px]"
              isLoading={createMutation.isPending || updateMutation.isPending}
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
