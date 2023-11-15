import { cn } from '@/helper/utils';
import { useDebounceFn } from 'ahooks';
import Schema, { Rule, Rules } from 'async-validator';
import {
  TextareaHTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import CloseIcon from '../Icon/Close';
import EyeIcon from '../Icon/Eye';
import PassIcon from '../Icon/Pass';
import WarningIcon from '../Icon/Warning';

interface InputProps {
  name: string;
  label: string | ReactNode;
  placeholder?: string;
  state?: 'success' | 'error' | 'warning' | 'default';
  className?: string;
  prefix?: ReactNode;
  description?: string;
  errorMessage?: string | null | undefined;
  rules?: Rule;
  delay?: number;
  row?: number;
  defaultValue?: string;
  clear?: boolean;
  showVisibleIcon?: boolean;
}

export interface InputRef {
  focus: () => void;
  blur: () => void;
}

const Input = forwardRef<
  InputRef,
  InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  const {
    label,
    type: propType,
    placeholder,
    prefix,
    description,
    state: propsState,
    errorMessage: propsErrorMessage,
    name,
    rules,
    delay = 0,
    className,
    onChange,
    row = 5,
    defaultValue = '',
    clear = false,
    showVisibleIcon = propType === 'password' ? true : false,
    ...rest
  } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [status, setStatus] = useState(propsState);
  const [errorMessage, setErrorMessage] = useState('');
  const descriptor: Rules = {
    [name]: rules || {}
  };
  const validator = new Schema(descriptor);
  const [value, setValue] = useState(defaultValue);
  const [type, setType] = useState(propType);

  useEffect(() => {
    setStatus(propsState);
  }, [propsState]);

  useEffect(() => {
    setErrorMessage(propsErrorMessage || '');
  }, [propsErrorMessage]);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        textareaRef.current?.focus();
      },
      blur: () => {
        textareaRef.current?.blur();
      },
      setStatus(value: any) {
        setStatus(value);
      },
      setErrorMessage(value: any) {
        setErrorMessage(value);
      }
    };
  });

  const { run } = useDebounceFn(
    (e) => {
      if (rules) {
        validator.validate({ [name]: e.target.value }, (errors, fields) => {
          if (errors && errors[0]) {
            setStatus('error');
            setErrorMessage(errors[0].message || '');
          } else {
            setStatus('success');
            setErrorMessage('');
          }
        });
      }

      onChange?.(e);
    },
    { wait: delay }
  );

  return (
    <div className="flex flex-col gap-[0.75rem]">
      <p className="text-[21px] font-next-poster leading-[125%] tracking-[1.26px]">
        {label}
      </p>
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          placeholder={placeholder}
          rows={row}
          className={cn(
            `w-full border border-solid min-h-[150px] max-h-[300px] border-[#212121] outline-none px-[25px] py-[15px] rounded-[24px] text-[14px] font-next-book leading-[118.5%]  hover:border-[#212121] focus:border-[#212121]`,
            // type === 'password' &&
            //   'border-auth-password-input-bg focus:border-[#212121]',
            status === 'success'
              ? 'border-auth-input-success-color focus:border-auth-input-success-color'
              : '',
            status === 'error'
              ? 'border-auth-input-error-color focus:border-auth-input-error-color'
              : '',
            className
          )}
          onChange={(e) => {
            setValue(e.target.value);
            setErrorMessage('');
            setStatus('default');
            run(e);
          }}
          {...rest}
        />

        <span className="absolute right-[1.4375rem] top-[50%] -translate-y-[50%] flex gap-4 items-center">
          {status === 'error' && (
            <span
              className="text-auth-input-error-color flex justify-center items-center cursor-pointer"
              onClick={() => {
                setValue('');
                setErrorMessage('');
                setStatus('default');
                const event = {
                  target: textareaRef.current
                };
                onChange?.(event as any);
              }}
            >
              <CloseIcon width={20} height={20}></CloseIcon>
            </span>
          )}
          {status === 'success' && (
            <span className="text-auth-input-success-icon-color">
              <PassIcon width={19} height={15} color="currentColor"></PassIcon>
            </span>
          )}
          {showVisibleIcon && value && (
            <span
              className="text-auth-input-visible-icon-color cursor-pointer"
              onMouseDown={(e) => {
                if (propType === 'password' && type === 'password') {
                  setType('text');
                }
              }}
              onMouseLeave={(e) => {
                if (propType === 'password' && type === 'text') {
                  setType('password');
                }
              }}
              onMouseUp={() => {
                if (propType === 'password' && type === 'text') {
                  setType('password');
                }
              }}
            >
              <EyeIcon size={20} color="currentColor"></EyeIcon>
            </span>
          )}
        </span>
      </div>
      {description && (
        <p className="ml-[1.5rem] text-  text-[1rem] leading-[150%] tracking-[-0.011rem] font-Sofia-Pro-Light-Az">
          {description}
        </p>
      )}
      {errorMessage && (
        <p className="text-auth-input-error-color text-[1rem] leading-[150%] tracking-[-0.011rem] font-Sofia-Pro-Light-Az flex flex-row items-center gap-2">
          <WarningIcon width={17} height={16}></WarningIcon>
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
