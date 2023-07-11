import Link from 'next/link';
import { FC, ReactNode } from 'react';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import DiscordIcon from '@/components/Common/Icon/Discord';
import InstagramIcon from '@/components/Common/Icon/Instagram';
import { cn } from '@/helper/utils';
interface ContractUsProps {
  // children: ReactNode;
  className?: string;
}

const ContractUs: FC<ContractUsProps> = (props) => {
  const { className } = props;
  return (
    <ul
      className={cn(
        `
    flex gap-[1.25rem]
    `,
        className
      )}
    >
      <Link
        href={'https://twitter.com/_hackquest'}
        className="hover:scale-[1.1] cursor-pointer"
      >
        <TwitterIcon />
      </Link>
      <Link
        href={'https://discord.gg/KkAJHPqywn'}
        className="hover:scale-[1.1] cursor-pointer"
      >
        <DiscordIcon />
      </Link>
      <Link
        href={'https://www.instagram.com/_hackquest/'}
        className="hover:scale-[1.1] cursor-pointer"
      >
        <InstagramIcon />
      </Link>
    </ul>
  );
};

export default ContractUs;
