import FormInput from '@/components/Common/FormComponent/FormInput';
import FormRadio from '@/components/Common/FormComponent/FormRadio';
import FormRadioItem from '@/components/Common/FormComponent/FormRadio/FormRadioItem';
import { CustomComponentConfig } from '@/components/HackathonCreation/type';
import { PresetComponentMap } from '..';

export enum CustomFormComponentType {
  Select = 'select',
  Radio = 'radio',
  Input = 'input',
  Textarea = 'textarea'
}

export const renderFormComponent = (config: CustomComponentConfig, form: any) => {
  const name = config.property?.name ? config.property?.name : config.id;
  switch (config.type) {
    case CustomFormComponentType.Input:
      return <FormInput name={name} form={form} {...config.property} />;
    case CustomFormComponentType.Radio:
      return (
        <FormRadio name={name} form={form} {...config.property}>
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
      console.log(PresetComponentMap);
      if (PresetComponentMap[config.type]) {
        const Component = PresetComponentMap[config.type].component;
        return <Component {...config.property} config={config} form={form}></Component>;
      }
      return null;
  }
};
