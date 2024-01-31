import { cn } from '@/helper/utils';
import { Rule } from 'async-validator';
import {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import CloseIcon from '../Icon/Close';
import PassIcon from '../Icon/Pass';
import WarningIcon from '../Icon/Warning';
import { AiFillCaretDown } from 'react-icons/ai';
import { FiCheck } from 'react-icons/fi';
import { OptionType } from './type';

interface SelectProps {
  name: string;
  label?: string | ReactNode;
  placeholder?: string;
  state?: 'success' | 'error' | 'warning' | 'default';
  className?: string;
  onChange: (v: string) => void;
  description?: string;
  errorMessage?: string | null | undefined;
  rules?: Rule;
  defaultValue?: string;
  options: OptionType[];
}

export interface InputRef {
  focus: () => void;
  blur: () => void;
}

const Select = forwardRef<
  InputRef,
  SelectProps & InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const {
    label,
    placeholder,
    description,
    state: propsState,
    errorMessage: propsErrorMessage,
    name,
    rules,
    className,
    onChange,
    disabled,
    defaultValue = '',
    options,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState(propsState);
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState(defaultValue);
  const [selectLabel, setSelectLabel] = useState('');
  const [visibleOption, setVisibleOption] = useState(false);

  useEffect(() => {
    setStatus(propsState);
  }, [propsState]);

  useEffect(() => {
    const l = options?.find((v) => v.value === value)?.label || '';
    setSelectLabel(l);
  }, [value, options]);

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

  return (
    <div className="flex flex-col gap-[0.75rem] w-full relative">
      {label ? (
        <p className="text-[21px] font-next-poster leading-[125%] tracking-[1.26px]">
          {label}
        </p>
      ) : null}

      <div className="relative">
        <input
          ref={inputRef}
          onFocus={() => setVisibleOption(true)}
          onBlur={() =>
            setTimeout(() => {
              setVisibleOption(false);
            }, 310)
          }
          type={'text'}
          value={selectLabel}
          readOnly
          placeholder={placeholder}
          className={cn(
            `w-full border cursor-pointer border-solid border-neutral-dark-gray outline-none px-[25px] py-[15px] rounded-[2.5rem] text-[14px] font-next-book leading-[118.5%] caret-[#ffffff] hover:border-neutral-dark-gray focus:border-neutral-dark-gray`,
            // type === 'password' &&
            //   'border-auth-password-input-bg focus:border-neutral-dark-gray',
            status === 'success'
              ? 'border-auth-input-success-color focus:border-auth-input-success-color'
              : '',
            status === 'error'
              ? 'border-auth-input-error-color focus:border-auth-input-error-color'
              : '',
            className
          )}
          {...rest}
        />

        <span className="absolute right-[1.4375rem] top-[50%] -translate-y-[50%] flex gap-4 items-center">
          {status === 'default' && (
            <AiFillCaretDown className=" text-neutral-medium-gray text-[20px]" />
          )}
          {status === 'error' && (
            <span
              className="text-auth-input-error-color flex justify-center items-center cursor-pointer"
              onClick={() => {
                setValue('');
                setErrorMessage('');
                setStatus('default');
                onChange?.('');
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
        </span>
        {visibleOption && (
          <div className="absolute w-full top-0 z-[1000] text-[21px] text-[#] bg-[#fff] left-0 border border-neutral-dark-gray rounded-[24px] pb-[5px] font-next-book overflow-hidden">
            <div
              className="flex items-center justify-between mx-[20px] h-[48px] border-b border-b-[#8C8C8C] cursor-pointer"
              onClick={() => {
                setVisibleOption(false);
              }}
            >
              <span>{selectLabel}</span>
              <AiFillCaretDown className=" text-neutral-medium-gray text-[20px] rotate-180" />
            </div>
            <ul className="w-full max-h-[250px] overflow-auto">
              {options.map((v: OptionType) => (
                <li
                  key={v.value}
                  className={`leading-[34px] px-[20px] flex items-center justify-between mt-[5px] cursor-pointer ${
                    value === v.value ? 'bg-neutral-off-white' : ''
                  }`}
                  onClick={() => {
                    setValue(v.value);
                    setErrorMessage('');
                    setStatus('default');
                    setVisibleOption(false);
                    onChange?.(v.value);
                  }}
                >
                  <span>{v.label}</span>
                  {value === v.value && (
                    <FiCheck className="text-neutral-rich-gray text-[14px]" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
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

Select.displayName = 'Select';

export default Select;
