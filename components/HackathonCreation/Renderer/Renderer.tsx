import FormInput from '@/components/Common/FormComponent/FormInput';
import FormRadio from '@/components/Common/FormComponent/FormRadio';
import FormRadioItem from '@/components/Common/FormComponent/FormRadio/FormRadioItem';
import { CustomComponentConfig } from '@/components/HackathonCreation/type';
import { PresetComponentMap } from '..';
import { CustomFormComponentType } from '../constants';
import { cn, isUuid } from '@/helper/utils';
import { FormTextarea } from '@/components/Common/FormComponent';

export const renderFormComponent = (config: CustomComponentConfig, form: any) => {
  const name = config.property?.name ? config.property?.name : config.id;
  let label = (config as CustomComponentConfig).property.label;
  label = config.optional && label ? label + ' (Optional)' : label + '*';

  switch (config.type) {
    // case CustomFormComponentType.Text:
    // return <FormInput form={form} {...config.property} label={label} name={name} />;
    // return null;
    case CustomFormComponentType.Radio:
      return (
        // <div className="!w-full">
        <FormRadio
          form={form}
          {...config.property}
          label={label}
          name={name}
          className={cn('flex w-full flex-wrap justify-between gap-5', {
            'w-full sm:[&>div]:w-[calc((100%-20px)/2)]': config.property.options.length > 1
          })}
        >
          {config.property.options.map((option, index) => (
            <FormRadioItem value={option} key={String(option) + index} label={String(option)} />
          ))}
        </FormRadio>
        // </div>
      );
    case CustomFormComponentType.Input:
      if (!isUuid(name)) return <FormInput form={form} {...config.property} label={label} name={name} />;
      return <FormTextarea form={form} {...config.property} label={label} name={name} />;
    case CustomFormComponentType.Textarea:
      return null;
    case CustomFormComponentType.Select:
      return null;
    default:
      if (PresetComponentMap[config.type]) {
        const Component = PresetComponentMap[config.type].component;
        return <Component {...config.property} config={config} form={form}></Component>;
      }
      return null;
  }
};
