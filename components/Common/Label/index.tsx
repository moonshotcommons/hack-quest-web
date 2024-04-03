import React from 'react';

interface LabelProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Label: React.FC<LabelProps & Omit<React.HTMLAttributes<HTMLElement>, 'className'>> = (props) => {
  const { icon, children, className, ...rest } = props;

  return (
    <span
      className={`flex items-center gap-2 text-xs font-normal not-italic text-text-default-color ${className} whitespace-nowrap`}
      {...rest}
    >
      <span className="text-course-card-title-text-color">{icon}</span>
      <span>{children}</span>
    </span>
  );
};

export default Label;
