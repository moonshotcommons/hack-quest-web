import Button from '@/components/Common/Button';
import Checkbox from '@/components/Common/Checkbox';
import Input from '@/components/Common/Input';
import { BurialPoint } from '@/helper/burialPoint';
import webApi from '@/service';
import { useDebounceFn } from 'ahooks';
import Schema, { Rule } from 'async-validator';
import React, { useMemo, useRef, useState } from 'react';

interface ChangePasswordProp {
  onClose: VoidFunction;
  setChangeSuccessVisible: VoidFunction;
}

const ChangePassword: React.FC<ChangePasswordProp> = ({
  onClose,
  setChangeSuccessVisible
}) => {
  const [formData, setFormData] = useState<{
    password: string;
    newPassword: string;
    reenterPassword: string;
  }>({
    password: '',
    newPassword: '',
    reenterPassword: ''
  });
  const [isAgree, setIsAgree] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const updateDisable = useMemo(() => {
    return (
      !formData.password ||
      !formData.newPassword ||
      !formData.reenterPassword ||
      !isAgree
    );
  }, [formData, isAgree]);

  let descriptor: Record<string, Rule> = {
    newPassword: {
      type: 'string',
      required: true,
      pattern: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
      message: '8 or more characters with a mix of letters & numbers'
    },
    reenterPassword: {
      type: 'string',
      required: true,
      message: 'Those passwords didn’t match. Try again.',
      validator(_, value) {
        return value === formData.newPassword;
      }
    }
  };
  const currentPasswordRef = useRef<any>();
  const validator = new Schema(descriptor);

  const { run: onUpdate } = useDebounceFn(
    () => {
      if (updateDisable || loading) return;
      validator.validate(formData, async (errors) => {
        if (!errors) {
          setLoading(true);
          try {
            await webApi.userApi.updatePassword(formData);
            const status: any = { ...formState };
            for (let key in status) {
              status[key] = { status: 'success', errorMessage: '' };
            }
            setLoading(false);
            setChangeSuccessVisible();
            BurialPoint.track('settings修改密码成功');
          } catch (e: any) {
            BurialPoint.track('settings修改密码失败', {
              message: e?.msg || e?.message || ''
            });
            currentPasswordRef.current?.setStatus?.('error');
            currentPasswordRef.current?.setErrorMessage?.(e.msg);
            setLoading(false);
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
    <div className="flex flex-col gap-[30px]">
      <Input
        label="Current password"
        labelClassName="font-normal"
        type="password"
        name="password"
        placeholder="Enter your current password"
        state={formState.password.status as any}
        errorMessage={formState.password.errorMessage}
        ref={currentPasswordRef as any}
        initBorderColor="border-neutral-medium-gray"
        onChange={(e) => {
          setFormData({
            ...formData,
            password: e.target.value
          });
        }}
      ></Input>
      <Input
        label="New Password"
        labelClassName="font-normal"
        type="password"
        name="password"
        placeholder="8+ characters with a mix of letters & numbers"
        state={formState.newPassword.status as any}
        errorMessage={formState.newPassword.errorMessage}
        initBorderColor="border-neutral-medium-gray"
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
        label="Re-Enter New Password"
        labelClassName="font-normal"
        type="password"
        placeholder="Confirm your new password"
        name="reenterPassword"
        state={formState.reenterPassword.status as any}
        errorMessage={formState.reenterPassword.errorMessage}
        delay={500}
        initBorderColor="border-neutral-medium-gray"
        rules={[
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
      <div
        className={`body-m flex w-fit  cursor-pointer items-center gap-[.75rem] ${
          isAgree ? 'text-neutral-black' : 'text-neutral-medium-gray'
        }`}
        onClick={(e) => {}}
      >
        <Checkbox
          outClassNames={`${
            isAgree ? 'border-neutral-off-black' : 'border-neutral-medium-gray'
          }`}
          innerClassNames="bg-neutral-off-black"
          checked={isAgree}
          onChange={(value) => {
            BurialPoint.track('login-保存登录状态');
            setIsAgree(value);
          }}
          isCircle={true}
        ></Checkbox>
        <p
          className=""
          onClick={() => {
            setIsAgree(!isAgree);
          }}
        >
          {`I agree with HackQuest's Terms of Service, Privacy Policy;`}
        </p>
      </div>
      <div className="flex justify-center gap-[15px] pt-[20px]">
        <Button
          className="button-text-m h-[48px] w-[240px] border border-neutral-black  text-neutral-black"
          onClick={(e) => {
            BurialPoint.track('settings取消修改密码');
            onClose();
          }}
        >
          CANCEL
        </Button>
        <Button
          loading={loading}
          className={`button-text-m h-[48px]  w-[240px]  ${
            updateDisable
              ? 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray'
              : 'bg-yellow-primary text-neutral-black'
          }`}
          onClick={onUpdate}
        >
          UPDATE PASSWORD
        </Button>
      </div>
    </div>
  );
};

export default ChangePassword;
