import { getValidateResult } from '@/components/HackathonCreation/constants';
import { FC } from 'react';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { v4 } from 'uuid';
import { z } from 'zod';
import { FormInput } from '@/components/Common/FormComponent';

interface ProjectNameProps {
  form: any;
  config: CustomComponentConfig;
}

const ProjectName: FC<ProjectNameProps> = ({ config: propConfig, form }) => {
  return (
    <div className="w-full">
      <FormInput name="projectName" form={form} label="Project Name" placeholder="Enter your project name" />
    </div>
  );
};

ProjectName.displayName = 'Name';

export const ProjectNameConfig: PresetComponentConfig<ProjectNameProps> = {
  id: v4(),
  type: ProjectName.displayName,
  component: ProjectName,
  optional: false,
  property: {
    label: 'ProjectName',
    placeholder: 'Enter a ProjectName Account',
    name: 'ProjectName'
  },
  validate(values: { ProjectName: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.ProjectName), form, 'ProjectName')];
  }
};

export default ProjectNameConfig;
