import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import { omit } from 'lodash-es';
import { cn } from '@/helper/utils';
type ButtonType = 'default' | 'primary' | 'secondary' | 'text';

interface BaseButtonProps {
  type?: any;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  // type?: ButtonType;
  block?: boolean;
  rounded?: string;
  bgColor?: string;
  textStyle?: string;
  padding?: string;
  fontStyle?: string;
}

const defaultConfig = {
  rounded: 'rounded-[2.5rem]',
  bgColor: 'bg-[#2A2A2A]',
  textStyle: 'text-[0.625rem] text-[#9EFA13]',
  padding: 'px-4 py-2',
  fontStyle: 'not-italic font-normal font-next-book-Thin'
};

const getClassNames = (props: Partial<ButtonProps>) => {
  const {
    // type,
    icon,
    rounded,
    block,
    bgColor,
    padding,
    textStyle,
    fontStyle,
    ...rest
  } = props;
  let className = (rest.className ?? '') + ' ';
  className += classnames(
    block ? 'w-full' : 'w-fit',
    icon ? 'gap-2' : '',
    rounded ? rounded : defaultConfig.rounded,
    bgColor ? bgColor : defaultConfig.bgColor,
    textStyle ? textStyle : defaultConfig.textStyle,
    padding ? padding : defaultConfig.padding,
    fontStyle ? fontStyle : defaultConfig.fontStyle
  );

  return className;
};

export type ButtonProps = BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>;

const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;

  const className = getClassNames(rest);
  return (
    <button
      className={cn(
        `flex items-center justify-center whitespace-nowrap ${className}`
      )}
      {...omit(rest, [
        'icon',
        'rounded',
        'block',
        'bgColor',
        'padding',
        'textStyle',
        'fontStyle',
        'className'
      ])}
    >
      {rest.icon}
      <span>{children}</span>
    </button>
  );
};

interface NewButtonProps {
  type?: ButtonType;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
  block?: boolean;
  rounded?: 'full' | 'medium' | 'small' | 'large';
  ghost?: boolean;
}

const NewButton: FC<NewButtonProps> = (props) => {
  const {
    type,
    icon,
    iconPosition,
    children,
    className,
    block,
    rounded,
    ghost
  } = props;
  // const classNames = ;

  return (
    <button
      className={cn(
        `text-text-default-color`,
        type === 'primary' ? '' : '',
        block && 'w-full',
        ghost && 'bg-transparent',
        className
      )}
    >
      {iconPosition === 'left' && <span>{icon}</span>}
      <span>{children}</span>
      {iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
};

export default Button;
