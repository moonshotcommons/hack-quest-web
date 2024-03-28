import { VariantProps, cva } from 'class-variance-authority';
import { changeTextareaHeight, cn } from '@/helper/utils';
import { useDebounceFn } from 'ahooks';
import Schema, { Rule, Rules } from 'async-validator';
import { HTMLInputTypeAttribute, ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import CloseIcon from '../Icon/Close';
import EyeIcon from '../Icon/Eye';
import PassIcon from '../Icon/Pass';
import { PiWarningCircleFill } from 'react-icons/pi';

const inputVariants = cva(
  'w-full border no-scrollbar border-solid outline-none px-[24px] py-[11px] rounded-[1.5rem] body-m text-neutral-medium-gray',
  {
    variants: {
      theme: {
        light:
          'border-neutral-light-gray caret-neutral-off-black hover:border-neutral-medium-gray focus:border-neutral-medium-gray focus:text-neutral-off-black',
        dark: 'border-neutral-dark-gray caret-[#ffffff] hover:border-neutral-dark-gray focus:border-neutral-dark-gray'
      },
      state: {
        success: 'border-status-success focus:border-status-success',
        error: 'border-status-error-dark focus:border-status-error-dark',
        warning: '',
        default: ''
      },
      device: {
        web: '',
        mobile: ''
      }
    },
    defaultVariants: {
      theme: 'light',
      state: 'default',
      device: 'web'
    }
  }
);

const labelVariants = cva('body-l-bold label', {
  variants: {
    theme: {
      light: 'text-neutral-off-black',
      dark: ''
    },
    device: {
      web: '',
      mobile: 'body-m-bold'
    }
  },
  defaultVariants: {
    theme: 'light',
    device: 'web'
  }
});

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants>,
    VariantProps<typeof labelVariants> {
  label?: string | ReactNode;
  name: string;
  type?: HTMLInputTypeAttribute;
  description?: string;
  errorMessage?: string | null | undefined;
  rules?: Rule;
  delay?: number;
  clear?: boolean;
  showVisibleIcon?: boolean;
  rightLabel?: ReactNode;
  labelClassName?: string;
  initBorderColor?: string;
  isMobile?: boolean;
  isShowCount?: boolean;
  textAreaMinHeight?: number;
}

export interface TextAreaRef {
  focus: () => void;
  blur: () => void;
}

const TextArea = forwardRef<TextAreaRef, TextAreaProps>((props, ref) => {
  const {
    label,
    type: propType = 'text',
    theme = 'light',
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
    isMobile = false,
    onBlur,
    isShowCount,
    textAreaMinHeight = 100,
    ...rest
  } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [status, setStatus] = useState(propsState);
  const [errorMessage, setErrorMessage] = useState('');
  const descriptor: Rules = {
    [name]: rules || {}
  };
  const validator = new Schema(descriptor);
  const [value, setValue] = useState(defaultValue || props.value || '');
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

      onBlur?.(e);
    },
    { wait: delay }
  );

  const labelNode = (
    <div className="flex justify-between">
      <p
        className={cn(
          labelVariants({
            className: labelClassName,
            theme,
            device: isMobile ? 'mobile' : 'web'
          })
        )}
      >
        {label}
      </p>
      {rightLabel}
    </div>
  );

  const errorIcon = (
    <span
      className="flex cursor-pointer items-center justify-center text-status-error-dark"
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
  );

  const successIcon = (
    <span className="text-status-success">
      <PassIcon width={19} height={15} color="currentColor"></PassIcon>
    </span>
  );

  const visibleIcon = (
    <span
      className="cursor-pointer text-auth-input-visible-icon-color"
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
      onTouchStart={(e) => {
        if (propType === 'password' && type === 'password') {
          setType('text');
        }
      }}
      onTouchCancel={(e) => {
        if (propType === 'password' && type === 'text') {
          setType('password');
        }
      }}
      onTouchEnd={() => {
        if (propType === 'password' && type === 'text') {
          setType('password');
        }
      }}
    >
      <EyeIcon size={20} color="currentColor"></EyeIcon>
    </span>
  );

  return (
    <div className="flex flex-col gap-[0.75rem]">
      {label ? labelNode : null}
      <div className="relative">
        <textarea
          ref={textareaRef}
          type={type}
          value={value}
          placeholder={placeholder}
          style={{
            minHeight: `${textAreaMinHeight}px`,
            height: `${textAreaMinHeight}px`
          }}
          className={cn(
            inputVariants({
              className,
              theme,
              state: status,
              device: isMobile ? 'mobile' : 'web'
            }),
            initBorderColor
          )}
          onChange={(e) => {
            setValue(e.target.value);
            setErrorMessage('');
            setStatus('default');
            onChange?.(e);
          }}
          onInput={(e) => {
            const textarea = e.target as HTMLTextAreaElement;
            changeTextareaHeight(textarea, textAreaMinHeight);
          }}
          onBlur={(e) => {
            run(e);
          }}
          {...rest}
        />
        <span className="absolute right-[1.4375rem] top-[50%] flex -translate-y-[50%] items-center gap-4">
          {status === 'error' && errorIcon}
          {status === 'success' && successIcon}
          {showVisibleIcon && value && visibleIcon}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className={`body-m flex flex-1 flex-row items-center gap-2 text-status-error-dark ${errorMessage ? '' : 'hidden'}`}>
          <PiWarningCircleFill size={20} />
          {errorMessage}
        </p>
        <p className={`body-l flex flex-1 justify-end  text-neutral-medium-gray ${isShowCount ? '' : 'hidden'}`}>
          {`${value.toString().length}/${rest.maxLength}`}
        </p>
      </div>
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
