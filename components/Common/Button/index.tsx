'use client';
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/helper/utils';
type ButtonType = 'default' | 'primary' | 'secondary' | 'text';
type SizeType = 'default' | 'large' | 'medium-x' | 'medium-y' | 'small';
import Loading from '@/public/images/other/loading.png';
import Image from 'next/image';

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
}

export type ButtonProps = BaseButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>;

const Button: FC<ButtonProps> = (props) => {
  const {
    type,
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
    onClick: propOnClick,
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

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      setLoadingSize([button.clientHeight * 0.88889, button.clientHeight * 0.88889]);
    }
  }, [buttonRef]);

  const disabled = propDisabled || loading;
  return (
    <button
      ref={buttonRef}
      className={cn(
        `relative flex h-fit w-fit cursor-pointer items-center justify-center gap-[.625rem] text-neutral-black`,
        type === 'primary' ? 'bg-yellow-primary' : '',
        type === 'primary' && !disabled ? 'hover:bg-yellow-hover' : '',
        type === 'text' ? 'border-none bg-transparent' : '',
        block && 'w-full',
        mergeSize(),
        mergeRounded(),
        loading ? 'cursor-not-allowed opacity-70' : '',
        loading && type === 'primary' ? 'bg-[#FFF4CE] opacity-100 hover:bg-[#FFF4CE]' : '',
        ghost && 'border border-neutral-black bg-transparent',
        ghost && !disabled ? 'hover:bg-neutral-off-white' : '',
        disabled ? 'cursor-not-allowed opacity-40' : '',
        className
      )}
      type={htmlType}
      onClick={(e) => {
        if (disabled) return;
        propOnClick?.(e);
      }}
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

export default Button;
