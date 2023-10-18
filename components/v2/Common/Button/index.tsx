import React, {
  FC,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef
} from 'react';
import classnames from 'classnames';
import { omit } from 'lodash-es';
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
}

export type ButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>;

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
        return 'px-[1rem] py-[.5rem] font-next-book-Thin text-[.625rem]';
      default:
        return 'px-[2rem] py-[1rem]';
    }
  };

  const mergeRounded = () => {
    if (!rounded) return 'rounded-[2.5rem]';
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  const loadingSize = useMemo(() => {
    const button = buttonRef.current;
    if (!button) return [26, 26];
    const fontSize = window
      .getComputedStyle(button)
      .getPropertyValue('font-size');
    if (parseInt(fontSize || '0') > 0)
      return [parseInt(fontSize) * 1.625, parseInt(fontSize) * 1.625];
    return [26, 26];
  }, [buttonRef]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        `text-text-default-color flex gap-[.625rem] items-center justify-center h-fit w-fit cursor-pointer`,
        type === 'primary' ? 'bg-primary-color' : '',
        block && 'w-full',
        ghost && 'bg-transparent border-primary-color',
        mergeSize(),
        mergeRounded(),
        className,
        loading ? 'opacity-60 cursor-not-allowed' : '',
        rest.disabled ? 'cursor-pointer' : ''
      )}
      {...rest}
    >
      {!loading && (
        <>
          {icon && iconPosition === 'left' && <span>{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span>{icon}</span>}
        </>
      )}
      {loading && (
        <Image
          src={Loading}
          width={loadingSize[0]}
          height={loadingSize[1]}
          alt="loading"
          className="object-contain animate-spin"
        ></Image>
      )}
    </button>
  );
};

export default Button;
