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

const DropDownIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width = 24, height = 24, color = '#333' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <svg
        width={width ?? size}
        height={height ?? size}
        viewBox={`0 0 ${width ?? size} ${height ?? size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.5879 1.25L6.29377 8.75L0.999656 1.25"
          stroke={color}
          strokeWidth="1.76471"
          strokeLinejoin="bevel"
        />
      </svg>
    </svg>
  );
};
export default DropDownIcon;
