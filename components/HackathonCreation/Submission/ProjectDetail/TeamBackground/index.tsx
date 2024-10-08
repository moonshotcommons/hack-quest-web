import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

export interface TeamBackgroundProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  maxField: number;
  validator?: any;
  config: PresetComponentConfig;
}

const TeamBackground: FC<TeamBackgroundProps> = ({ config, label, ...props }) => {
  const requiredTag = config.optional ? ' (Optional)' : '*';
  return <FormTextarea {...props} className="h-[76px]" label={label + requiredTag} />;
};
TeamBackground.displayName = 'TeamBackground';

export const TeamBackgroundConfig: PresetComponentConfig<TeamBackgroundProps> = {
  id: v4(),
  type: TeamBackground.displayName,
  optional: false,
  component: TeamBackground,
  property: {
    name: 'teamBackground',
    label: 'Team Background',
    placeholder: 'Describe your team and teammates',
    maxField: 600
  },
  displayRender(info) {
    return (
      <>
        <div className="my-4 h-[1px] w-full scale-y-50 border-none bg-neutral-medium-gray" />
        <div className="body-m flex flex-col gap-1 text-neutral-off-black">
          <span>Team Background</span>
          <p className="body-s min-h-[80px] w-full leading-normal text-neutral-rich-gray">
            {info.teamBackground ?? ''}
          </p>
        </div>
      </>
    );
  },
  getValidator(config) {
    const validator = z
      .string()
      .min(config.optional ? 0 : 1)
      .max(600);
    return {
      teamBackground: config.optional ? validator.optional() : validator
    };
  }
};

export default TeamBackgroundConfig;
