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

const EyeIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width, height, color = '#333' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_11_7205)">
        <path
          d="M10.001 4.37451C3.75098 4.37451 1.25098 9.99951 1.25098 9.99951C1.25098 9.99951 3.75098 15.6245 10.001 15.6245C16.251 15.6245 18.751 9.99951 18.751 9.99951C18.751 9.99951 16.251 4.37451 10.001 4.37451Z"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 13.1245C11.7259 13.1245 13.125 11.7254 13.125 9.99951C13.125 8.27362 11.7259 6.87451 10 6.87451C8.27411 6.87451 6.875 8.27362 6.875 9.99951C6.875 11.7254 8.27411 13.1245 10 13.1245Z"
          stroke={color}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_11_7205">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default EyeIcon;
