import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  width?: number | string;
  height?: number | string;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const errorIcon: React.FC<IconProps> = (props) => {
  const { size = 24 } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#FF624C" />
      <path
        d="M18.473 17.5271C18.5992 17.6523 18.6702 17.8227 18.6702 18.0005C18.6702 18.1782 18.5992 18.3486 18.473 18.4738C18.3478 18.6 18.1774 18.671 17.9996 18.671C17.8219 18.671 17.6515 18.6 17.5263 18.4738L11.9996 12.9405L6.47297 18.4738C6.34779 18.6 6.17739 18.671 5.99963 18.671C5.82188 18.671 5.65148 18.6 5.5263 18.4738C5.40009 18.3486 5.3291 18.1782 5.3291 18.0005C5.3291 17.8227 5.40009 17.6523 5.5263 17.5271L11.0596 12.0005L5.5263 6.4738C5.35719 6.30469 5.29115 6.05822 5.35305 5.82721C5.41495 5.59621 5.59538 5.41578 5.82638 5.35388C6.05738 5.29198 6.30386 5.35803 6.47297 5.52713L11.9996 11.0605L17.5263 5.52713C17.7877 5.26572 18.2116 5.26572 18.473 5.52713C18.7344 5.78855 18.7344 6.21238 18.473 6.4738L12.9396 12.0005L18.473 17.5271Z"
        fill="white"
      />
    </svg>
  );
};
export default errorIcon;
