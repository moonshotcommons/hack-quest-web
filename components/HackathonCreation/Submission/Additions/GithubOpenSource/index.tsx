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

const GithubOpenSource: FC<GithubOpenSourceProps> = ({ config, form }) => {
  const requiredTag = config.optional ? ' (Optional)' : '*';
  return (
    <div className="flex flex-col gap-6">
      <CustomFormField
        name="githubLink"
        form={form}
        label={'Please Provide The Github Of Your Project' + requiredTag}
        placeholder="Paste Github link here"
      />
      <IsPublicRadio form={form} requiredTag={requiredTag} />
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
  displayRender(info) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-1 items-center justify-between">
          <span className="body-m flex items-center  text-neutral-off-black">Project Github</span>
          <span className="body-m text-neutral-off-black">{info.githubLink ?? ''}</span>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <span className="body-m flex items-center  text-neutral-off-black">Contract Address</span>
          <span className="body-m text-neutral-off-black">{info.openSource ? 'Yes' : 'No'}</span>
        </div>
      </div>
    );
  },
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
