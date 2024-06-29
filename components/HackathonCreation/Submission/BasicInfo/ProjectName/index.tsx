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
  const requiredTag = config.optional ? '' : '*';
  return (
    <div className="w-full">
      <FormInput
        name="projectName"
        form={form}
        label={'Project Name' + requiredTag}
        placeholder="Enter your project name"
      />
    </div>
  );
};

ProjectName.displayName = 'Name';

export const ProjectNameConfig: PresetComponentConfig<ProjectNameProps> = {
  id: v4(),
  type: ProjectName.displayName,
  component: ProjectName,
  optional: false,
  property: {},
  getValidator(config) {
    const validator = z
      .string()
      .min(config.optional ? 0 : 1)
      .max(100);
    return {
      location: config.optional ? validator.optional() : validator
    };
  }
};

export default ProjectNameConfig;
