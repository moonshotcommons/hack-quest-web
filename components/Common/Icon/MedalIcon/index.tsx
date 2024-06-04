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

const MedalIcon: React.FC<IconProps> = (props) => {
  const { size = 16, color = '#3E3E3E' } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M8.00016 10C10.5775 10 12.6668 7.91068 12.6668 5.33335C12.6668 2.75602 10.5775 0.666687 8.00016 0.666687C5.42283 0.666687 3.3335 2.75602 3.3335 5.33335C3.3335 7.91068 5.42283 10 8.00016 10Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.47317 9.26002L4.6665 15.3334L7.99984 13.3334L11.3332 15.3334L10.5265 9.25336"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default MedalIcon;
