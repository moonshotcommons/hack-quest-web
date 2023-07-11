import Button from '@/components/Common/Button';
import { ButtonProps } from '@/components/Common/Button';
import Checkbox from '@/components/Common/Checkbox';
import Input from '@/components/Common/Input';
import { cn } from '@/helper/utils';
import { Radio } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC, useState } from 'react';
import Schema, { type Rules } from 'async-validator';
import { useForm } from 'react-hook-form';

interface FormState {
  email: {
    value: string;
    error: string | null;
    state: 'default' | 'error' | 'success';
  };
  password: {
    value: string;
    error: string | null;
    state: 'default' | 'error' | 'success';
  };
  verifyPassword: {
    value: string;
    error: string | null;
    state: 'default' | 'error' | 'success';
  };
}

const CustomButton: FC<ButtonProps> = (props) => {
  const { children } = props;
  return (
    <Button
      padding="px-[3rem] py-[1.25rem]"
      fontStyle="Inter font-normal font-next-book"
      textStyle="text-[.875rem] text-white leading-[1.25rem]"
      {...props}
    >
      {children}
    </Button>
  );
};

const RegisterPage: NextPage<any> = (props) => {
  // const { nowCards, syntaxCards, tracksCards } = props;
  const [formState, setFormState] = useState<FormState>({
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

  const onSubmit = (data: any) => {
    console.log('执行');
    console.log(data);
  };

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
        let values: {
          value: string;
          error: string | null | undefined;
          state: 'error' | 'success' | 'default';
        } = {
          value: value,
          error: null,
          state: 'default'
        };
        if (value && (rule.pattern as RegExp).test(value)) {
          values = {
            value: value,
            error: null,
            state: 'success'
          };
        } else {
          values = {
            value: value,
            error:
              typeof rule.message === 'string'
                ? rule.message
                : rule.message?.(''),
            state: 'error'
          };
        }
        setFormState({
          ...formState,
          [rule.field as string]: values
        });
      }
    }
  };
  const validator = new Schema(descriptor);
  return (
    <div className="relative">
      <div className="w-full flex justify-end">
        <div className="w-[48.8125rem] h-full flex justify-center">
          {/* <ThirdPartyLogin></ThirdPartyLogin> */}
          <div className="flex flex-col gap-[2rem] mt-[12.25rem]">
            <p className="text-[#F8F8F8] text-[1.75rem] font-Sofia-Pro-Light-Az font-semibold leading-[150%]">
              Register
            </p>

            <Input label="Email" type="email" placeholder="Email"></Input>
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              description="Use 8 or more characters with a mix of letters & numbers"
              // rules={}
            ></Input>
            <Input
              label="Re-enter password"
              type="password"
              placeholder="Password"
              state={formState.verifyPassword.state}
              errorMessage={formState.verifyPassword.error}
              onChange={(e) => {
                validator.validate(
                  { verifyPassword: e.target.value },
                  (errors, fields) => {
                    // setFormState({
                    //   ...formState,
                    //   verifyPassword: {
                    //     value:
                    //   }
                    // });
                    console.log(errors, fields);
                  }
                );
              }}
            ></Input>
            <Input label="Email" type="email" placeholder="Email"></Input>
            <input type="email" />
            <input type="submit" className="text-white"></input>

            <div className="flex gap-[0.5rem] text-[#ACACAC] font-Sofia-Pro-Light-Az font-light leading-[150%] tracking-[-0.011rem]">
              <span>See our</span>
              <Link href={'/'}>
                <span className="text-[#F8F8F8] font-semibold">
                  Privacy Policy
                </span>
              </Link>
              <span>for more details</span>
            </div>
            {/* <Checkbox></Checkbox> */}
            <CustomButton
              onClick={() => {
                console.log('提交');
                // handleSubmit(onSubmit);
              }}
            >
              提交
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterPage.displayName = 'RegisterPage';

// Landing.getInitialProps = (context) => {
//   return {};
// };

export default RegisterPage;
