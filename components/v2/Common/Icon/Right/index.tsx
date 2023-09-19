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

const RightIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width = 20, height = 11, color = 'currentColor' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 5.5H19" stroke={color} />
      <path d="M14 0.5L19 5.5L14 10.5" stroke={color} />
    </svg>
  );
};
export default RightIcon;
