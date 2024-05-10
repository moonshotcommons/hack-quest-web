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

const NotificationIcon: React.FC<IconProps> = (props) => {
  const { size = 28, color = '#8C8C8C' } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d="M25.9201 20.668H24.6668V11.3346C24.6668 5.4436 19.8912 0.667969 14.0001 0.667969C8.10911 0.667969 3.33348 5.4436 3.33348 11.3346V20.668H2.14681C1.41043 20.668 0.813477 21.2649 0.813477 22.0013C0.813477 22.7377 1.41043 23.3346 2.14681 23.3346H25.9201C26.6565 23.3346 27.2535 22.7377 27.2535 22.0013C27.2535 21.2649 26.6565 20.668 25.9201 20.668Z"
        fill={color}
      />
      <path
        d="M14.0002 27.3346C15.6912 27.3299 17.1966 26.2623 17.7602 24.668H10.2402C10.8039 26.2623 12.3092 27.3299 14.0002 27.3346Z"
        fill={color}
      />
    </svg>
  );
};
export default NotificationIcon;
