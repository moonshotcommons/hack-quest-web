import Button from '@/components/Common/Button';
import RightArrowIcon from '@/components/Common/Icon/RightArrow';
import Checkbox from '@/components/v2/Common/Checkbox';
import Input from '@/components/v2/Common/Input';
import { cn } from '@/helper/utils';
import { useValidator } from '@/hooks/useValidator';
import webApi from '@/service';
import { UnLoginType, setUnLoginType } from '@/store/redux/modules/user';
import { useDebounceFn } from 'ahooks';
import { message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import WhiteListModal from '../WhiteListModal';

interface RegisterFormProps {
  email: string;
  onBack: VoidFunction;
}

const RegisterForm: FC<RegisterFormProps> = (props) => {
  const { onBack } = props;
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    reenterPassword: string;
  }>({
    email: props.email,
    password: '',
    reenterPassword: ''
  });

  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    // email: {
    //   status: 'default',
    //   errorMessage: ''
    // },
    password: {
      status: 'default',
      errorMessage: ''
    },
    reenterPassword: {
      status: 'default',
      errorMessage: ''
    }
  });

  const { validator } = useValidator([
    // 'registerEmail',
    'password',
    'reenterPassword'
  ]);

  const [acceptConditions, setAcceptCondition] = useState(false);
  const [acceptErrorMessage, setAcceptErrorMessage] = useState(false);
  const [showWhiteListModal, setShowWhiteListModal] = useState(false);
  const router = useRouter();

  const { run: onRegister } = useDebounceFn(
    () => {
      if (!acceptConditions) {
        setAcceptErrorMessage(true);
        return;
      }
      validator.validate(formData, async (errors, fields) => {
        if (!errors) {
          const status: any = { ...formState };
          for (let key in status) {
            status[key] = { status: 'success', errorMessage: '' };
          }
          try {
            const res = await webApi.userApi.userRegister(formData);
            router.push('/auth/email-verify');
          } catch (e: any) {
            if (e?.code === 400) setShowWhiteListModal(true);
            else message.error(e?.msg);
          }
        } else {
          const status: any = { ...formState };
          errors.map((error) => {
            status[error.field as string] = {
              status: 'error',
              errorMessage: error.message
            };
          });
          setFormState(status);
        }
      });
    },
    { wait: 500 }
  );

  return (
    <div className="w-full h-full flex justify-center">
      {/* <ThirdPartyLogin></ThirdPartyLogin> */}
      <div className="flex w-full flex-col gap-[25px]">
        <div className="text-[#FFF] text-[21px] font-next-poster leading-[160%] tracking-[1.26px]">
          Already have an account?{' '}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              dispatch(setUnLoginType(UnLoginType.LOGIN));
            }}
          >
            Login
          </span>
        </div>

        <div className="text-white">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="8+characters with a mix of letters & numbers"
            className="bg-[#212121] text-white"
            // description="Use 8 or more characters with a mix of letters & numbers"
            state={formState.password.status as any}
            errorMessage={formState.password.errorMessage}
            delay={500}
            rules={{
              type: 'string',
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
              message: 'Incorrect Password'
            }}
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value
              });
            }}
          ></Input>
        </div>
        <div className="text-white">
          <Input
            label="Re-enter password"
            type="password"
            placeholder="Confirm my password"
            className="bg-[#212121] text-white"
            name="reenterPassword"
            state={formState.reenterPassword.status as any}
            errorMessage={formState.reenterPassword.errorMessage}
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
                reenterPassword: e.target.value
              });
            }}
          ></Input>
        </div>
        <div className="flex flex-col gap-[.5rem]">
          <div className="flex gap-[.75rem]">
            <Checkbox
              outClassNames={`${
                acceptConditions ? 'border-[#FFD850]' : 'border-[#8C8C8C]'
              }`}
              isCircle={true}
              innerClassNames="bg-[#FFD850]"
              onChange={(value) => {
                if (value) {
                  setAcceptErrorMessage(false);
                }
                setAcceptCondition(value);
              }}
            ></Checkbox>

            <p
              className={cn(
                `text-white text-[14px] font-next-book tracking-[-0.154px]`,
                acceptErrorMessage ? 'text-[#FF4747]' : ''
              )}
            >
              {`I agree with HackQuest's `}
              <Link
                href={'/hackquest/privacy-policy'}
                target="_blank"
                className="underline"
              >
                Terms of Service, Privacy Policy.
              </Link>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[.625rem]">
          <Button
            onClick={onRegister}
            block
            icon={<RightArrowIcon></RightArrowIcon>}
            iconPosition="right"
            className="
          font-next-book
          text-[1.125rem]
          bg-auth-primary-button-bg hover:bg-auth-primary-button-hover-bg
          text-auth-primary-button-text-color hover:text-auth-primary-button-text-hover-color
          border-auth-primary-button-border-color hover:border-auth-primary-button-border-hover-color
          "
          >
            Create my account
          </Button>
          <Button
            onClick={onBack}
            block
            className="
            font-next-book
            text-[1.125rem]
            border
            bg-transparent
            text-white hover:text-auth-ghost-button-text-hover-color
            border-white hover:border-auth-ghost-button-border-hover-color
          "
          >
            Back
          </Button>
        </div>
      </div>
      <WhiteListModal
        open={showWhiteListModal}
        onClose={() => setShowWhiteListModal(false)}
      ></WhiteListModal>
    </div>
  );
};

export default RegisterForm;
