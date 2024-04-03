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

const CopyIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width = 24, height = 24, color = '#E3E3E3' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.200002 18.0002V18V5C0.200002 4.76714 0.27671 4.58114 0.429423 4.42842C0.582112 4.27573 0.767634 4.19945 0.99953 4.2H1C1.23286 4.2 1.41887 4.27671 1.57158 4.42942C1.72427 4.58211 1.80055 4.76763 1.8 4.99953V5V18V18.2H2H12C12.2329 18.2 12.4189 18.2767 12.5716 18.4294C12.7243 18.5821 12.8005 18.7676 12.8 18.9995V19C12.8 19.2329 12.7233 19.4189 12.5706 19.5716C12.4179 19.7243 12.2324 19.8005 12.0005 19.8H12H2C1.50352 19.8 1.08325 19.6254 0.728423 19.2706C0.373602 18.9158 0.1994 18.4959 0.200002 18.0002ZM4.2 14.0002V14V2C4.2 1.50352 4.37459 1.08325 4.72942 0.728423C5.08424 0.373602 5.5041 0.1994 5.99976 0.200002H6H15C15.4965 0.200002 15.9167 0.374595 16.2716 0.729423C16.6264 1.08424 16.8006 1.5041 16.8 1.99976V2V14C16.8 14.4965 16.6254 14.9167 16.2706 15.2716C15.9158 15.6264 15.4959 15.8006 15.0002 15.8H15H6C5.50352 15.8 5.08325 15.6254 4.72842 15.2706C4.3736 14.9158 4.1994 14.4959 4.2 14.0002ZM5.8 14V14.2H6H15H15.2V14V2V1.8H15H6H5.8V2V14Z"
        fill={color}
        stroke={color}
        strokeWidth="0.4"
      />
    </svg>
  );
};
export default CopyIcon;
