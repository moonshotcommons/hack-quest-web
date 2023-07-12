import { useState } from 'react';
import Schema, { Rule, type Rules } from 'async-validator';
import webApi from '@/service';

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
  reenterPassword: FormDataItemType;
}

const checkEmailRules: Rule = [
  {
    type: 'string',
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'illegal email'
  },
  {
    async asyncValidator(rule, value, callback, source, options) {
      // 验证邮箱是否存在
      return new Promise((resolve, reject) => {
        webApi.userApi
          .checkEmailExists(value)
          .then((res) => {
            // onStatusChange(false);

            resolve();
          })
          .catch((e) => {
            // onStatusChange(true);
            reject('email does not exist.');
            // 'Email already exists, please register with another email, or'
          });
      });
    }
  }
];

const checkRegisterEmailRules: Rule = [
  {
    type: 'string',
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'illegal email'
  },
  {
    async asyncValidator(rule, value, callback, source, options) {
      // 验证邮箱是否存在
      return new Promise((resolve, reject) => {
        webApi.userApi
          .checkEmailExists(value)
          .then((res) => {
            // onStatusChange(false);
            reject(
              'Email already exists, please register with another email, or.'
            );
          })
          .catch((e) => {
            // onStatusChange(true);
            resolve();
            // 'Email already exists, please register with another email, or'
          });
      });
    }
  }
];

const checkPasswordRules: Rule = {
  type: 'string',
  required: true,
  pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
  message: 'illegal password'
};

const checkReenterPasswordRules: Rule = {
  type: 'string',
  required: true,
  pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
  message: 'illegal password'
};

export const useLoginValidator = (
  types: ('email' | 'password' | 'reenterPassword' | 'registerEmail')[]
) => {
  const [status, setStatus] = useState<FormStatusType>('default');
  const [errorMessage, setErrorMessage] = useState('');
  let descriptor: Record<string, Rule> = {};
  types.forEach((type) => {
    switch (type) {
      case 'email':
        descriptor[type] = checkEmailRules;
        break;
      case 'registerEmail':
        descriptor[type] = checkRegisterEmailRules;
        break;
      case 'password':
        descriptor[type] = checkPasswordRules;
        break;
      case 'reenterPassword':
        descriptor[type] = checkReenterPasswordRules;
        break;
    }
  });

  const validator = new Schema(descriptor);

  return { validator, status, errorMessage, setStatus, setErrorMessage };
};
