'use client';
import React, {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { cn } from '@/helper/utils';
export type ButtonType = 'default' | 'primary' | 'secondary' | 'text';
type SizeType = 'default' | 'large' | 'medium-x' | 'medium-y' | 'small';
import Loading from '@/public/images/other/loading.png';
import Image from 'next/image';
import { useIsClient } from '@/hooks/dom/useIsClient';

interface BaseButtonProps {
  type?: ButtonType;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
  block?: boolean;
  rounded?: 'full' | 'medium' | 'small' | 'large';
  ghost?: boolean;
  size?: SizeType;
  loading?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  uppercase?: boolean;
}

export type ButtonProps = BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>;

const Button: ForwardRefRenderFunction<HTMLButtonElement | null, ButtonProps> = (props, ref) => {
  const {
    type = 'primary',
    icon,
    iconPosition = 'left',
    children,
    className,
    block,
    rounded,
    ghost,
    size,
    loading = false,
    disabled: propDisabled,
    htmlType,
    uppercase = true,
    ...rest
  } = props;
  // const classNames = ;

  const mergeSize = () => {
    switch (size) {
      case 'large':
        return 'px-[2.5rem] py-[1.25rem]';
      case 'medium-x':
        return 'px-[2rem] py-[1rem]';
      case 'medium-y':
        return 'px-[1.875rem] py-[1.25rem]';
      case 'small':
        return 'px-[1rem] py-[.5rem] text-[.625rem]';
      default:
        return 'px-[2rem] py-[1rem]';
    }
  };

  const mergeRounded = () => {
    if (!rounded) return 'rounded-[2.5rem]';
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [loadingSize, setLoadingSize] = useState([48, 48]);

  const isClient = useIsClient();

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      setLoadingSize([button.clientHeight * 0.88889, button.clientHeight * 0.88889]);
    }
  }, [children, isClient]);

  const disabled = propDisabled || loading;

  useImperativeHandle(ref, () => {
    return buttonRef.current!;
  });

  return (
    <button
      ref={buttonRef}
      aria-disabled={disabled}
      className={cn(
        `text-button-m relative flex h-fit w-fit cursor-pointer items-center justify-center gap-[.625rem] text-neutral-black outline-none transition-all hover:scale-[1.05]`,
        uppercase ? 'uppercase' : '',
        type === 'primary' ? 'bg-yellow-primary' : '',
        type === 'text' ? 'border-none bg-transparent' : '',
        block && 'w-full',
        mergeSize(),
        mergeRounded(),
        loading ? 'cursor-not-allowed opacity-70' : '',
        loading && type === 'primary' ? 'bg-[#FFF4CE] opacity-100' : '',
        ghost && 'border border-neutral-black bg-transparent',
        disabled ? '!cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray hover:scale-[1]' : '',
        className
      )}
      type={htmlType}
      disabled={disabled}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span style={{ visibility: loading ? 'hidden' : 'visible' }}>{icon}</span>}
      <span style={{ visibility: loading ? 'hidden' : 'visible' }}>{children}</span>
      {icon && iconPosition === 'right' && <span style={{ visibility: loading ? 'hidden' : 'visible' }}>{icon}</span>}

      {loading && (
        <>
          <Image
            src={Loading}
            width={loadingSize[0]}
            height={loadingSize[1]}
            alt="loading"
            className="absolute animate-spin object-contain opacity-100"
          ></Image>
        </>
      )}
    </button>
  );
};

export default forwardRef(Button);
