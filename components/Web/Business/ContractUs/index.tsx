import Link from 'next/link';
import { FC, useContext } from 'react';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import DiscordIcon from '@/components/Common/Icon/Discord';
import DarkInstagramIcon from '@/components/Common/Icon/DarkInstagram';
import { cn } from '@/helper/utils';
import { ThemeContext } from '@/store/context/theme';
import { Theme } from '@/constants/enum';
import LightInstagramIcon from '@/components/Common/Icon/LightInstagram';
interface ContractUsProps {
  // children: ReactNode;
  className?: string;
}

const ContractUs: FC<ContractUsProps> = (props) => {
  const { className } = props;
  const { theme } = useContext(ThemeContext);
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
        className="cursor-pointer hover:scale-[1.1]"
      >
        <span className="text-text-default-color">
          <TwitterIcon />
        </span>
      </Link>
      <Link
        href={'https://discord.gg/KkAJHPqywn'}
        className="cursor-pointer hover:scale-[1.1]"
      >
        <span className="text-text-default-color">
          <DiscordIcon />
        </span>
      </Link>
      <Link
        href={'https://www.instagram.com/_hackquest/'}
        className="cursor-pointer hover:scale-[1.1]"
      >
        <span>
          {theme === Theme.Dark && <DarkInstagramIcon />}
          {theme === Theme.Light && <LightInstagramIcon />}
        </span>
      </Link>
    </ul>
  );
};

export default ContractUs;
