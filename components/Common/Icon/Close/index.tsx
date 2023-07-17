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

const CloseIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width = 24, height = 24, color = '#F2F2F2' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="2.08579"
        y1="17.5858"
        x2="18.0858"
        y2="1.58579"
        stroke={color}
        strokeWidth="4"
      />
      <line
        x1="1.91421"
        y1="1.58579"
        x2="17.9142"
        y2="17.5858"
        stroke={color}
        strokeWidth="4"
      />
    </svg>
  );
};
export default CloseIcon;
