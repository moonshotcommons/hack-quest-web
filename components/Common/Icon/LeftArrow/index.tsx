import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  children?: React.ReactNode;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const LeftArrowIcon: React.FC<IconProps> = (props) => {
  const { size = 24, color = 'currentColor' } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M31 36L19 24L31 12" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
export default LeftArrowIcon;
