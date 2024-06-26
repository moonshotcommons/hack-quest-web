'use client';

import { UseFormReturn } from 'react-hook-form';
import { FC, memo } from 'react';

import CustomFormField from '@/components/Web/Business/CustomFormField';

import { FormSchema } from '../../constants';

interface ProjectDemoProps {
  form: UseFormReturn<FormSchema, any, undefined>;
}

const ProjectDemo: FC<ProjectDemoProps> = ({ form }) => {
  // 1. Define your form.

  return (
    <div>
      <CustomFormField
        name="demo"
        form={form}
        label=""
        placeholder="Link to the video demoing your project (preferably YouTube)"
        className="bg-neutral-off-white focus:bg-neutral-white"
      />
    </div>
  );
};

export default memo(ProjectDemo);
