import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '../constants';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';
import Title from '@/components/Common/Title';

interface LinksProps {}

const Links: FC<{ form: UseFormReturn<FormSchema, any, undefined>; isClose: boolean }> = ({ form, isClose }) => {
  return (
    <div className="flex flex-col gap-8">
      <Title>
        <span className="text-h3">Project</span>
      </Title>
      <CustomFormField
        name="contractLink"
        form={form}
        className="bg-neutral-off-white focus:bg-neutral-white"
        label={
          <span>
            Please link to your verified contract on{' '}
            <Link
              href={'https://sepolia.lineascan.build/'}
              target="_blank"
              className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-yellow-primary"
            >
              Linea Sepolia
            </Link>{' '}
            or{' '}
            <Link
              href={'https://lineascan.build/'}
              target="_blank"
              className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-yellow-primary"
            >
              Linea Mainnet
            </Link>
            .{' '}
          </span>
        }
        placeholder="Please enter a URL"
      />
      <CustomFormField
        name="projectLink"
        form={form}
        className="bg-neutral-off-white focus:bg-neutral-white"
        label="Please link to your project, so that we can play around with it!"
        placeholder="Please enter a URL"
      />
      <CustomFormField
        name="socialLink"
        form={form}
        className="bg-neutral-off-white focus:bg-neutral-white"
        label={
          <span className="flex flex-col">
            <span>Please link to a social post you made about your project.</span>
            <span className="body-s text-[.875rem] leading-[160%] text-neutral-medium-gray">
              Tag @lineabuild and @HackQuest_ on X
            </span>
          </span>
        }
        placeholder="Please enter a URL"
      />

      <FormField
        control={form.control}
        name={'partnerTooling'}
        render={({ field }) => (
          <FormItem className="w-full text-left">
            <div className="flex w-full justify-between">
              <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                <span>
                  Please list any{' '}
                  <Link
                    href={'https://docs.linea.build/developers/tooling'}
                    target="_blank"
                    className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-yellow-primary"
                  >
                    partner tooling
                  </Link>{' '}
                  you incorporated and how you did it for bonus points.
                </span>
              </FormLabel>
              <span className="caption-14pt text-neutral-rich-gray">
                <span className={form.watch('partnerTooling').length > 360 ? 'text-status-error' : ''}>
                  {form.watch('partnerTooling').length}
                </span>
                /360
              </span>
            </div>
            <FormControl>
              <Textarea
                placeholder="Please list the partner tooling and enter the description"
                {...field}
                className="body-m !mt-1 box-border flex h-[76px] min-h-[76px] items-center border-neutral-light-gray bg-neutral-off-white !py-[11px] px-6 text-[16px] font-normal leading-[160%] text-neutral-medium-gray focus:bg-neutral-white"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Links;
