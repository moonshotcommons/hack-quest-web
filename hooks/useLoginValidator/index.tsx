import { useState } from 'react';
import Schema, { type Rules } from 'async-validator';

export type FormStatusType = 'default' | 'error' | 'success';
export type FormErrorType = string | null | undefined;
export type FormDataItemType = {
  value: string;
  error: FormErrorType;
  state: FormStatusType;
};
export interface FormDataType {
  email: FormDataItemType;
  password: FormDataItemType;
  verifyPassword: FormDataItemType;
}

export const useLoginValidator = (formData: any) => {
  const [formStateData, setFormStateData] = useState<FormDataType>({
    email: {
      value: '',
      error: null,
      state: 'default'
    },
    password: {
      value: '',
      error: null,
      state: 'default'
    },
    verifyPassword: {
      value: '',
      error: null,
      state: 'default'
    }
  });

  const descriptor: Rules = {
    email: {
      type: 'string',
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'illegal email'
    },
    password: {
      type: 'string',
      required: true,
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
      message: 'illegal password'
    },
    verifyPassword: {
      type: 'string',
      required: true,
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
      message: 'illegal password',
      validator(rule, value, callback, source, options) {
        return formData.password === formData.verifyPassword;
      }
    }
  };
  const validator = new Schema(descriptor);

  return { formStateData, validator, setFormStateData };
};
