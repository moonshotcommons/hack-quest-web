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

const BadgeIcon: React.FC<IconProps> = (props) => {
  const { size = 16, width, height, color = '#333' } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.8841 4.70991C4.06088 4.9574 4.03222 5.32523 3.82008 5.53147L1.28102 8L3.82008 10.4685C4.03222 10.6748 4.06088 11.0426 3.8841 11.2901C3.70732 11.5376 3.39204 11.571 3.1799 11.3648L0.179907 8.44813C0.0659113 8.3373 0 8.17312 0 8C0 7.82688 0.0659113 7.6627 0.179907 7.55187L3.1799 4.63522C3.39204 4.42897 3.70732 4.46241 3.8841 4.70991Z"
        fill="#0B0B0B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.1159 4.70991C12.2927 4.46241 12.608 4.42897 12.8201 4.63522L15.8201 7.55187C15.9341 7.6627 16 7.82688 16 8C16 8.17312 15.9341 8.3373 15.8201 8.44813L12.8201 11.3648C12.608 11.571 12.2927 11.5376 12.1159 11.2901C11.9391 11.0426 11.9678 10.6748 12.1799 10.4685L14.719 8L12.1799 5.53147C11.9678 5.32523 11.9391 4.9574 12.1159 4.70991Z"
        fill="#0B0B0B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6049 1.53276C10.9163 1.63499 11.077 1.94577 10.9637 2.22691L6.16398 14.1433C6.05074 14.4244 5.7065 14.5695 5.3951 14.4672C5.08369 14.365 4.92305 14.0542 5.03629 13.7731L9.83602 1.8567C9.94926 1.57556 10.2935 1.43053 10.6049 1.53276Z"
        fill="#0B0B0B"
      />
    </svg>
  );
};
export default BadgeIcon;
