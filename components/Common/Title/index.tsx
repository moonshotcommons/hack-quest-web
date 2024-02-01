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
      className={`text-h3 mb-[2.5rem] mt-[2.88rem] text-course-card-title-text-color ${className}`}
      {...rest}
    >
      {props.children}
    </h2>
  );
};

export default Title;
