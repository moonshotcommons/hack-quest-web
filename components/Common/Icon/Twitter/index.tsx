import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const TwitterIcon: React.FC<IconProps & { isMobile?: boolean }> = (props) => {
  const { size = 24, color = 'currentColor', isMobile = false } = props;

  if (isMobile)
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.3263 1.9043H21.6998L14.3297 10.3278L23 21.7903H16.2112L10.894 14.8383L4.80995 21.7903H1.43443L9.31743 12.7804L1 1.9043H7.96111L12.7674 8.25863L18.3263 1.9043ZM17.1423 19.7711H19.0116L6.94539 3.81743H4.93946L17.1423 19.7711Z"
          fill={color}
        />
      </svg>
    );

  return (
    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24.4347 3.39648H28.9327L19.106 14.6278L30.6663 29.9111H21.6147L14.5251 20.6419L6.41294 29.9111H1.91225L12.4229 17.8979L1.33301 3.39648H10.6145L17.0229 11.8689L24.4347 3.39648ZM22.8561 27.2189H25.3485L9.2602 5.94733H6.58562L22.8561 27.2189Z"
        fill={color}
      />
    </svg>
  );
};
export default TwitterIcon;
