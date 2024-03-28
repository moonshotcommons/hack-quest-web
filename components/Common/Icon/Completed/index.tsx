import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  width?: number | string;
  height?: number | string;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const CompletedIcon: React.FC<IconProps> = (props) => {
  const { size = 24 } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#00C365" />
      <path d="M8 15.9999L14.4 22.3999L25.6 11.1999" stroke="white" strokeLinecap="round" />
    </svg>
  );
};
export default CompletedIcon;
