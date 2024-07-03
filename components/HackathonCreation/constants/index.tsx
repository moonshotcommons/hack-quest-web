import { FieldValues, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { CustomComponentConfig, FormCustomComponent } from '../type';
import { v4 } from 'uuid';

export enum CustomFormComponentType {
  Select = 'select',
  Radio = 'radio',
  Input = 'input',
  Textarea = 'textarea'
}

export const IGNORE_FIELDS = ['component', 'validate', 'settingComponent', 'getValidator'] as const;

export const getValidateResult = (
  validResult: z.SafeParseReturnType<string, string>,
  form: UseFormReturn<FieldValues, any, undefined>,
  field: string
) => {
  if (!validResult.success) {
    form.setError(field, { message: validResult.error.issues[0].message });
    return false;
  } else {
    return true;
  }
};

export const CustomComponentConfigTemplate: Record<FormCustomComponent, CustomComponentConfig> = {
  [FormCustomComponent.QA]: {
    id: v4(),
    type: CustomFormComponentType.Input,
    optional: false,
    property: {
      placeholder: '',
      label: ''
    },
    displayRender(info, config) {
      const value = typeof info[config.id] === 'object' ? info[config.id].value : info[config.id];
      console.log(info, config, value);
      return (
        <>
          <div className="my-4 h-[1px] w-full scale-y-50 border-none bg-neutral-medium-gray" />
          <div className="body-m flex flex-col gap-1 text-neutral-off-black">
            <span>{config.property.label}</span>
            <p className="body-s min-h-[80px] w-full leading-normal text-neutral-rich-gray">{value}</p>
          </div>
        </>
      );
    }
  },

  [FormCustomComponent.Selection]: {
    id: v4(),
    type: CustomFormComponentType.Radio,
    optional: false,
    property: {
      placeholder: '',
      label: '',
      options: []
    },
    displayRender(info, config) {
      const value = typeof info[config.id] === 'object' ? info[config.id].value : info[config.id];
      return (
        <div className="flex flex-1 items-center justify-between">
          <span className="body-m flex items-center  text-neutral-off-black">{config.property.label}</span>
          <span className="body-m text-neutral-off-black">{value}</span>
        </div>
      );
    }
  }
};
