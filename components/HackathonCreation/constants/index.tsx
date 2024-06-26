import { FieldValues, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { CustomComponentConfig, FormCustomComponent } from '../type';
import { v4 } from 'uuid';
import { CustomFormComponentType } from '../Renderer';

export const IGNORE_FIELDS = ['component', 'validate', 'settingComponent'] as const;

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
    }
  }
};
