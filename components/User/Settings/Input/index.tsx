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
import PassIcon from '@/components/Common/Icon/Pass';

interface InputProps {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  state?: 'success' | 'error' | 'warning' | 'default';
  className?: string;
  prefix?: ReactNode;
  description?: string;
  errorMessage?: string | null | undefined;
  rules?: Rule;
  delay?: number;
  defaultValue?: string;
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
    type,
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
            setStatus('default');
            setErrorMessage('');
          }
        });
      }

      onChange?.(e);
    },
    { wait: delay }
  );

  return (
    <div className="flex flex-col gap-[1.5rem] w-full">
      <p className="text-[#676767] font-next-book text-[1rem] leading-[120%]">
        {label}
      </p>
      <div className="relative w-full">
        <input
          ref={inputRef}
          type={type}
          value={value}
          placeholder={placeholder}
          className={cn(
            `w-full h-[3.75rem] px-[1.5rem] bg-transparent border border-solid border-setting-input-line-color rounded-[2.5rem] outline-none text-setting-input-text-color text-[1.25rem] font-Sofia-Pro-Light-Az -leading-[0.01375rem] caret-[#5B5B5B] hover:border-setting-input--border-hover-color focus:border-setting-input--border-hover-color focus:text-setting-input-text-color`,
            status === 'success'
              ? 'border-[#9EFA13] focus:border-[#9EFA13]'
              : '',
            status === 'error' ? 'border-[#FF4747] focus:border-[#FF4747]' : '',
            className
          )}
          onChange={(e) => {
            setValue(e.target.value);
            setStatus('default');
            setErrorMessage('');
            run(e);
          }}
          {...rest}
        />
        <span className="absolute right-[1.4375rem] top-[50%] -translate-y-[50%]">
          {status === 'success' ? (
            <PassIcon width={19} height={15}></PassIcon>
          ) : null}
        </span>
      </div>
      {description && (
        <p className="ml-[1.5rem] text-[#676767] text-[1rem] leading-[150%] tracking-[-0.011rem] font-Sofia-Pro-Light-Az">
          {description}
        </p>
      )}
      {errorMessage && (
        <p className="ml-[1.5rem] text-[#FF4747] text-[1rem] leading-[150%] tracking-[-0.011rem] font-Sofia-Pro-Light-Az">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
