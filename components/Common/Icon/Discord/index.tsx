import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const DiscordIcon: React.FC<IconProps & { isMobile?: boolean }> = (props) => {
  const { size = 24, color = 'currentColor', isMobile = false } = props;

  if (isMobile)
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.317 4.15606C18.7873 3.45418 17.147 2.93706 15.4319 2.64089C15.4007 2.63517 15.3695 2.64946 15.3534 2.67803C15.1424 3.05324 14.9087 3.54274 14.7451 3.92749C12.9004 3.65132 11.0652 3.65132 9.25832 3.92749C9.09465 3.53419 8.85248 3.05324 8.64057 2.67803C8.62449 2.65041 8.59328 2.63613 8.56205 2.64089C6.84791 2.93612 5.20756 3.45323 3.67693 4.15606C3.66368 4.16177 3.65233 4.17131 3.64479 4.18368C0.533392 8.83204 -0.31895 13.3661 0.0991801 17.844C0.101072 17.8659 0.11337 17.8869 0.130398 17.9002C2.18321 19.4078 4.17171 20.323 6.12328 20.9296C6.15451 20.9391 6.18761 20.9277 6.20748 20.902C6.66913 20.2716 7.08064 19.6068 7.43348 18.9078C7.4543 18.8668 7.43442 18.8183 7.39186 18.8021C6.73913 18.5545 6.1176 18.2526 5.51973 17.9098C5.47244 17.8821 5.46865 17.8145 5.51216 17.7821C5.63797 17.6878 5.76382 17.5897 5.88396 17.4907C5.90569 17.4726 5.93598 17.4688 5.96153 17.4802C9.88928 19.2735 14.1415 19.2735 18.023 17.4802C18.0485 17.4678 18.0788 17.4717 18.1015 17.4898C18.2216 17.5888 18.3475 17.6878 18.4742 17.7821C18.5177 17.8145 18.5149 17.8821 18.4676 17.9098C17.8697 18.2592 17.2482 18.5545 16.5945 18.8011C16.552 18.8173 16.533 18.8668 16.5538 18.9078C16.9143 19.6058 17.3258 20.2706 17.7789 20.901C17.7978 20.9277 17.8319 20.9391 17.8631 20.9296C19.8241 20.323 21.8126 19.4078 23.8654 17.9002C23.8834 17.8869 23.8948 17.8669 23.8967 17.845C24.3971 12.6681 23.0585 8.17113 20.3482 4.18462C20.3416 4.17131 20.3303 4.16177 20.317 4.15606ZM8.02002 15.1175C6.8375 15.1175 5.86313 14.0318 5.86313 12.6985C5.86313 11.3653 6.8186 10.2796 8.02002 10.2796C9.23087 10.2796 10.1958 11.3748 10.1769 12.6985C10.1769 14.0318 9.22141 15.1175 8.02002 15.1175ZM15.9947 15.1175C14.8123 15.1175 13.8379 14.0318 13.8379 12.6985C13.8379 11.3653 14.7933 10.2796 15.9947 10.2796C17.2056 10.2796 18.1705 11.3748 18.1516 12.6985C18.1516 14.0318 17.2056 15.1175 15.9947 15.1175Z"
          fill={color}
        />
      </svg>
    );

  return (
    <svg
      width={'32'}
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.0894 6.39884C25.0498 5.463 22.8626 4.77351 20.5759 4.37861C20.5342 4.37099 20.4926 4.39003 20.4712 4.42813C20.1899 4.92841 19.8783 5.58108 19.6601 6.09407C17.2005 5.72585 14.7536 5.72585 12.3444 6.09407C12.1262 5.56968 11.8033 4.92841 11.5208 4.42813C11.4993 4.39131 11.4577 4.37226 11.4161 4.37861C9.13055 4.77225 6.94341 5.46173 4.90258 6.39884C4.88491 6.40645 4.86977 6.41916 4.85972 6.43566C0.711189 12.6335 -0.425267 18.679 0.13224 24.6495C0.134763 24.6787 0.15116 24.7066 0.173864 24.7244C2.91095 26.7344 5.56228 27.9547 8.16437 28.7635C8.20602 28.7763 8.25014 28.761 8.27664 28.7267C8.89217 27.8862 9.44086 26.9999 9.9113 26.0678C9.93906 26.0132 9.91256 25.9485 9.85582 25.9269C8.98551 25.5967 8.1568 25.1942 7.35964 24.7371C7.29659 24.7003 7.29154 24.6101 7.34954 24.5669C7.5173 24.4412 7.68509 24.3104 7.84527 24.1784C7.87425 24.1542 7.91464 24.1491 7.94871 24.1644C13.1857 26.5554 18.8554 26.5554 24.0306 24.1644C24.0647 24.1479 24.1051 24.153 24.1353 24.1771C24.2955 24.3091 24.4633 24.4412 24.6323 24.5669C24.6903 24.6101 24.6865 24.7003 24.6235 24.7371C23.8263 25.2031 22.9976 25.5967 22.126 25.9256C22.0693 25.9472 22.044 26.0132 22.0718 26.0678C22.5523 26.9985 23.101 27.8849 23.7052 28.7255C23.7304 28.761 23.7758 28.7763 23.8175 28.7635C26.4322 27.9547 29.0835 26.7344 31.8206 24.7244C31.8446 24.7066 31.8597 24.6799 31.8622 24.6507C32.5294 17.7482 30.7447 11.7523 27.131 6.43692C27.1221 6.41916 27.107 6.40645 27.0894 6.39884ZM10.6934 21.014C9.11666 21.014 7.81751 19.5665 7.81751 17.7888C7.81751 16.0111 9.09147 14.5636 10.6934 14.5636C12.3078 14.5636 13.5944 16.0238 13.5692 17.7888C13.5692 19.5665 12.2952 21.014 10.6934 21.014ZM21.3263 21.014C19.7497 21.014 18.4505 19.5665 18.4505 17.7888C18.4505 16.0111 19.7244 14.5636 21.3263 14.5636C22.9408 14.5636 24.2274 16.0238 24.2022 17.7888C24.2022 19.5665 22.9408 21.014 21.3263 21.014Z"
        fill={color}
      />
    </svg>
  );
};
export default DiscordIcon;
