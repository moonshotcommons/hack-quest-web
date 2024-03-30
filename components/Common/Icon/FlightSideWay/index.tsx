import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const FlightSideWayIcon: React.FC<IconProps> = (props) => {
  const { size = 20, color = '#000000' } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.0286 6.82844L16.4373 5.27045C17.0282 5.12678 17.4276 5.85874 16.987 6.27794L12.3108 10.7264C12.225 10.808 12.1655 10.9135 12.1401 11.0292L10.8674 16.8188C10.7266 17.4596 9.80366 17.4325 9.70071 16.7844L8.73206 10.6868C8.70906 10.5421 8.63333 10.4109 8.51945 10.3186L3.51669 6.26361C3.0156 5.85745 3.43012 5.05605 4.05116 5.23031L9.7278 6.82317C9.82595 6.85071 9.92953 6.85252 10.0286 6.82844Z"
        fill={color}
      />
      <path
        d="M6.40788 11.6469C6.47322 11.6965 6.51518 11.7708 6.5238 11.8523L6.97838 16.1503C7.01211 16.4693 6.58623 16.6078 6.42585 16.33L2.36674 9.29942C2.20473 9.01882 2.54515 8.71853 2.80334 8.91427L6.40788 11.6469Z"
        fill={color}
      />
    </svg>
  );
};
export default FlightSideWayIcon;
