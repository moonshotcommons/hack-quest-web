import Image from 'next/image';
import { FC, ReactNode } from 'react';
import GitLabLogo from '@/public/images/login/gitlab.svg';
import GithubLogo from '@/public/images/login/github.svg';
import GoogleLogo from '@/public/images/login/google.svg';
interface ThirdPartyLoginProps {
  // children: ReactNode;
}

const ThirdPartyLogin: FC<ThirdPartyLoginProps> = (props) => {
  return (
    <div className="flex justify-between w-full relative">
      <div className="w-fit h-fit p-[1.25rem] border border-solid rounded-full border-[#5B5B5B] hover:bg-white cursor-pointer">
        <Image src={GitLabLogo} alt="gitlab"></Image>
      </div>
      <div className="w-fit h-fit p-[1.25rem] border border-solid rounded-full border-[#5B5B5B] hover:bg-white cursor-pointer">
        <Image src={GithubLogo} alt="gitlab"></Image>
      </div>
      <div className="w-fit h-fit p-[1.25rem] border border-solid rounded-full border-[#5B5B5B] hover:bg-white cursor-pointer">
        <Image src={GoogleLogo} alt="gitlab"></Image>
      </div>
    </div>
  );
};

export default ThirdPartyLogin;
