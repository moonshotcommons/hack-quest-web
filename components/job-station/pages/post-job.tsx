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
import { companySchema, currencies, jobSchema, workModes, workTypes } from '../validations';
import { RadioGroup, RadioGroupItem } from '../components/radio-group';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/user-profile/common/select';
import { ComboboxDemo } from '../components/combobox';

function Step1() {
  const submitRef = React.useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: '',
      website: ''
    }
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (event.target?.result) {
          const result = event.target?.result;
          if (typeof result === 'string') {
            console.log(result);
          }
        }
      };
      event.target.value = '';
    }
  }

  function onSubmit(data: z.infer<typeof companySchema>) {
    console.log(data);
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
                <Input placeholder="e.g. Google" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="logo">Company Logo*</Label>
          <div className="flex items-center gap-6">
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
      <Button type="submit" className="w-[270px] sm:self-end" onClick={() => submitRef.current?.click()}>
        Continue
      </Button>
    </Form>
  );
}

function Step2() {
  const submitRef = React.useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      name: '',
      workMode: 'REMOTE',
      wrokType: 'FULL_TIME'
    }
  });

  function onSubmit(data: z.infer<typeof jobSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form className="w-full flex-1 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
          <div className="flex items-center gap-3">
            <FormField
              control={form.control}
              name="workMode"
              render={({ field }) => (
                <FormItem className="shrink-0">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
          name="wrokType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center gap-9"
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
          <div className="flex items-center gap-3">
            <div className="flex w-full items-center gap-3">
              <Label className="text-base">Min</Label>
              <FormField
                control={form.control}
                name="minSalary"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="e.g. 10000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className="w-6" />
            <div className="flex w-full items-center gap-3">
              <Label className="text-base">Max</Label>
              <FormField
                control={form.control}
                name="maxSalary"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="e.g. 10000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-64 shrink-0">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full rounded-full">
                        <SelectValue placeholder="Year" />
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
        <ComboboxDemo />
        <input type="submit" ref={submitRef} className="hidden" />
      </form>
      <Button type="submit" className="w-[270px] sm:self-end" onClick={() => submitRef.current?.click()}>
        Continue
      </Button>
    </Form>
  );
}

export default function Page() {
  const router = useRouter();
  return (
    <main className="relative flex h-full w-full flex-col justify-between bg-neutral-white py-12">
      <button aria-label="Close" className="absolute right-6 top-6 outline-none" onClick={() => router.back()}>
        <XIcon size={28} />
      </button>
      <div className="mx-auto flex h-full w-full max-w-5xl flex-col items-center">
        <Steps currentStep={1} />
        <h1 className="my-8 font-next-book-bold text-[22px] font-bold sm:text-[28px]">Post a Web3 Position</h1>
        <Step2 />
      </div>
    </main>
  );
}
