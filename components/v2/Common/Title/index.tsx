import classNames from 'classnames';
import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<
  TitleProps & Omit<React.HTMLAttributes<HTMLElement>, 'className'>
> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <h2
      className={`text-course-card-title-text-color font-next-poster-Bold text-lg mt-[2.88rem] mb-[2.5rem] ${className}`}
      {...rest}
    >
      {props.children}
    </h2>
  );
};

export default Title;
