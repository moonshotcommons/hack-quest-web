import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Schema, { RuleItem } from 'async-validator';
import { FC, useContext, useState } from 'react';
interface InputEmailProps {
  onSubmit: (email: string) => void;
}

const InputEmail: FC<InputEmailProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState({
    status: 'default',
    errorMessage: ''
  });

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LAUNCH_POOL);

  const validateRule: RuleItem = {
    type: 'string',
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Incorrect Email'
  };

  const validator = new Schema({
    email: validateRule
  });

  const submit = () => {
    validator.validate({ email }, (errors, fields) => {
      if (errors && errors[0]) {
        setFormStatus({
          status: 'error',
          errorMessage: errors[0].message || ''
        });
      } else {
        onSubmit(email);
        setFormStatus({
          status: 'success',
          errorMessage: ''
        });
      }
    });
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-6">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M57.3063 14.187C55.8162 11.9824 53.3273 10.663 50.6663 10.667H13.333C8.91473 10.667 5.33301 14.2487 5.33301 18.667V45.3337C5.33301 49.7519 8.91473 53.3337 13.333 53.3337H50.6663C55.0846 53.3337 58.6663 49.7519 58.6663 45.3337V18.667C58.6699 17.0715 58.1963 15.5113 57.3063 14.187ZM13.3327 16H50.666C51.432 16.001 52.1605 16.3312 52.666 16.9067L31.9994 28.9867L11.3594 16.88C11.8635 16.3214 12.5802 16.0018 13.3327 16ZM50.666 48.0006C52.1388 48.0006 53.3327 46.8067 53.3327 45.334V22.6406L34.666 33.5739C33.8558 34.044 32.936 34.2923 31.9993 34.2939C31.0651 34.3004 30.1455 34.0613 29.3327 33.6006L10.666 22.6406V45.334C10.666 46.8067 11.8599 48.0006 13.3327 48.0006H50.666Z"
            fill="#131313"
          />
        </svg>

        <h1 className="text-h3 text-neutral-off-black"> {t('joinWaitlist')}</h1>

        <Input
          label={t('email')}
          type="email"
          name="email"
          rules={validateRule}
          state={formStatus.status as any}
          errorMessage={formStatus.errorMessage}
          labelClassName=""
          placeholder={t('email')}
          delay={300}
          clear
          theme={'light'}
          onChange={(e) => {
            setEmail(e.target.value?.trim());
          }}
        ></Input>
      </div>
      <Button
        onClick={() => {
          submit();
        }}
        block
        type="primary"
        className="
          button-text-l py-4 uppercase
          "
      >
        {t('continue')}
      </Button>
    </div>
  );
};

export default InputEmail;
