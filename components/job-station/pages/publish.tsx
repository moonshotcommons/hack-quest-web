'use client';

import * as React from 'react';
import * as z from 'zod';
import { XIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next-nprogress-bar';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/user-profile/common/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Steps } from '../components/steps';
import { companySchema, contacts, contactsSchema, currencies, jobSchema, workModes, workTypes } from '../validations';
import { RadioGroup, RadioGroupItem } from '../components/radio-group';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/user-profile/common/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useJobStore } from '../utils/store';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import Image from 'next/image';
import { TagCombobox } from '../components/tag-combobox-new';
import { Textarea } from '@/components/user-profile/common/textarea';
import toast from 'react-hot-toast';
import { Spinner } from '@/components/ui/spinner';
import { useParams } from 'next/navigation';
import { revalidate } from '../utils/actions';
import { useUserStore } from '@/store/zustand/userStore';
import { omit } from 'lodash-es';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('@/components/Common/TextEditor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

function Step1() {
  const { values, onNext, setValues } = useJobStore();
  const submitRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: values?.companyName || '',
      companyLogo: values?.companyLogo || '',
      website: values?.website || ''
    }
  });

  const companyLogo = form.watch('companyLogo');

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => webApi.commonApi.uploadImage(data),
    onSuccess: ({ filepath }) => {
      form.setValue('companyLogo', filepath);
      setValues({ companyLogo: filepath });
      form.clearErrors('companyLogo');
      toast.success('Company logo uploaded');
    },
    onError: () => {
      form.clearErrors('companyLogo');
      toast.error('Company logo upload failed');
    }
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filepath', 'jobs');
      formData.append('isPublic', 'true');
      mutate(formData);
    }
  }

  function onSubmit(data: z.infer<typeof companySchema>) {
    setValues(data);
    onNext();
  }

  return (
    <Form {...form}>
      <form className="w-full flex-1 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name*</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Google"
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setValues({ companyName: e.target.value });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="logo">Company Logo*</Label>
          {isPending ? (
            <Spinner size={24} />
          ) : companyLogo ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image src={companyLogo} alt="logo" fill />
              <label className="absolute inset-0 h-full w-full cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={onChange} />
              </label>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Button variant="outline" size="small" className="w-[140px]" asChild>
                <div className="relative cursor-pointer">
                  <label className="absolute inset-0 h-full w-full cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={onChange} />
                  </label>
                  <span>Upload File</span>
                </div>
              </Button>
              <p className="text-neutral-medium-gray">Support file type: jpeg, png, pdf no larger than 5mb</p>
            </div>
          )}
          {form.formState.errors.companyLogo && (
            <p role="alert" className="text-status-error-dark">
              {form.formState.errors.companyLogo?.message}
            </p>
          )}
        </div>
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website*</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. https://google.com"
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setValues({ website: e.target.value });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <input type="submit" ref={submitRef} className="hidden" />
      </form>
      <Button
        type="submit"
        className="mt-20 w-full sm:mt-0 sm:w-[270px] sm:self-end"
        onClick={() => submitRef.current?.click()}
      >
        Continue
      </Button>
    </Form>
  );
}

