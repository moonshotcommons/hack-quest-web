import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

type ButtonType = 'default' | 'primary' | 'secondary' | 'text';
interface ButtonProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  type?: ButtonType;
}

const Button: React.FC<
  ButtonProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
> = (props) => {
  const { icon, children, className, color, type = 'default', ...rest } = props;
  return (
    <button
      className={`flex gap-2 items-center whitespace-nowrap text-[#9EFA13] rounded-[2.5rem] bg-[#2A2A2A] text-[0.625rem] not-italic font-normal px-4 py-2 font-next-book-Thin ${className}`}
      {...rest}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;
