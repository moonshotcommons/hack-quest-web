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

const WarningIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width = 24, height = 24, color = 'currentColor' } = props;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.5 15.5C12.366 15.5 15.5 12.366 15.5 8.5C15.5 4.63401 12.366 1.5 8.5 1.5C4.63401 1.5 1.5 4.63401 1.5 8.5C1.5 12.366 4.63401 15.5 8.5 15.5Z"
        fill={color}
        stroke={color}
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.91699 7.91602C8.0717 7.91602 8.22007 7.97747 8.32947 8.08687C8.43887 8.19627 8.50033 8.34464 8.50033 8.49935V11.416C8.50033 11.5707 8.56178 11.7191 8.67118 11.8285C8.78058 11.9379 8.92895 11.9993 9.08366 11.9993"
        fill="white"
      />
      <path
        d="M7.91699 7.91602C8.0717 7.91602 8.22007 7.97747 8.32947 8.08687C8.43887 8.19627 8.50033 8.34464 8.50033 8.49935V11.416C8.50033 11.5707 8.56178 11.7191 8.67118 11.8285C8.78058 11.9379 8.92895 11.9993 9.08366 11.9993"
        stroke="white"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.20801 6.16602C8.69126 6.16602 9.08301 5.77426 9.08301 5.29102C9.08301 4.80777 8.69126 4.41602 8.20801 4.41602C7.72476 4.41602 7.33301 4.80777 7.33301 5.29102C7.33301 5.77426 7.72476 6.16602 8.20801 6.16602Z"
        fill="white"
      />
    </svg>
  );
};
export default WarningIcon;
