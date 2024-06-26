import FormTextarea from '@/components/Common/FormComponent/FormTextarea';
import { getValidateResult } from '@/components/HackathonCreation/constants';
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
}

const TeamBackground: FC<TeamBackgroundProps> = (props) => {
  return <FormTextarea {...props} className="h-[76px]" />;
};

TeamBackground.displayName = 'TeamBackground';

export const TeamBackgroundConfig: PresetComponentConfig<TeamBackgroundProps> = {
  id: v4(),
  type: TeamBackground.displayName,
  optional: false,
  component: TeamBackground,
  property: {
    name: 'TeamBackground',
    label: 'Team Background',
    placeholder: 'Describe your team and teammates',
    maxField: 600
  },
  validate(values: { TeamBackground: string }, form) {
    return [getValidateResult(z.string().min(10).max(600).safeParse(values.TeamBackground), form, 'TeamBackground')];
  }
};

export default TeamBackgroundConfig;
