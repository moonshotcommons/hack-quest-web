import { FC, ReactNode, useState } from 'react';

import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Input from '@/components/v2/Common/Input';
import va from '@vercel/analytics';
import { useDebounceFn, useKeyPress } from 'ahooks';
import Schema from 'async-validator';
interface VerifyEmailProps {
  onStatusChange: (status: boolean) => void;
  onNext: (email: string) => void;
  validator: Schema;
  emailTitle?: ReactNode;
  value?: string;
}

const VerifyEmail: FC<VerifyEmailProps> = (props) => {
  const {
    onStatusChange,
    onNext,
    value,
    emailTitle: EmailTitle,
    validator
  } = props;

  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: value || ''
  });

  const [status, setStatus] = useState<any>('default');
  const [errorMessage, setErrorMessage] = useState('');

  const { run: verifyEmail } = useDebounceFn(
    () => {
      va.track('邮箱验证next');

      validator.validate(formData, (errors, fields) => {
        if (errors?.[0]) {
          setStatus('error');
          setErrorMessage(errors?.[0].message || '');
        } else {
          setStatus('success');
          setErrorMessage('');
          onNext(formData.email);
        }
      });
    },
    { wait: 500 }
  );

  useKeyPress('enter', verifyEmail);

  return (
    <div className="h-full w-full flex flex-col items-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-[25px]">
        {EmailTitle}
        <div className="text-white">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
            state={status}
            className="bg-[#212121] text-white"
            clear
            errorMessage={errorMessage}
            delay={500}
            onChange={(e) => {
              setStatus('default');
              setErrorMessage('');
              validator.validate(
                { email: e.target.value },
                (errors, fields) => {
                  if (errors?.[0]) {
                    setStatus('error');
                    setErrorMessage(errors?.[0].message || '');
                    onStatusChange(false);
                  } else {
                    setStatus('success');
                    setErrorMessage('');
                    onStatusChange(true);
                  }
                }
              );
              setFormData({
                ...formData,
                email: e.target.value
              });
            }}
            defaultValue={formData.email}
          ></Input>
        </div>
        <Button
          onClick={verifyEmail}
          block
          icon={<RightArrowIcon></RightArrowIcon>}
          iconPosition="right"
          className="bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
