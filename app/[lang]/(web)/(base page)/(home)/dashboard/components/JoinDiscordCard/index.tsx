import Button from '@/components/Common/Button';
import { HACKQUEST_DISCORD } from '@/constants/links';
import Link from 'next/link';
import { FC } from 'react';

interface JoinDiscordCardProps {}

const icon = (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M30.3278 60.4916C14.6835 59.6588 2.67632 46.3014 3.50914 30.657M33.3438 3.8383C48.9881 4.67112 60.9953 18.0285 60.1625 33.6729"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="6 6"
    />
    <path
      d="M31.837 56.6844C45.3788 56.6844 56.3566 45.7066 56.3566 32.1648C56.3566 18.623 45.3788 7.64514 31.837 7.64514C18.2952 7.64514 7.31738 18.623 7.31738 32.1648C7.31738 45.7066 18.2952 56.6844 31.837 56.6844Z"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5695 12.2255L29.2054 21.4539L26.7685 28.7824L34.0822 37.4827L32.7516 48.1951H28.099L25.8244 41.5482L17.5695 41.7694L7.31738 34.8481"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M49.9454 15.6377L41.8381 20.4968V28.7811L37.1855 31.1325V34.8469H46.0481L55.2382 39.5083"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.53017 3.21734C6.03706 5.48609 5.04282 10.1534 7.31158 13.6465C10.8637 19.1192 19.2572 20.5885 21.0568 20.972C21.0568 20.972 23.5144 10.9087 19.9593 5.43593C17.6935 1.94282 13.0233 0.948586 9.53017 3.21734ZM15.8408 12.9355C13.9644 14.154 11.4596 13.62 10.2412 11.7436C9.02273 9.86723 9.55672 7.36245 11.4331 6.144C13.3095 4.92554 15.8142 5.45954 17.0327 7.3359C18.2511 9.21227 17.7172 11.717 15.8408 12.9355Z"
      fill="#FFE866"
      stroke="black"
      strokeMiterlimit="10"
    />
    <path
      d="M55.8731 10.4162C51.8578 9.31279 47.7068 11.67 46.6034 15.6854C44.8716 21.9753 49.3501 29.2241 50.2587 30.8261C50.2587 30.8261 59.4134 25.9759 61.1423 19.6859C62.2456 15.6706 59.8884 11.5196 55.8731 10.4162ZM52.7989 21.5888C50.6423 20.9958 49.3766 18.7684 49.9696 16.6117C50.5626 14.4551 52.7901 13.1894 54.9467 13.7824C57.1033 14.3754 58.369 16.6029 57.776 18.7595C57.183 20.9162 54.9556 22.1818 52.7989 21.5888Z"
      fill="#EDEDED"
      stroke="black"
      strokeMiterlimit="10"
    />
    <path
      d="M34.1947 21.0785C30.1145 20.2436 26.1317 22.8752 25.2968 26.9554C23.9898 33.3486 28.9403 40.2818 29.9552 41.8159C29.9552 41.8159 38.7647 36.3668 40.0717 29.9735C40.9066 25.8933 38.275 21.9105 34.1947 21.0755V21.0785ZM31.8758 32.4311C29.6867 31.9827 28.2736 29.8467 28.722 27.6546C29.1704 25.4626 31.3064 24.0524 33.4985 24.5008C35.6905 24.9492 37.1007 27.0852 36.6523 29.2773C36.2039 31.4664 34.0679 32.8795 31.8758 32.4311Z"
      fill="white"
      stroke="black"
      strokeMiterlimit="10"
    />
  </svg>
);

const JoinDiscordCard: FC<JoinDiscordCardProps> = (props) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-[1rem] bg-neutral-white p-4">
      {icon}
      <p className="body-m-bold">Want to learn together with our community?</p>
      <Link href={HACKQUEST_DISCORD} target="_blank">
        <Button type="primary" className="button-text-s px-4 py-2 uppercase">
          Join discord
        </Button>
      </Link>
    </div>
  );
};

export default JoinDiscordCard;
