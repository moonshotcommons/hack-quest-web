import { TitleTxt } from './type';

export const titleTxtData = [
  TitleTxt.OVERVIEW,
  TitleTxt.TIME_LINE,
  TitleTxt.YOUR_FUELING_BOARD,
  TitleTxt.ABOUT,
  TitleTxt.DEMO_VIDEO,
  TitleTxt.KEY_METRICS,
  TitleTxt.TRACTIONS
];

export const linksIcon = {
  hack: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <g clipPath="url(#clip0_0_28832)">
        <path
          d="M20.4318 4.01551C18.2729 1.84303 15.293 0.5 11.9992 0.5L0.556048 1.05996L0.0742188 12.5C0.0742188 15.8145 1.40885 18.8131 3.56776 20.9856C5.72666 23.1581 8.70654 24.5011 12.0003 24.5011L23.3689 24.0162L23.9253 12.5011C23.9253 9.18661 22.5907 6.18799 20.4318 4.01551ZM12.076 19.478C10.1828 19.478 8.46836 18.7038 7.22812 17.4557C5.98788 16.2077 5.21849 14.4825 5.21849 12.5773C5.21849 8.76691 8.28837 5.67773 12.076 5.67662C13.9693 5.67662 15.6837 6.45085 16.924 7.69889C18.1642 8.94694 18.9336 10.6721 18.9336 12.5773C18.9325 16.3888 15.8615 19.478 12.076 19.478Z"
          fill="#8C8C8C"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_28832">
          <rect
            width="23.85"
            height="24"
            fill="white"
            transform="translate(0.0742188 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  file: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M8.40039 18.5H16.4004V16.5H8.40039V18.5ZM8.40039 14.5H16.4004V12.5H8.40039V14.5ZM6.40039 22.5C5.85039 22.5 5.37956 22.3042 4.98789 21.9125C4.59622 21.5208 4.40039 21.05 4.40039 20.5V4.5C4.40039 3.95 4.59622 3.47917 4.98789 3.0875C5.37956 2.69583 5.85039 2.5 6.40039 2.5H14.4004L20.4004 8.5V20.5C20.4004 21.05 20.2046 21.5208 19.8129 21.9125C19.4212 22.3042 18.9504 22.5 18.4004 22.5H6.40039ZM13.4004 9.5V4.5H6.40039V20.5H18.4004V9.5H13.4004Z"
        fill="#8C8C8C"
      />
    </svg>
  ),
  discord: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <g clipPath="url(#clip0_0_28838)">
        <path
          d="M21.1178 4.65606C19.5881 3.95418 17.9478 3.43706 16.2327 3.14089C16.2014 3.13517 16.1702 3.14946 16.1542 3.17803C15.9432 3.55324 15.7095 4.04274 15.5459 4.42749C13.7012 4.15132 11.866 4.15132 10.0591 4.42749C9.89543 4.03419 9.65327 3.55324 9.44136 3.17803C9.42527 3.15041 9.39406 3.13613 9.36283 3.14089C7.64869 3.43612 6.00834 3.95323 4.47772 4.65606C4.46447 4.66177 4.45311 4.67131 4.44557 4.68368C1.33417 9.33204 0.481831 13.8661 0.899961 18.344C0.901853 18.3659 0.914151 18.3869 0.931179 18.4002C2.98399 19.9078 4.97249 20.823 6.92406 21.4296C6.95529 21.4391 6.98839 21.4277 7.00826 21.402C7.46991 20.7716 7.88142 20.1068 8.23426 19.4078C8.25508 19.3668 8.2352 19.3183 8.19265 19.3021C7.53991 19.0545 6.91838 18.7526 6.32051 18.4098C6.27322 18.3821 6.26943 18.3145 6.31294 18.2821C6.43875 18.1878 6.5646 18.0897 6.68474 17.9907C6.70647 17.9726 6.73676 17.9688 6.76231 17.9802C10.6901 19.7735 14.9423 19.7735 18.8237 17.9802C18.8493 17.9678 18.8796 17.9717 18.9023 17.9898C19.0224 18.0888 19.1482 18.1878 19.275 18.2821C19.3185 18.3145 19.3157 18.3821 19.2684 18.4098C18.6705 18.7592 18.049 19.0545 17.3953 19.3011C17.3527 19.3173 17.3338 19.3668 17.3546 19.4078C17.715 20.1058 18.1266 20.7706 18.5797 21.401C18.5986 21.4277 18.6326 21.4391 18.6639 21.4296C20.6249 20.823 22.6134 19.9078 24.6662 18.4002C24.6842 18.3869 24.6956 18.3669 24.6974 18.345C25.1979 13.1681 23.8593 8.67113 21.149 4.68462C21.1424 4.67131 21.131 4.66177 21.1178 4.65606ZM8.8208 15.6175C7.63828 15.6175 6.66391 14.5318 6.66391 13.1985C6.66391 11.8653 7.61938 10.7796 8.8208 10.7796C10.0317 10.7796 10.9966 11.8748 10.9777 13.1985C10.9777 14.5318 10.0222 15.6175 8.8208 15.6175ZM16.7955 15.6175C15.613 15.6175 14.6387 14.5318 14.6387 13.1985C14.6387 11.8653 15.5941 10.7796 16.7955 10.7796C18.0064 10.7796 18.9713 11.8748 18.9524 13.1985C18.9524 14.5318 18.0064 15.6175 16.7955 15.6175Z"
          fill="#8C8C8C"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_28838">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.800781 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  twitter: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M18.5255 2.4043H21.899L14.5289 10.8278L23.1992 22.2903H16.4105L11.0933 15.3383L5.00917 22.2903H1.63365L9.51665 13.2804L1.19922 2.4043H8.16033L12.9666 8.75863L18.5255 2.4043ZM17.3415 20.2711H19.2108L7.14461 4.31743H5.13868L17.3415 20.2711Z"
        fill="#8C8C8C"
      />
    </svg>
  ),
  telegram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <g clipPath="url(#clip0_0_28842)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.5996 12.5C24.5996 19.1274 19.227 24.5 12.5996 24.5C5.97219 24.5 0.599609 19.1274 0.599609 12.5C0.599609 5.87258 5.97219 0.5 12.5996 0.5C19.227 0.5 24.5996 5.87258 24.5996 12.5ZM13.0296 9.35893C11.8625 9.8444 9.52975 10.8492 6.0315 12.3733C5.46344 12.5992 5.16587 12.8202 5.13878 13.0363C5.093 13.4015 5.55032 13.5453 6.17308 13.7411C6.25779 13.7678 6.34556 13.7954 6.43555 13.8246C7.04825 14.0238 7.87244 14.2568 8.3009 14.266C8.68955 14.2744 9.12334 14.1142 9.60225 13.7853C12.8708 11.579 14.558 10.4638 14.6639 10.4398C14.7387 10.4228 14.8422 10.4015 14.9124 10.4638C14.9825 10.5262 14.9756 10.6443 14.9682 10.676C14.9229 10.8691 13.1277 12.5381 12.1987 13.4018C11.9091 13.671 11.7037 13.862 11.6617 13.9056C11.5676 14.0033 11.4717 14.0958 11.3796 14.1846C10.8104 14.7333 10.3835 15.1448 11.4032 15.8168C11.8933 16.1397 12.2854 16.4067 12.6766 16.6731C13.1038 16.9641 13.5299 17.2543 14.0812 17.6157C14.2217 17.7077 14.3558 17.8034 14.4865 17.8965C14.9837 18.251 15.4304 18.5694 15.9822 18.5186C16.3029 18.4891 16.6341 18.1876 16.8023 17.2884C17.1998 15.1631 17.9812 10.5585 18.1618 8.66097C18.1777 8.49473 18.1577 8.28197 18.1418 8.18857C18.1258 8.09518 18.0924 7.96211 17.971 7.8636C17.8272 7.74694 17.6052 7.72234 17.506 7.72408C17.0546 7.73203 16.3622 7.97282 13.0296 9.35893Z"
          fill="#8C8C8C"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_28842">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.599609 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  email: (
    <svg
      width="20"
      height="17"
      viewBox="0 0 20 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group">
        <g id="Layer_29">
          <path
            id="Path"
            d="M9.99953 7.37L19.4595 1.82C18.9067 1.00202 17.9868 0.508409 16.9995 0.5H2.99953C2.00707 0.499567 1.07862 0.989997 0.519531 1.81L9.99953 7.37Z"
            fill="#8C8C8C"
          />
          <path
            id="Path_2"
            d="M11 9.09008C10.6962 9.26633 10.3513 9.35946 10 9.36008C9.64965 9.3625 9.30481 9.27284 9 9.10008L0 3.83008V13.5001C0 15.1569 1.34315 16.5001 3 16.5001H17C18.6569 16.5001 20 15.1569 20 13.5001V3.83008L11 9.09008Z"
            fill="#8C8C8C"
          />
        </g>
      </g>
    </svg>
  )
};