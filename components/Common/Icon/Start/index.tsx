import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
  fill?: boolean;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const Start: React.FC<IconProps> = (props) => {
  const { size = 24, color = '#FFFFFF', fill = false } = props;

  if (fill) {
    return (
      <svg width="52" height="48" viewBox="0 0 52 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_10186_26660)">
          <path
            d="M9.49678 45.8029C10.1777 41.2226 10.9486 36.8414 11.4176 32.4281C11.5396 31.2847 11.0578 29.7493 10.2869 28.8949C7.59529 25.9078 4.60813 23.1904 1.85225 20.2611C1.2227 19.593 0.715201 18.3981 0.862952 17.5695C0.959312 17.017 2.2698 16.4517 3.11135 16.2975C6.95931 15.5909 10.8201 14.9099 14.7066 14.4667C16.8201 14.2226 18.1563 13.4774 19.03 11.441C20.3597 8.33819 21.9208 5.31892 23.5589 2.36389C24.1113 1.36817 25.1135 0.269669 26.1092 0.0191336C26.6424 -0.11577 27.8308 1.31678 28.3383 2.25468C30.0021 5.31892 31.5953 8.43455 33.0021 11.6273C33.8437 13.5352 35.1349 14.2161 37.1199 14.4538C41.0064 14.9099 44.8737 15.5459 48.7152 16.2718C49.6274 16.4453 50.9315 17.1005 51.1242 17.7943C51.3233 18.5202 50.5974 19.7408 49.9486 20.4346C47.334 23.2097 44.4689 25.7536 41.9572 28.6123C41.0707 29.6208 40.4475 31.3296 40.5632 32.6465C40.9165 36.6423 41.7644 40.593 42.2398 44.5823C42.3619 45.5973 42.0921 46.9785 41.4432 47.6401C41.0257 48.0641 39.4647 47.7172 38.6231 47.3061C35.1092 45.5844 31.743 43.5545 28.1713 41.9742C26.9507 41.4346 25.0878 41.4089 23.8737 41.9485C20.1092 43.6123 16.5375 45.7194 12.8437 47.5438C10.7045 48.5973 9.50963 47.8393 9.49678 45.8221V45.8029ZM6.36188 19.5994C9.18843 22.3553 11.4497 24.7001 13.8651 26.8778C15.4454 28.3039 15.9786 29.775 15.5225 31.9271C14.803 35.3189 14.4368 38.7814 13.8522 42.7129C17.4561 40.8435 20.5589 39.0384 23.8415 37.6444C25.0814 37.1176 26.925 37.1176 28.1649 37.6444C31.4218 39.032 34.5053 40.8371 38.1156 42.7193C37.4796 38.6144 36.7537 35.0877 36.4775 31.5288C36.3683 30.1605 36.8886 28.3874 37.7752 27.3725C40.0428 24.7772 42.6831 22.5031 45.651 19.638C41.1991 18.9056 37.5375 18.4624 33.9657 17.6337C32.7323 17.3446 31.3512 16.3232 30.6959 15.2375C29.0257 12.4881 27.728 9.51378 25.9871 6.03841C24.4068 9.16689 22.9615 11.608 21.9143 14.2033C20.9186 16.6701 19.2998 17.7622 16.7173 18.0256C13.5054 18.3532 10.3191 18.9827 6.3683 19.5994H6.36188Z"
            fill="currentColor"
          />
          <path
            d="M6.36188 19.5996C10.3126 18.9829 13.4925 18.3533 16.7109 18.0257C19.2998 17.7623 20.9186 16.6703 21.9079 14.2035C22.955 11.6017 24.4004 9.16705 25.9807 6.03857C27.7216 9.51395 29.0193 12.4883 30.6895 15.2377C31.3447 16.3234 32.7323 17.3448 33.9593 17.6339C37.531 18.4626 41.1927 18.9122 45.6445 19.6381C42.6767 22.5032 40.0428 24.7773 37.7687 27.3726C36.8822 28.3876 36.3619 30.1606 36.4711 31.5289C36.7537 35.0878 37.4797 38.6082 38.1092 42.7195C34.4989 40.8437 31.4218 39.0322 28.1585 37.6446C26.9186 37.1178 25.0749 37.1178 23.8351 37.6446C20.5525 39.0322 17.4497 40.8437 13.8458 42.7131C14.4368 38.7816 14.803 35.3191 15.5161 31.9272C15.9722 29.7816 15.439 28.3041 13.8587 26.878C11.4433 24.7002 9.17559 22.3555 6.35546 19.5996H6.36188Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_10186_26660">
            <rect width="50.3255" height="48" fill="white" transform="translate(0.837257)" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  return (
    <svg width="51" height="48" viewBox="0 0 51 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_10186_26663)">
        <path
          d="M8.82226 45.8029C9.5032 41.2226 10.2741 36.8414 10.743 32.4281C10.8651 31.2847 10.3833 29.7493 9.61241 28.8949C6.92076 25.9078 3.93361 23.1904 1.17772 20.2611C0.548173 19.593 0.0406785 18.3981 0.18843 17.5695C0.28479 17.017 1.59528 16.4517 2.43682 16.2975C6.28479 15.5909 10.1456 14.9099 14.0321 14.4667C16.1456 14.2226 17.4818 13.4774 18.3555 11.441C19.6852 8.33819 21.2462 5.31892 22.8844 2.36389C23.4368 1.36817 24.439 0.269669 25.4347 0.0191336C25.9679 -0.11577 27.1563 1.31678 27.6638 2.25468C29.3276 5.31892 30.9208 8.43455 32.3276 11.6273C33.1692 13.5352 34.4604 14.2161 36.4454 14.4538C40.3319 14.9099 44.1991 15.5459 48.0407 16.2718C48.9529 16.4453 50.2569 17.1005 50.4497 17.7943C50.6488 18.5202 49.9229 19.7408 49.2741 20.4346C46.6595 23.2097 43.7944 25.7536 41.2826 28.6123C40.3961 29.6208 39.773 31.3296 39.8886 32.6465C40.242 36.6423 41.0899 40.593 41.5653 44.5823C41.6874 45.5973 41.4175 46.9785 40.7687 47.6401C40.3512 48.0641 38.7901 47.7172 37.9486 47.3061C34.4347 45.5844 31.0685 43.5545 27.4968 41.9742C26.2762 41.4346 24.4133 41.4089 23.1991 41.9485C19.4347 43.6123 15.8629 45.7194 12.1692 47.5438C10.03 48.5973 8.83511 47.8393 8.82226 45.8221V45.8029ZM5.68736 19.5994C8.51391 22.3553 10.7752 24.7001 13.1906 26.8778C14.7709 28.3039 15.3041 29.775 14.848 31.9271C14.1285 35.3189 13.7623 38.7814 13.1777 42.7129C16.7816 40.8435 19.8844 39.0384 23.167 37.6444C24.4068 37.1176 26.2505 37.1176 27.4904 37.6444C30.7473 39.032 33.8308 40.8371 37.4411 42.7193C36.8051 38.6144 36.0792 35.0877 35.803 31.5288C35.6938 30.1605 36.2141 28.3874 37.1006 27.3725C39.3683 24.7772 42.0086 22.5031 44.9764 19.638C40.5246 18.9056 36.8629 18.4624 33.2912 17.6337C32.0578 17.3446 30.6766 16.3232 30.0214 15.2375C28.3512 12.4881 27.0535 9.51378 25.3126 6.03841C23.7323 9.16689 22.2869 11.608 21.2398 14.2033C20.2441 16.6701 18.6253 17.7622 16.0428 18.0256C12.8308 18.3532 9.64453 18.9827 5.69378 19.5994H5.68736Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_10186_26663">
          <rect width="50.3255" height="48" fill="white" transform="translate(0.162735)" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default Start;