import { FC } from 'react';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { v4 } from 'uuid';
import { z } from 'zod';
import { FormInput } from '@/components/Common/FormComponent';

interface ProjectNameProps {
  form: any;
  config: CustomComponentConfig;
}

const ProjectName: FC<ProjectNameProps> = ({ config, form }) => {
  const requiredTag = config.optional ? ' (Optional)' : '*';
  return (
    <div className="w-full">
      <FormInput name="name" form={form} label={'Project Name' + requiredTag} placeholder="Enter your project name" />
    </div>
  );
};

ProjectName.displayName = 'ProjectName';

export const ProjectNameConfig: PresetComponentConfig<ProjectNameProps> = {
  id: v4(),
  type: ProjectName.displayName,
  component: ProjectName,
  optional: false,
  property: {},
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Name</span>
        <span className="body-m text-neutral-off-black">{info.name ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z
      .string()
      .min(config.optional ? 0 : 1)
      .max(100);
    return {
      name: config.optional ? validator.optional() : validator
    };
  }
};

export default ProjectNameConfig;
