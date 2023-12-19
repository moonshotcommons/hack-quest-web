import LockIcon from '@/components/v2/Common/Icon/Lock';
import Input from '../Input';
import { useDebounceFn } from 'ahooks';
import Schema, { Rule } from 'async-validator';
import { FC, useEffect, useRef, useState } from 'react';
import webApi from '@/service';
import Image from 'next/image';
import OkIcon from '@/public/images/other/ok.svg';
import { Transition } from '@headlessui/react';
import { message } from 'antd';
interface ChangePasswordProps {
  // children: ReactNode;
}

const PasswordInput: FC<{ onChange: VoidFunction }> = (props) => {
  const { onChange } = props;

  return (
    <div className="w-full relative flex flex-col gap-[0.25rem] bottom-line">
      <span className="text-setting-input-title-color text-[0.875rem] font-next-book leading-[110%]">
        Password
      </span>
      <div className="h-[3.5rem] flex justify-between items-center">
        <div className="flex gap-[1.25rem]">
          <span className="text-setting-input-icon-color">
            <LockIcon color="currentColor" size={24}></LockIcon>
          </span>
          <input
            type="password"
            value={'********'}
            className="bg-transparent h-full text-setting-input-text-color text-[1rem] font-next-book leading-[120%]"
          />
        </div>

        <div
          className="text-[0.875rem] font-next-book leading-[120%] text-setting-transparent-button-text-color border border-solid border-setting-transparent-button-border-color bg-setting-transparent-button-bg px-[2.5rem] py-[1rem] rounded-[2.5rem] cursor-pointer"
          onClick={onChange}
        >
          Change password
        </div>
      </div>
    </div>
  );
};

