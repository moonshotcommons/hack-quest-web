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

export const GithubOpenSourceConfig: PresetComponentConfig<GithubOpenSourceProps> = {
  id: v4(),
  type: GithubOpenSource.displayName,
  component: GithubOpenSource,
  optional: false,
  property: {},
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    const isOpenSourceValidator = z.boolean();
    return {
      githubLink: config.optional ? validator.optional() : validator,
      isOpenSource: config.optional ? isOpenSourceValidator.optional() : isOpenSourceValidator
    };
  }
};

export default GithubOpenSourceConfig;
