import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const TwitterIcon: React.FC<IconProps> = (props) => {
  const { size = 24, color = 'currentColor' } = props;

  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.4347 3.39648H28.9327L19.106 14.6278L30.6663 29.9111H21.6147L14.5251 20.6419L6.41294 29.9111H1.91225L12.4229 17.8979L1.33301 3.39648H10.6145L17.0229 11.8689L24.4347 3.39648ZM22.8561 27.2189H25.3485L9.2602 5.94733H6.58562L22.8561 27.2189Z"
        fill={color}
      />
    </svg>
  );
};
export default TwitterIcon;
