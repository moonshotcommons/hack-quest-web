import webApi from '@/service';
import { t } from 'i18next';
import message from 'antd/es/message';
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
            if (res.exists) {
              resolve();
            } else {
              // @ts-expect-error
              reject(t('auth:email_does_not_exist'));
            }
          })
          .catch((e) => {
            if (e.code) {
              e.msg && message.error(e.msg);
              reject(e.msg);
            } else {
              e.message && message.error(e.message);
              reject(e.message);
            }
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
            if (res.exists) {
              // @ts-expect-error
              reject(t('auth:email_already_exists'));
            } else if (res.exists === false) {
              resolve();
            }
          })
          .catch((e) => {
            if (e.code) {
              // e.msg && message.error(e.msg);
              reject(e.msg);
            } else {
              // e.message && message.error(e.message);
              reject(e.message);
            }
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

export const useValidator = (types: ('email' | 'password' | 'newPassword' | 'reenterPassword' | 'registerEmail')[]) => {
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
        // @ts-expect-error
        cn.pattern!.mismatch = t('auth:incorrect_email_format');
        break;
      case 'registerEmail':
        descriptor['email'] = checkRegisterEmailRules;
        // @ts-expect-error
        cn.pattern!.mismatch = t('auth:incorrect_email_format');
        break;
      case 'password':
        descriptor[type] = checkPasswordRules;
        // @ts-expect-error
        cn.pattern!.mismatch = t('auth:more_characters');
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
