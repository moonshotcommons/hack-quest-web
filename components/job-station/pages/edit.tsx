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
import TextEditor, { TEXT_EDITOR_TYPE, transformTextToEditorValue } from '@/components/Common/TextEditor';
import { Checkbox } from '@/components/ui/checkbox';
import { useJobStore } from '../utils/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import Image from 'next/image';
import { TagCombobox } from '../components/tag-combobox';
import { Textarea } from '@/components/user-profile/common/textarea';
import toast from 'react-hot-toast';
import { Spinner } from '@/components/ui/spinner';
import { useParams } from 'next/navigation';
import { omit } from 'lodash-es';

function Step1() {
  const { values, onNext, setValues } = useJobStore();
  const submitRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: '',
      website: ''
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => webApi.commonApi.uploadImage(data),
    onSuccess: ({ filepath }) => {
      setValues({ companyLogo: filepath });
      toast.success('Upload success');
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

  React.useEffect(() => {
    if (values) {
      form.reset(values);
    }
  }, [form, values]);

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
                <Input placeholder="e.g. Google" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="logo">Company Logo*</Label>
          {isPending ? (
            <Spinner size={24} />
          ) : values.companyLogo ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image src={values.companyLogo} alt="logo" fill />
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
        </div>
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website*</FormLabel>
              <FormControl>
                <Input placeholder="e.g. https://google.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <input type="submit" ref={submitRef} className="hidden" />
      </form>
      <Button type="submit" className="w-full sm:w-[270px] sm:self-end" onClick={() => submitRef.current?.click()}>
        Continue
      </Button>
    </Form>
  );
}

function Step2() {
  const { values, onNext, setValues } = useJobStore();

  const [description, setDescription] = React.useState<{ type: string; content: object }>();
  const submitRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      name: '',
      workMode: 'REMOTE',
      workType: 'FULL_TIME'
    }
  });

  function onValueChange(value: string) {
    const tags = values.tags?.includes(value)
      ? values.tags?.filter((item: string) => item !== value)
      : [...(values.tags || []), value];
    setValues({ tags });
  }

  function onSubmit(data: z.infer<typeof jobSchema>) {
    setValues({
      ...data,
      minSalary: z.coerce.number().parse(data.minSalary),
      maxSalary: z.coerce.number().parse(data.maxSalary),
      description
    });
    onNext();
  }

  React.useEffect(() => {
    if (Object.keys(values || {}).length > 0) {
      form.reset({
        ...values,
        minSalary: values?.minSalary?.toString(),
        maxSalary: values?.maxSalary?.toString(),
        location: values?.location || '',
        description: ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Form {...form}>
      <form className="w-full flex-1 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="shrink-0">
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex items-center gap-9">
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="open" />
                    </FormControl>
                    <FormLabel className="text-neutral-medium-gray peer-aria-checked:text-neutral-black">
                      Open
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="closed" />
                    </FormControl>
                    <FormLabel className="text-neutral-medium-gray peer-aria-checked:text-neutral-black">
                      Closed
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title*</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Software Engineer" {...field} />
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
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex items-center gap-9">
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
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="e.g. New York" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="workType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex items-center gap-9">
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
                      <Input type="number" placeholder="e.g. 10000" {...field} />
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
                      <Input type="number" placeholder="e.g. 10000" {...field} />
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
                    <Select value={field.value} onValueChange={field.onChange}>
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
          <TagCombobox value={values?.tags || []} onValueChange={onValueChange} />
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
                simpleModel
                className="overflow-hidden rounded-[8px]"
                onCreated={(editor) => {
                  const text = editor.getText().replace(/\n|\r/gm, '');
                  setDescription({
                    type: TEXT_EDITOR_TYPE,
                    content: editor.children
                  });
                  form.setValue('description', text);
                }}
                defaultContent={transformTextToEditorValue(values?.description)}
                onChange={(editor) => {
                  const text = editor.getText().replace(/\n|\r/gm, '');
                  form.setValue('description', text);
                  setDescription({
                    type: TEXT_EDITOR_TYPE,
                    content: editor.children
                  });
                }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <input type="submit" ref={submitRef} className="hidden" />
        <div className="flex items-center justify-end gap-4">
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
  const { id } = useParams<{ id: string }>();
  const { values } = useJobStore();
  const [pending, startTransition] = React.useTransition();

  const submitRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof contactsSchema>>({
    resolver: zodResolver(contactsSchema),
    defaultValues: {
      contractKey: [],
      contractValue: {}
    }
  });

  const contractKey = form.watch('contractKey');

  const { mutate, isPending } = useMutation({
    mutationKey: ['updateJob', id],
    mutationFn: (values: any) => webApi.jobApi.updateJob(id, values),
    onSuccess: () => {
      router.refresh();
      toast.success('Job updated');
      startTransition(() => {
        router.push('/jobs');
      });
    }
  });

  function onSubmit(data: z.infer<typeof contactsSchema>) {
    const formatedValues = {
      ...values,
      contact: data.contractValue
    };

    mutate(omit(formatedValues, 'favorited'));
  }

  React.useEffect(() => {
    if (values?.contact) {
      const contractKey = Object.keys(values.contact);
      form.reset({
        contractKey,
        contractValue: values.contact
      });
    }
  }, [form, values?.contact]);

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
                      <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-0 sm:min-w-36">
                        <FormControl>
                          <Checkbox
                            size="large"
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id));
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
                            <Input placeholder={item.placeholder} {...field} />
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
      <Button
        type="submit"
        isLoading={isPending || pending}
        className="w-full sm:w-[270px] sm:self-end"
        onClick={() => submitRef.current?.click()}
      >
        Continue
      </Button>
    </Form>
  );
}

const steps = [Step1, Step2, Step3];

export default function Page() {
  const { step, setValues } = useJobStore();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const Component = steps[step] || null;

  const { isPending, data } = useQuery({
    queryKey: ['job', id],
    staleTime: Infinity,
    queryFn: () => webApi.jobApi.getJob(id)
  });

  React.useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data, setValues]);

  return (
    <main className="relative h-full w-full justify-between overflow-y-auto bg-neutral-white sm:py-12">
      <button aria-label="Close" className="absolute right-6 top-6 outline-none" onClick={() => router.back()}>
        <XIcon size={28} />
      </button>
      <div className="flex h-full w-full flex-col items-center px-5 py-6 sm:mx-auto sm:max-w-5xl sm:p-0">
        <Steps currentStep={step + 1} />
        <h1 className="my-8 font-next-book-bold text-[22px] font-bold sm:text-[28px]">Edit Job Post</h1>
        {isPending ? <Spinner size={40} /> : <Component />}
      </div>
    </main>
  );
}
