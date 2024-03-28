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

const PassIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width = 24, height = 24, color = '#9EFA13' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.5 5.78267L7.80303 11.9731L17.5 1.97314" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};
export default PassIcon;
