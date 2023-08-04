import React, { FC, HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import { omit } from 'lodash-es';
import { cn } from '@/helper/utils';
type ButtonType = 'default' | 'primary' | 'secondary' | 'text';
type SizeType = 'default' | 'large' | 'medium-x' | 'medium-y' | 'small';
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

  return (
    <button
      className={cn(
        `text-text-default-color flex gap-[.625rem] items-center justify-center h-fit w-fit cursor-pointer`,
        type === 'primary' ? 'bg-primary-color' : '',
        block && 'w-full',
        ghost && 'bg-transparent border-primary-color',
        mergeSize(),
        mergeRounded(),
        className
      )}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
};

export default Button;
