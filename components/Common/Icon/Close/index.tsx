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
  const { size = 24, width, height, color = 'currentColor' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_11_7201)">
        <path
          d="M15.625 4.375L4.375 15.625"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.625 15.625L4.375 4.375"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_11_7201">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default CloseIcon;
