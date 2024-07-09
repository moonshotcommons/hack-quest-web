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
  const requiredTag = config.optional ? ' (Optional)' : '*';
  return (
    <FormRadio
      name="tracks"
      form={form}
      label={'Which Sector Do You Belong To' + requiredTag}
      multiple
      className="flex-wrap justify-start"
    >
      {TRACKS.map((t) => (
        <FormRadioItem value={t.value} key={t.value} label={t.label} className="max-w-[8.0625rem]" />
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
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Hackathon Track</span>
        <span className="body-m text-neutral-off-black">{info.tracks.join(',') ?? ''}</span>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      tracks: config.optional ? validator.optional() : validator
    };
  }
};

export default HackathonTrackConfig;
