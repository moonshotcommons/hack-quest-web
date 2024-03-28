import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const SignOutIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width = 24, height = 24, color = 'white' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.58606 8.79857C4.87664 5.40861 8.15705 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C8.15705 21 4.87664 18.5914 3.58606 15.2014"
        stroke={color}
        strokeLinecap="round"
      />
      <path d="M3 12H14.5M14.5 12L10.6 8M14.5 12L10.6 16" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
export default SignOutIcon;
