import { cn } from '@/helper/utils';
import { useDebounceFn } from 'ahooks';
import Schema, { Rule, Rules } from 'async-validator';
import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
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
import { PiWarningCircleFill } from 'react-icons/pi';

export interface InputProps {
  name: string;
  label: string | ReactNode;
  type: HTMLInputTypeAttribute;
  theme?: 'dark' | 'light';
  placeholder?: string;
  state?: 'success' | 'error' | 'warning' | 'default';
  className?: string;
  prefix?: ReactNode;
  description?: string;
  errorMessage?: string | null | undefined;
  rules?: Rule;
  delay?: number;
  defaultValue?: string | number;
  clear?: boolean;
  showVisibleIcon?: boolean;
  rightLabel?: ReactNode;
  labelClassName?: string;
  initBorderColor?: string;
}

export interface InputRef {
  focus: () => void;
  blur: () => void;
}

const Input = forwardRef<
  InputRef,
  InputProps & InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const {
    label,
    type: propType,
    theme = 'dark',
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
    defaultValue = '',
    clear = false,
    showVisibleIcon = propType === 'password' ? true : false,
    rightLabel,
    labelClassName = '',
    initBorderColor = '',
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

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
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
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
      <div className="flex justify-between">
        <p
          className={cn(
            'body-l-bold label',
            `${
              theme !== 'dark' ? 'text-neutral-off-black' : ''
            } ${labelClassName} `
          )}
        >
          {label}
        </p>
        {rightLabel}
      </div>
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          className={cn(
            `w-full border border-solid outline-none px-[24px] py-[11px] rounded-[2.5rem] body-m text-neutral-medium-gray`,

            theme !== 'dark'
              ? 'border-neutral-light-gray caret-neutral-off-black hover:border-neutral-medium-gray focus:border-neutral-medium-gray focus:text-neutral-off-black'
              : 'border-[#212121] caret-[#ffffff] hover:border-[#212121] focus:border-[#212121]',
            status === 'success'
              ? 'border-status-success focus:border-status-success'
              : '',
            status === 'error'
              ? 'border-status-error-dark focus:border-status-error-dark'
              : '',
            initBorderColor,
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
              className="text-status-error-dark flex justify-center items-center cursor-pointer"
              onClick={() => {
                setValue('');
                setErrorMessage('');
                setStatus('default');
                const event = {
                  target: inputRef.current
                };
                onChange?.(event as any);
              }}
            >
              <CloseIcon width={20} height={20}></CloseIcon>
            </span>
          )}
          {status === 'success' && (
            <span className="text-status-success">
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
      {description && <p className="ml-[1.5rem] body-m">{description}</p>}
      {errorMessage && (
        <p className="text-status-error-dark body-s flex flex-row items-center gap-2">
          <PiWarningCircleFill size={20} className="text-status-error-dark" />
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