const ChangePasswordInput: FC<{
  changeVisible: (value: boolean) => void;
  // setChangeStatus: (value: boolean) => void;
}> = (props) => {
  const { changeVisible } = props;
  const [changeSuccessVisible, setChangeSuccessVisible] = useState(false);
  const [formData, setFormData] = useState<{
    password: string;
    newPassword: string;
    reenterPassword: string;
  }>({
    password: '',
    newPassword: '',
    reenterPassword: ''
  });

  const [formState, setFormState] = useState({
    password: {
      status: 'default',
      errorMessage: ''
    },
    newPassword: {
      status: 'default',
      errorMessage: ''
    },
    reenterPassword: {
      status: 'default',
      errorMessage: ''
    }
  });

  const updateDisable =
    !formData.password || !formData.newPassword || !formData.reenterPassword;

  let descriptor: Record<string, Rule> = {
    newPassword: {
      type: 'string',
      required: true,
      pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
      message: 'Use 8 or more characters with a mix of letters & numbers'
    },
    reenterPassword: [
      {
        type: 'string',
        required: true,
        pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
        message: 'Use 8 or more characters with a mix of letters & numbers'
      },
      {
        type: 'string',
        message: 'Those passwords didn’t match. Try again.',
        validator(rule, value) {
          return value === formData.newPassword;
        }
      }
    ]
  };
  const currentPasswordRef = useRef<any>();
  const validator = new Schema(descriptor);

  const { run: onUpdate } = useDebounceFn(
    () => {
      validator.validate(formData, async (errors, fields) => {
        if (!errors) {
          try {
            const res = (await webApi.userApi.updatePassword(formData)) as any;
            const status: any = { ...formState };
            for (let key in status) {
              status[key] = { status: 'success', errorMessage: '' };
            }
            setChangeSuccessVisible(true);
            message.success('Updated password successfully');
          } catch (e: any) {
            currentPasswordRef.current?.setStatus?.('error');
            currentPasswordRef.current?.setErrorMessage?.(e.msg);
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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (changeSuccessVisible) {
      setTimeout(() => {
        changeVisible(false);
        setChangeSuccessVisible(false);
      }, 3000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [changeSuccessVisible]);

  return (
    <div className="w-full flex flex-col gap-[1.5rem] mt-[1.5rem]">
      <h1 className="text-text-default-color text-[1.5rem] font-bold font-next-poster-Bold leading-[110%] tracking-[0.03rem]">
        Change password
      </h1>
      {!changeSuccessVisible && (
        <div className="flex flex-col gap-[1.5rem]">
          <Input
            label="Current password"
            type="password"
            name="password"
            placeholder="Password"
            // description="Use 8 or more characters with a mix of letters & numbers"
            state={formState.password.status as any}
            errorMessage={formState.password.errorMessage}
            // delay={500}
            // rules={{
            //   type: 'string',
            //   required: true,
            //   pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
            //   message: 'Incorrect Password'
            // }}
            ref={currentPasswordRef as any}
            onChange={(e) => {
              setFormData({
                ...formData,
                password: e.target.value
              });
            }}
          ></Input>
          <Input
            label="New password"
            type="password"
            name="password"
            placeholder="Password"
            // description="Use 8 or more characters with a mix of letters & numbers"
            state={formState.newPassword.status as any}
            errorMessage={formState.newPassword.errorMessage}
            delay={500}
            rules={{
              type: 'string',
              required: true,
              pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
              message:
                'Use 8 or more characters with a mix of letters, numbers & symbols'
            }}
            onChange={(e) => {
              setFormData({
                ...formData,
                newPassword: e.target.value
              });
            }}
          ></Input>
          <Input
            label="Re-enter password"
            type="password"
            placeholder="Password"
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
                  return value === formData.newPassword;
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
          <div className="flex gap-[0.5rem] self-end">
            <button
              className="px-[2.5rem] py-[1rem] border border-solid border-[#676767] rounded-[2.5rem] text-[0.875rem] font-next-book leading-[120%] text-setting-transparent-button-text-color hover:bg-[#F2F2F2] hover:text-[#676767]"
              onClick={(e) => changeVisible(false)}
            >
              Cancel
            </button>
            <button
              disabled={updateDisable}
              className={`px-[2.5rem] py-[1rem] border border-solid bg-setting-upload-button-bg border-setting-upload-button-border-color rounded-[2.5rem] text-[0.875rem] font-next-book leading-[120%] text-setting-upload-button-text-color disabled:text-[#676767] hover:bg-[#F2F2F2] disabled:bg-transparent hover:text-[#676767] ${
                updateDisable ? 'cursor-not-allowed' : ''
              }`}
              onClick={onUpdate}
            >
              Update password
            </button>
          </div>
        </div>
      )}

      <Transition
        show={changeSuccessVisible}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-full flex flex-col gap-[1.5rem] items-center justify-center py-[2.5rem] h-[15.5rem] border border-solid border-[#5B5B5B] rounded-[1.25rem] transition-all duration-500 ease-in-out">
          <Image src={OkIcon} alt="success"></Image>
          <p className="text-[#5B5B5B] text-[1rem] leading-[120%] tracking-[0.01rem] font-next-book">
            You have changed your password successfully.
          </p>
          <button
            className="px-[2rem] py-[1rem] w-fit text-text-default-color text-[0.875rem] leading-[120%] border border-solid rounded-[2.5rem] border-[#5B5B5B]"
            onClick={(e) => {
              changeVisible(false);
              setChangeSuccessVisible(false);
            }}
          >
            Got it
          </button>
        </div>
      </Transition>
    </div>
  );
};

const ChangePassword: FC<ChangePasswordProps> = (props) => {
  const [showChangeInput, setShowChangeInput] = useState(false);
  return (
    <div>
      {/* {!showChangeInput ? (
        <PasswordInput
          onChange={() => setShowChangeInput(true)}
        ></PasswordInput>
      ) : !changeSuccessVisible ? (
        <ChangePasswordInput
          changeVisible={(value) => setShowChangeInput(value)}
          setChangeStatus={(value) => setChangeSuccessVisible(value)}
        ></ChangePasswordInput>
      ) : (
        <div className="text-white">你好世界</div>
      )} */}
      {!showChangeInput && (
        <PasswordInput
          onChange={() => setShowChangeInput(true)}
        ></PasswordInput>
      )}

      {showChangeInput && (
        <ChangePasswordInput
          changeVisible={(value) => setShowChangeInput(value)}
        ></ChangePasswordInput>
      )}
    </div>
  );
};

export default ChangePassword;
