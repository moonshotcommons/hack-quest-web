import { cn } from '@/helper/utils';
import {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react';

interface InputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  state?: 'success' | 'error' | 'warning' | 'default';
  className?: string;
  prefix?: ReactNode;
  description?: string;
  errorMessage?: string | null | undefined;
  rules?: {}[];
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
    state,
    errorMessage,
    ...rest
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      }
    };
  });
  return (
    <div className="flex flex-col gap-[0.75rem]">
      <p className="text-[#ACACAC] text-[1rem] font-Sofia-Pro-Light-Az leading-[150%] tracking-[-0.011rem]">
        {label}
      </p>
      <div className="w-fit h-fit">
        <input
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          className={cn(
            `w-[33.0625rem] border border-solid border-[#5B5B5B] bg-transparent px-[1.5rem] py-[1.12rem] rounded-[2.5rem] text-[#5B5B5B] text-[1.25rem] font-next-book leading-[118.5%] caret-[#5B5B5B] hover:border-white focus:border-white focus:text-white`,
            state === 'success' ? 'border-green-500' : '',
            state === 'error' ? 'border-red-500' : ''
          )}
          {...rest}
        />
      </div>
      {description && (
        <p className="ml-[1.5rem] text-[#676767] text-[1rem] leading-[150%] tracking-[-0.011rem] font-Sofia-Pro-Light-Az">
          {description}
        </p>
      )}
      {errorMessage && (
        <p className="ml-[1.5rem] text-[red] text-[1rem] leading-[150%] tracking-[-0.011rem] font-Sofia-Pro-Light-Az">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
