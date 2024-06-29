import FormInput from '@/components/Common/FormComponent/FormInput';
import FormRadio from '@/components/Common/FormComponent/FormRadio';
import FormRadioItem from '@/components/Common/FormComponent/FormRadio/FormRadioItem';
import { CustomComponentConfig } from '@/components/HackathonCreation/type';
import { PresetComponentMap } from '..';
import { CustomFormComponentType } from '../constants';

export const renderFormComponent = (config: CustomComponentConfig, form: any) => {
  const name = config.property?.name ? config.property?.name : config.id;
  let label = (config as CustomComponentConfig).property.label;
  label = config.optional && label ? label : label + '*';

  switch (config.type) {
    case CustomFormComponentType.Input:
      return <FormInput form={form} {...config.property} label={label} name={name} />;
    case CustomFormComponentType.Radio:
      return (
        <FormRadio form={form} {...config.property} label={label} name={name}>
          {config.property.options.map((option, index) => (
            <FormRadioItem value={option} key={String(option) + index} label={String(option)} />
          ))}
        </FormRadio>
      );
    case CustomFormComponentType.Select:
      return null;
    case CustomFormComponentType.Textarea:
      return null;
    default:
      if (PresetComponentMap[config.type]) {
        const Component = PresetComponentMap[config.type].component;
        return <Component {...config.property} config={config} form={form}></Component>;
      }
      return null;
  }
};
