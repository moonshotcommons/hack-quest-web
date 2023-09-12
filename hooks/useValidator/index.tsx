import webApi from '@/service';
import Schema, { Rule, ValidateMessages } from 'async-validator';
import { useState } from 'react';

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
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    // message: 'Incorrect Email'
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
            reject('Email does not exist.');
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
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    // message: 'Incorrect Email'
  },
  {
    async asyncValidator(rule, value, callback, source, options) {
      // 验证邮箱是否存在
      return new Promise((resolve, reject) => {
        webApi.userApi
          .checkEmailExists(value)
          .then((res) => {
            // onStatusChange(false);
            reject('Email already exists, please try another email. ');
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
  pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/
  // message: 'Incorrect Password'
};

const checkReenterPasswordRules: Rule = {
  type: 'string',
  required: true,
  pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/
  // message: 'Incorrect Password'
};

export const useValidator = (
  types: (
    | 'email'
    | 'password'
    | 'newPassword'
    | 'reenterPassword'
    | 'registerEmail'
  )[]
) => {
  const [status, setStatus] = useState<FormStatusType>('default');
  const [errorMessage, setErrorMessage] = useState('');
  let descriptor: Record<string, Rule> = {};
  const cn: ValidateMessages = {
    required: '%s cannot be empty',
    pattern: { mismatch: '' }
  };
  types.forEach((type) => {
    switch (type) {
      case 'email':
        descriptor[type] = checkEmailRules;
        cn.pattern!.mismatch = 'Incorrect Email Format';
        break;
      case 'registerEmail':
        descriptor['email'] = checkRegisterEmailRules;
        cn.pattern!.mismatch = 'Incorrect Email Format';
        break;
      case 'password':
        descriptor[type] = checkPasswordRules;
        cn.pattern!.mismatch =
          '8 or more characters with a mix of letters & numbers';
        break;
      case 'newPassword':
        descriptor[type] = checkPasswordRules;
        break;
      case 'reenterPassword':
        descriptor[type] = checkReenterPasswordRules;
        break;
    }
  });

  const validator = new Schema(descriptor);

  validator.messages(cn);
  return { validator, status, errorMessage, setStatus, setErrorMessage };
};
