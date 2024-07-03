'use client';
import Button from '@/components/Common/Button';
import { AboutSectionComponentList, ApplicationSectionConfig } from '@/components/HackathonCreation';
import { renderFormComponent } from '@/components/HackathonCreation/Renderer';
import { CustomComponentConfig } from '@/components/HackathonCreation/type';
import { Form } from '@/components/ui/form';
import { cn } from '@/helper/utils';
import { FC, Fragment } from 'react';
import { useForm } from 'react-hook-form';
ApplicationSectionConfig;

interface TestPageProps {}

const TestPage: FC<TestPageProps> = (props) => {
  const form = useForm();
  const onSubmit = (values: any) => {
    console.log(values);

    // AboutSectionComponentList.forEach((config) => {
    //   const fullConfig = AboutSectionComponentMap[(config as any).type];
    //   if (fullConfig.validate) {
    //     console.log(fullConfig.validate(values, form, config as PresetComponentConfig));
    //   }
    // });
  };
  const onBack = () => {};

  return (
    <div className="container mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {AboutSectionComponentList.map((config, index) => {
              return <Fragment key={index}>{renderFormComponent(config as CustomComponentConfig, form)}</Fragment>;
            })}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              htmlType="button"
              ghost
              className="button-text-m w-[165px] px-0 py-4 uppercase"
              disabled
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              type="primary"
              loading={false}
              htmlType="submit"
              className={cn(
                'button-text-m min-w-[165px] px-0 py-4 uppercase',
                !form.formState.isValid ? 'bg-neutral-light-gray' : ''
              )}
              disabled={!form.formState.isValid}
            >
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TestPage;
