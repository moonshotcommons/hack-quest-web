import { FormRadio } from '@/components/Common/FormComponent';
import FormRadioItem from '@/components/Common/FormComponent/FormRadio/FormRadioItem';
import { useHackathonConfig } from '@/components/HackathonCreation/Renderer/HackathonRendererProvider';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { cn } from '@/helper/utils';
import { FC } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';

interface PrizeTrackProps {
  form: any;
  config: PresetComponentConfig;
}

const PrizeTrack: FC<PrizeTrackProps> = ({ form, config }) => {
  const { prizeTracks } = useHackathonConfig();
  const requiredTag = config.optional ? '' : '*';
  if (!prizeTracks.length) return null;

  return (
    <FormRadio
      name={'prizeTrack'}
      form={form}
      label={'Which Prize Track Do You Belong To' + requiredTag}
      multiple
      className={cn('flex w-full flex-wrap justify-between gap-5', {
        '[&>div]:w-[calc((100%-20px)/2)]': prizeTracks.length > 1
      })}
    >
      {prizeTracks.map((t) => (
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
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Prize Track</span>
        <span className="body-m text-neutral-off-black">{info.prizeTrack ?? ''}</span>
      </div>
    );
  },
  property: {},
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);
    return {
      prizeTrack: config.optional ? validator.optional() : validator
    };
  }
};

export default PrizeTrackConfig;
