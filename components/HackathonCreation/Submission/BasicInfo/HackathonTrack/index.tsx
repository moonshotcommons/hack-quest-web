import { FormRadio } from '@/components/Common/FormComponent';
import FormRadioItem from '@/components/Common/FormComponent/FormRadio/FormRadioItem';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
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

export const HackathonTrackConfig: PresetComponentConfig<HackathonTrackProps> = {
  id: v4(),
  type: HackathonTrack.displayName,
  component: HackathonTrack,
  optional: false,
  property: {},
  getValidator(config) {
    const arr = TRACKS.map((item) => item.value) as [string, ...string[]];
    const validator = z.enum(arr);
    return {
      hackathonTracks: config.optional ? validator.optional() : validator
    };
  }
};

export default HackathonTrackConfig;
