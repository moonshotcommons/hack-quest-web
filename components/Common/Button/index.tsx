import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';

type ButtonType = 'primary' | 'secondary' | 'text';
interface ButtonProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  type?: ButtonType;
}

const Button: React.FC<
  ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
> = (props) => {
  const { icon, children, className, color, ...rest } = props;
  return (
    <button
      className={`flex gap-2 items-center text-[#9EFA13] rounded-[2.5rem] bg-[#2A2A2A] text-[0.625rem] not-italic font-normal px-4 py-2 font-next-book-Thin`}
      {...rest}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default Button;
