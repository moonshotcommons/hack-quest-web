import { FormRadio } from '@/components/Common/FormComponent';
import FormRadioItem from '@/components/Common/FormComponent/FormRadio/FormRadioItem';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface PrizeTrackProps {
  prizeTrack?: string[];
  form: any;
  config: PresetComponentConfig;
}

const PrizeTrack: FC<PrizeTrackProps> = ({ prizeTrack = [], form, config }) => {
  prizeTrack = ['fwefwef', 'fwefwfwg'];
  const requiredTag = config.optional ? '' : '*';
  return (
    <FormRadio name={'prizeTrack' + requiredTag} form={form} label="Which Prize Track Do You Belong To" multiple>
      {prizeTrack.map((t) => (
        <FormRadioItem value={t} key={t} label={t} />
      ))}
    </FormRadio>
  );
};

PrizeTrack.displayName = 'PrizeTrack';

export const PrizeTrackConfig: PresetComponentConfig<PrizeTrackProps> = {
  id: v4(),
  type: PrizeTrack.displayName,
  component: PrizeTrack,
  optional: false,
  property: {},
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      prizeTrack: config.optional ? validator.optional() : validator
    };
  }
};

export default PrizeTrackConfig;
