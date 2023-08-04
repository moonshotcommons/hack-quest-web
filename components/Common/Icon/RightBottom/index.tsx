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

const RightBottomIcon: React.FC<IconProps> = (props) => {
  const { size = 24, width = 24, height = 24, color = 'currentColor' } = props;

  return (
    <svg
      width={width ?? size}
      height={height ?? size}
      viewBox={`0 0 ${width ?? size} ${height ?? size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.03589 3.53516L12.5212 12.0204" stroke={color} />
      <path d="M12.5203 4.94922V12.0203L5.4492 12.0203" stroke={color} />
    </svg>
  );
};
export default RightBottomIcon;