function Step2() {
  const { values, onBack, onNext, setValues } = useJobStore();

  const submitRef = React.useRef<HTMLInputElement>(null);
  const [html, setHtml] = React.useState('');

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      name: values?.name || '',
      workMode: values?.workMode || 'REMOTE',
      workType: values?.workType || 'FULL_TIME',
      minSalary: values?.minSalary?.toString() || '',
      maxSalary: values?.maxSalary?.toString() || '',
      currency: values?.currency || undefined,
      tags: values?.tags || [],
      description: values?.description || undefined
    }
  });

  const isOnSite = form.watch('workMode') === 'ONSITE';

  const tags = form.watch('tags');

  function onSubmit(data: z.infer<typeof jobSchema>) {
    setValues({
      ...data,
      minSalary: data.minSalary ? z.coerce.number().parse(data.minSalary) : null,
      maxSalary: data.maxSalary ? z.coerce.number().parse(data.maxSalary) : null
    });
    onNext();
  }

  return (
    <Form {...form}>
      <form className="w-full flex-1 space-y-6 pb-10" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title*</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Software Engineer"
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setValues({ name: e.target.value });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-1.5">
          <Label className="text-base">Location</Label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <FormField
              control={form.control}
              name="workMode"
              render={({ field }) => (
                <FormItem className="shrink-0">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setValues({ workMode: value });
                      }}
                      value={field.value}
                      className="flex items-center gap-9"
                    >
                      {workModes.map((item) => (
                        <FormItem key={item.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={item.id} />
                          </FormControl>
                          <FormLabel className="text-neutral-medium-gray peer-aria-checked:text-neutral-black">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isOnSite && (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="e.g. New York"
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setValues({ location: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        <FormField
          control={form.control}
          name="workType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value);
                    setValues({ workType: value });
                  }}
                  value={field.value}
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-9"
                >
                  {workTypes.map((item) => (
                    <FormItem key={item.id} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={item.id} />
                      </FormControl>
                      <FormLabel className="text-neutral-medium-gray peer-aria-checked:text-neutral-black">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-1.5">
          <Label className="text-base">Monthly Salary</Label>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <div className="flex w-full items-center gap-3">
              <Label className="text-base">Min</Label>
              <FormField
                control={form.control}
                name="minSalary"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 10000"
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setValues({ minSalary: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className="hidden w-6 sm:block" />
            <div className="flex w-full items-center gap-3">
              <Label className="text-base">Max</Label>
              <FormField
                control={form.control}
                name="maxSalary"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 10000"
                        {...field}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          setValues({ maxSalary: e.target.value });
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full items-center gap-3">
              <Label className="text-base sm:hidden">Currency</Label>
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-64 sm:shrink-0">
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setValues({ currency: value });
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.id} value={currency.id}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label className="text-base">Tags</Label>
          <TagCombobox
            value={tags || []}
            onValueChange={(value) => {
              form.setValue('tags', value);
              setValues({ tags: value });
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>Description*</FormLabel>
              </div>
              <FormControl>
                <Textarea {...field} className="hidden" />
              </FormControl>
              <TextEditor
                simpleModel={false}
                className="overflow-hidden rounded-[8px]"
                value={html}
                onChange={(editor) => {
                  const html = editor.getHtml();
                  setHtml(html);
                  form.setValue('description', html);
                  setValues({ description: html });
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <input type="submit" ref={submitRef} className="hidden" />
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-[270px]">
            Back
          </Button>
          <Button type="submit" className="w-full sm:w-[270px]" onClick={() => submitRef.current?.click()}>
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}

function Step3() {
  const router = useRouter();
  const { values, setValues, reset, onBack } = useJobStore();
  const [pending, startTransition] = React.useTransition();

  const submitRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof contactsSchema>>({
    resolver: zodResolver(contactsSchema),
    defaultValues: {
      contractKey: values?.contractKey || [],
      contractValue: values?.contractValue || {}
    }
  });

  const contractKey = form.watch('contractKey');

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => webApi.jobApi.publishJob(values),
    onSuccess: async () => {
      await revalidate();
      toast.success('Job published');
      startTransition(() => {
        router.back();
        setTimeout(() => {
          reset();
        }, 1000);
      });
    }
  });

  function onSubmit(data: z.infer<typeof contactsSchema>) {
    const formatedValues = {
      ...values,
      contact: data.contractValue
    };

    mutate(omit(formatedValues, ['contractKey', 'contractValue']));
  }

  return (
    <Form {...form}>
      <Label className="self-start text-base">
        How would applicants reach out to you? (You can choose multiple ways)*
      </Label>
      <form className="w-full flex-1 space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="contractKey"
          render={() => (
            <FormItem className="mt-4 flex w-full flex-col gap-3">
              {contacts.map((item) => (
                <div key={item.id} className="flex w-full flex-col gap-3 sm:min-h-[50px] sm:flex-row">
                  <FormField
                    control={form.control}
                    name="contractKey"
                    render={({ field }) => (
                      <FormItem key={item.id} className="sm:min-w-36 flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            size="large"
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const newValues = checked
                                ? [...field.value, item.id]
                                : field.value?.filter((value) => value !== item.id);

                              field.onChange(newValues);
                              setValues({ contractKey: newValues });
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-neutral-medium-gray peer-aria-checked:text-neutral-black">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  {contractKey.includes(item.id) && (
                    <FormField
                      control={form.control}
                      name={`contractValue.${item.id}`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder={item.placeholder}
                              {...field}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.target.value);
                                setValues({
                                  contractValue: {
                                    ...values.contractValue,
                                    [item.id]: e.target.value
                                  }
                                });
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <input ref={submitRef} type="submit" className="hidden" />
      </form>
      <div className="mt-20 flex w-full flex-col items-center gap-4 sm:mt-0 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-[270px]">
          Back
        </Button>
        <Button
          type="submit"
          isLoading={isPending || pending}
          className="w-full sm:w-[270px]"
          onClick={() => submitRef.current?.click()}
        >
          Submit
        </Button>
      </div>
    </Form>
  );
}

const steps = [Step1, Step2, Step3];

export default function Page() {
  const { step, reset } = useJobStore();
  const params = useParams();
  const router = useRouter();

  const { userInfo } = useUserStore();

  const Component = steps[step] || null;

  React.useEffect(() => {
    if (!userInfo) {
      router.push('/jobs');
    }
  }, [router, userInfo]);

  return (
    <main className="relative h-full w-full justify-between overflow-y-auto bg-neutral-white sm:py-12">
      <button
        aria-label="Close"
        className="absolute right-6 top-6 outline-none"
        onClick={() => {
          router.back();
          setTimeout(() => {
            reset();
          }, 300);
        }}
      >
        <XIcon size={28} />
      </button>
      <div className="flex h-full w-full flex-col items-center px-5 py-6 sm:mx-auto sm:max-w-5xl sm:p-0">
        <Steps currentStep={step + 1} />
        <h1 className="my-8 font-next-book-bold text-[22px] font-bold sm:text-[28px]">
          {params.id ? 'Edit Job Post' : 'Post a Web3 Position'}
        </h1>
        <Component />
      </div>
    </main>
  );
}
