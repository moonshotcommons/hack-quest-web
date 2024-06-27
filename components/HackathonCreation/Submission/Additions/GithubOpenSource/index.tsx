import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';
import IsPublicRadio from './IsPublicRadio';

interface GithubOpenSourceProps {
  form: any;
  config: CustomComponentConfig;
}

const GithubOpenSource: FC<GithubOpenSourceProps> = ({ config: propConfig, form }) => {
  return (
    <div>
      <CustomFormField
        name="githubLink"
        form={form}
        label="Please Provide The Github Of Your Project"
        placeholder="Paste Github link here"
      />
      <IsPublicRadio form={form} />
    </div>
  );
};

GithubOpenSource.displayName = 'GithubOpenSource';

export const GithubOpenSourceConfig: PresetComponentConfig<GithubOpenSourceProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: GithubOpenSource.displayName,
  component: GithubOpenSource,
  optional: false,
  property: {},
  validate(values: { githubLink: string; openSource: boolean }, form) {
    return [
      getValidateResult(z.string().min(10).max(100).safeParse(values.githubLink), form, 'githubLink'),
      getValidateResult(z.string().safeParse(values.openSource), form, 'openSource')
    ];
  }
};

export default GithubOpenSourceConfig;
