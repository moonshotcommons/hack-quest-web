import { FormRadio } from '@/components/Common/FormComponent';
import FormRadioItem from '@/components/Common/FormComponent/FormRadio/FormRadioItem';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';
import { TRACKS } from './constant';

interface HackathonTrackProps {
  form: any;
  config: PresetComponentConfig;
}

const HackathonTrack: FC<HackathonTrackProps> = ({ form, config }) => {
  return (
    <FormRadio name="HackathonTrack" form={form} label="Which Prize Track Do You Belong To" multiple>
      {TRACKS.map((t) => (
        <FormRadioItem value={t.value} key={t.value} label={t.label} />
      ))}
    </FormRadio>
  );
};

HackathonTrack.displayName = 'HackathonTrack';

export const HackathonTrackConfig: PresetComponentConfig<HackathonTrackProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: HackathonTrack.displayName,
  component: HackathonTrack,
  optional: false,
  property: {},
  validate(values: { hackathonTrack: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.hackathonTrack), form, 'hackathonTrack')];
  }
};

export default HackathonTrackConfig;
