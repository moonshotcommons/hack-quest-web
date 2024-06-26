import { FormRadio } from '@/components/Common/FormComponent';
import FormRadioItem from '@/components/Common/FormComponent/FormRadio/FormRadioItem';
import { getValidateResult } from '@/components/HackathonCreation/constants';
import { CustomComponentConfig, PresetComponentConfig } from '@/components/HackathonCreation/type';
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
  return (
    <FormRadio name="prizeTrack" form={form} label="Which Prize Track Do You Belong To" multiple>
      {prizeTrack.map((t) => (
        <FormRadioItem value={t} key={t} label={t} />
      ))}
    </FormRadio>
  );
};

PrizeTrack.displayName = 'PrizeTrack';

export const PrizeTrackConfig: PresetComponentConfig<PrizeTrackProps, CustomComponentConfig['property']> = {
  id: v4(),
  type: PrizeTrack.displayName,
  component: PrizeTrack,
  optional: false,
  property: {},
  validate(values: { PrizeTrack: string }, form) {
    return [getValidateResult(z.string().min(10).max(100).safeParse(values.PrizeTrack), form, 'PrizeTrack')];
  }
};

export default PrizeTrackConfig;
