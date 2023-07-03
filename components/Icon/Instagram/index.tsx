import React from 'react';

interface BaseIconProps {
  size?: number | string;
  color?: string;
  hoverColor?: string;
  children?: React.ReactNode;
}

type IconProps = BaseIconProps & React.HTMLAttributes<unknown>;

const InstagramIcon: React.FC<IconProps> = (props) => {
  const { size = 24, color = '#333' } = props;

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.8125 8.19937C27.7471 6.71754 27.5075 5.69879 27.1642 4.81603C26.8101 3.879 26.2653 3.04008 25.5515 2.34268C24.8541 1.63443 24.0097 1.08408 23.0835 0.735492C22.1956 0.39222 21.1822 0.152589 19.7004 0.0872545C18.2075 0.0163868 17.7335 0 13.9471 0C10.1607 0 9.68674 0.0163868 8.19937 0.0817213C6.71753 0.147056 5.69878 0.386899 4.81623 0.729959C3.87899 1.08408 3.04007 1.62889 2.34268 2.34268C1.63443 3.04008 1.0843 3.88453 0.735491 4.81071C0.39222 5.69879 0.152589 6.712 0.0872544 8.19384C0.0163868 9.68674 0 10.1607 0 13.9471C0 17.7335 0.0163868 18.2075 0.0817213 19.6948C0.147056 21.1767 0.386899 22.1954 0.730171 23.0782C1.0843 24.0152 1.63443 24.8541 2.34268 25.5515C3.04007 26.2598 3.88453 26.8101 4.8107 27.1587C5.69878 27.502 6.712 27.7416 8.19405 27.807C9.6812 27.8725 10.1554 27.8887 13.9418 27.8887C17.7282 27.8887 18.2021 27.8725 19.6895 27.807C21.1713 27.7416 22.1901 27.502 23.0726 27.1587C24.9469 26.4341 26.4287 24.9522 27.1534 23.0782C27.4964 22.1901 27.7363 21.1767 27.8016 19.6948C27.8669 18.2075 27.8833 17.7335 27.8833 13.9471C27.8833 10.1607 27.8778 9.68674 27.8125 8.19937ZM25.301 19.5859C25.241 20.9479 25.0122 21.6834 24.8216 22.1737C24.3529 23.3887 23.3887 24.353 22.1737 24.8216C21.6834 25.0123 20.9426 25.241 19.5859 25.3008C18.1149 25.3664 17.6737 25.3826 13.9526 25.3826C10.2315 25.3826 9.78484 25.3664 8.31918 25.3008C6.95716 25.241 6.22167 25.0123 5.73134 24.8216C5.12673 24.5981 4.57639 24.244 4.12969 23.7809C3.6666 23.3287 3.31248 22.7839 3.08902 22.1793C2.89834 21.6889 2.66956 20.9479 2.60976 19.5914C2.54421 18.1204 2.52804 17.679 2.52804 13.958C2.52804 10.2369 2.54421 9.79017 2.60976 8.32472C2.66956 6.9627 2.89834 6.22721 3.08902 5.73688C3.31248 5.13206 3.6666 4.58193 4.13522 4.13501C4.58724 3.67193 5.13205 3.3178 5.73687 3.09456C6.2272 2.90387 6.96823 2.6751 8.32471 2.61508C9.7957 2.54975 10.2371 2.53336 13.9579 2.53336C17.6846 2.53336 18.1257 2.54975 19.5914 2.61508C20.9534 2.6751 21.6889 2.90387 22.1792 3.09456C22.7838 3.3178 23.3342 3.67193 23.7809 4.13501C24.244 4.58725 24.5981 5.13206 24.8216 5.73688C25.0122 6.22721 25.241 6.96802 25.301 8.32472C25.3664 9.79571 25.3828 10.2369 25.3828 13.958C25.3828 17.679 25.3664 18.1149 25.301 19.5859Z"
        fill="white"
      />
      <path
        d="M25.301 19.5859C25.241 20.9479 25.0122 21.6834 24.8216 22.1737C24.3529 23.3887 23.3887 24.353 22.1737 24.8216C21.6834 25.0123 20.9426 25.241 19.5859 25.3008C18.1149 25.3664 17.6737 25.3826 13.9526 25.3826C10.2315 25.3826 9.78484 25.3664 8.31918 25.3008C6.95716 25.241 6.22167 25.0123 5.73134 24.8216C5.12673 24.5981 4.57639 24.244 4.12969 23.7809C3.6666 23.3287 3.31248 22.7839 3.08902 22.1793C2.89834 21.6889 2.66956 20.9479 2.60976 19.5914C2.54421 18.1204 2.52804 17.679 2.52804 13.958C2.52804 10.2369 2.54421 9.79017 2.60976 8.32472C2.66956 6.9627 2.89834 6.22721 3.08902 5.73688C3.31248 5.13206 3.6666 4.58193 4.13522 4.13501C4.58724 3.67193 5.13205 3.3178 5.73687 3.09456C6.2272 2.90387 6.96823 2.6751 8.32471 2.61508C9.7957 2.54975 10.2371 2.53336 13.9579 2.53336C17.6846 2.53336 18.1257 2.54975 19.5914 2.61508C20.9534 2.6751 21.6889 2.90387 22.1792 3.09456C22.7838 3.3178 23.3342 3.67193 23.7809 4.13501C24.244 4.58725 24.5981 5.13206 24.8216 5.73688C25.0122 6.22721 25.241 6.96802 25.301 8.32472C25.3664 9.79571 25.3828 10.2369 25.3828 13.958C25.3828 17.679 25.3664 18.1149 25.301 19.5859Z"
        fill="white"
      />
      <path
        d="M13.9511 6.78357C9.99592 6.78357 6.78687 9.99241 6.78687 13.9478C6.78687 17.9032 9.99592 21.112 13.9511 21.112C17.9065 21.112 21.1153 17.9032 21.1153 13.9478C21.1153 9.99241 17.9065 6.78357 13.9511 6.78357ZM13.9511 18.5951C11.3852 18.5951 9.30384 16.5139 9.30384 13.9478C9.30384 11.3817 11.3852 9.30054 13.9511 9.30054C16.5172 9.30054 18.5984 11.3817 18.5984 13.9478C18.5984 16.5139 16.5172 18.5951 13.9511 18.5951V18.5951Z"
        fill="black"
      />
      <path
        d="M23.0663 6.5001C23.0663 7.42372 22.3174 8.17263 21.3935 8.17263C20.4699 8.17263 19.721 7.42372 19.721 6.5001C19.721 5.57626 20.4699 4.82758 21.3935 4.82758C22.3174 4.82758 23.0663 5.57626 23.0663 6.5001V6.5001Z"
        fill="black"
      />
    </svg>
  );
};
export default InstagramIcon;
