import Button from '@/components/Common/Button';
import { ButtonProps } from '@/components/Common/Button';
import Checkbox from '@/components/Common/Checkbox';
import RightIcon from '@/components/Common/Icon/Right';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Input from '@/components/Common/Input';
import { cn } from '@/helper/utils';
import { useLoginValidator } from '@/hooks/useLoginValidator';
import { Radio } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC, useState } from 'react';

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

const RegisterPage: NextPage<any> = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    verifyPassword: string;
  }>({
    email: '',
    password: '',
    verifyPassword: ''
  });
  const { validator } = useLoginValidator(formData);

  return (
    <div className="relative">
      <div className="w-full flex justify-end">
        <div className="w-[48.8125rem] h-full flex justify-center">
          {/* <ThirdPartyLogin></ThirdPartyLogin> */}
          <div className="flex flex-col gap-[2rem] mt-[12.25rem]">
            <p className="text-[#F8F8F8] text-[1.75rem] font-Sofia-Pro-Light-Az font-semibold leading-[150%]">
              Register
            </p>

            <Input
              label="Email"
              type="email"
              placeholder="Email"
              name="email"
              // state={formData.email.state}
              // errorMessage={formData.email.error}
              delay={500}
              rules={[
                {
                  type: 'string',
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'illegal email'
                },
                {
                  asyncValidator(rule, value, callback, source, options) {
                    // 验证邮箱
                  }
                }
              ]}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value
                });
              }}
            ></Input>
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              description="Use 8 or more characters with a mix of letters & numbers"
              // state={formData.password.state}
              // errorMessage={formData.password.error}
              delay={500}
              rules={{
                type: 'string',
                required: true,
                pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
                message: 'illegal password'
              }}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value
                });
              }}
            ></Input>
            <Input
              label="Re-enter password"
              type="password"
              placeholder="Password"
              name="verifyPassword"
              // state={formData.verifyPassword.state}
              // errorMessage={formData.verifyPassword.error}
              delay={500}
              rules={[
                {
                  type: 'string',
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
                  message:
                    'Use 8 or more characters with a mix of letters & numbers'
                },
                {
                  type: 'string',
                  message: 'Those passwords didn’t match. Try again.',
                  validator(rule, value) {
                    return value === formData.password;
                  }
                }
              ]}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  verifyPassword: e.target.value
                });
              }}
            ></Input>
            <div className="flex flex-col gap-[.5rem]">
              <div className="flex gap-[0.5rem] text-[#ACACAC] font-Sofia-Pro-Light-Az font-light leading-[150%] tracking-[-0.011rem]">
                <span>See our</span>
                <Link href={'/'}>
                  <span className="text-[#F8F8F8] font-semibold">
                    Privacy Policy
                  </span>
                </Link>
                <span>for more details</span>
              </div>
              <div className="flex gap-[.75rem]">
                <Checkbox></Checkbox>
                <p className="text-[#676767] text-[1rem] font-Sofia-Pro-Light-Az tracking-[-0.011rem]">
                  I have red and accept the Terms and Conditions
                </p>
              </div>
            </div>
            <CustomButton
              onClick={() => {
                validator.validate(formData, (errors, fields) => {
                  console.log(errors, fields);
                });
              }}
              block
            >
              <div className="flex items-center gap-[1.25rem]">
                <span className="text-[1.25rem] font-next-book text-white leading-[118.5%]">
                  Create Account
                </span>
                <span>
                  <RightArrowIcon></RightArrowIcon>
                </span>
              </div>
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
