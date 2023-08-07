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

const ThemeIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width = 24, height = 24, color = '#333' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_9573_20515)">
        <path
          d="M14.2509 19.35C12.8957 18.6591 11.7578 17.607 10.9632 16.3099C10.1685 15.0128 9.7479 13.5212 9.7479 12C9.7479 10.4788 10.1685 8.98725 10.9632 7.69014C11.7578 6.39303 12.8957 5.34089 14.2509 4.65C12.9932 4.00882 11.592 3.70111 10.1813 3.75631C8.7707 3.81151 7.39782 4.22776 6.19405 4.96526C4.99028 5.70275 3.99589 6.73681 3.30603 7.96849C2.61617 9.20017 2.25391 10.5883 2.25391 12C2.25391 13.4117 2.61617 14.7998 3.30603 16.0315C3.99589 17.2632 4.99028 18.2973 6.19405 19.0347C7.39782 19.7722 8.7707 20.1885 10.1813 20.2437C11.592 20.2989 12.9932 19.9912 14.2509 19.35Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.6369 12L15 9.21844L18.0553 9.975L20.0991 7.5L20.3494 10.7484L23.25 12L20.3494 13.2516L20.0991 16.5L18.0553 14.025L15 14.7816L16.6369 12Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_9573_20515">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
export default ThemeIcon;
