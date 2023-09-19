import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const CourseIcon: React.FC<IconProps> = (props) => {
  const { size = 15, color = 'currentColor' } = props;

  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.57871 12.8638V2.04656C7.19864 0.856661 4.21415 0.919762 2.76941 1.10005V11.8186C6.08183 11.2105 7.35578 12.2621 7.57871 12.8638Z"
          stroke={color}
          strokeWidth="0.6"
        />
        <path
          d="M7.57779 12.8638V2.04656C7.95785 0.856661 10.9423 0.919762 12.3871 1.10005V11.8186C9.07466 11.2105 7.80071 12.2621 7.57779 12.8638Z"
          stroke={color}
          strokeWidth="0.6"
        />
        <path
          d="M2.75602 2.42993H1V13.6858L14.0904 14V2.42993H12.3343"
          stroke={color}
          strokeWidth="0.6"
        />
        <path d="M7.56689 13.8969V12.6799" stroke={color} strokeWidth="0.6" />
      </svg>
    </>
  );
};
export default CourseIcon;
