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

const BottomIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width = 24, height = 24, color = '#333' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.5 4L5.5 16" stroke={color} />
      <path d="M10.5 11L5.5 16L0.5 11" stroke={color} />
    </svg>
  );
};
export default BottomIcon;
