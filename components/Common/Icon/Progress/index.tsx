import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const ProgressIcon: React.FC<IconProps> = (props) => {
  const { size = 24, color = 'currentColor' } = props;

  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.5287 6.82826L16.9374 5.27026C17.5284 5.12659 17.9277 5.85856 17.4871 6.27776L12.8109 10.7262C12.7251 10.8079 12.6656 10.9133 12.6402 11.029L11.3676 16.8186C11.2267 17.4595 10.3038 17.4323 10.2008 16.7842L9.23218 10.6867C9.20918 10.5419 9.13346 10.4107 9.01958 10.3184L4.01681 6.26343C3.51572 5.85727 3.93024 5.05587 4.55128 5.23013L10.2279 6.82298C10.3261 6.85052 10.4297 6.85234 10.5287 6.82826Z"
        fill={color}
      />
      <path
        d="M6.908 11.6474C6.97335 11.6969 7.0153 11.7713 7.02392 11.8528L7.4785 16.1507C7.51224 16.4697 7.08635 16.6082 6.92597 16.3305L2.86686 9.29987C2.70486 9.01927 3.04527 8.71898 3.30347 8.91472L6.908 11.6474Z"
        fill={color}
      />
    </svg>
  );
};
export default ProgressIcon;
