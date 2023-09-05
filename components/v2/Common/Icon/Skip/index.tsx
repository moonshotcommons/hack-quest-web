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

const SkipIcon: React.FC<IconProps> = (props) => {
  const { size = 16, width = 16, height = 16, color = '#F5F5F5' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.53516 12.0195L12.0204 3.53425" stroke={color} />
      <path d="M4.94922 3.53516H12.0203L12.0203 10.6062" stroke={color} />
    </svg>
  );
};
export default SkipIcon;
