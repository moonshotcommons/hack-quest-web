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
      <div className="flex flex-col gap-8">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.98 10.64C41.8624 8.98653 39.9958 7.997 38 8.00001H10C6.68629 8.00001 4 10.6863 4 14V34C4 37.3137 6.68629 40 10 40H38C41.3137 40 44 37.3137 44 34V14C44.0027 12.8034 43.6475 11.6332 42.98 10.64ZM9.99953 12H37.9995C38.574 12.0007 39.1204 12.2484 39.4995 12.68L23.9995 21.74L8.51953 12.66C8.89765 12.241 9.43517 12.0013 9.99953 12ZM38 36.0005C39.1046 36.0005 40 35.105 40 34.0005V16.9805L26 25.1805C25.3923 25.533 24.7025 25.7192 24 25.7205C23.2993 25.7253 22.6096 25.546 22 25.2005L8 16.9805V34.0005C8 35.105 8.89543 36.0005 10 36.0005H38Z"
            fill="#131313"
          />
        </svg>

        <h1 className="text-h2-mob capitalize text-neutral-off-black">{t('joinWaitlist')}</h1>

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
          isMobile
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
