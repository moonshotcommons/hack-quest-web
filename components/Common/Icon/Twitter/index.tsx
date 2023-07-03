import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const TwitterIcon: React.FC<IconProps> = (props) => {
  const { size = 24, color = '#333' } = props;

  return (
    <svg
      width="32"
      height="26"
      viewBox="0 0 32 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 3.07804C30.8227 3.60059 29.5573 3.95252 28.2293 4.11116C29.5853 3.29932 30.6267 2.01292 31.116 0.479902C29.848 1.23175 28.4427 1.7783 26.9467 2.07291C25.7507 0.79717 24.0427 0 22.1547 0C17.916 0 14.8013 3.95386 15.7587 8.05835C10.304 7.78507 5.46667 5.17227 2.228 1.20109C0.508 4.15115 1.336 8.01036 4.25867 9.96462C3.184 9.92996 2.17067 9.63536 1.28667 9.14346C1.21467 12.1842 3.39467 15.0289 6.552 15.6621C5.628 15.9127 4.616 15.9714 3.58667 15.7741C4.42133 18.3816 6.84533 20.2785 9.72 20.3318C6.96 22.4954 3.48267 23.4619 0 23.0513C2.90533 24.9136 6.35733 26 10.064 26C22.2533 26 29.14 15.7074 28.724 6.476C30.0067 5.54953 31.12 4.39377 32 3.07804V3.07804Z"
        fill="white"
      />
    </svg>
  );
};
export default TwitterIcon;
