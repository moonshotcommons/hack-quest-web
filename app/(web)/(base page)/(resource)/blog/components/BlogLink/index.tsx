import DiscordIcon from '@/components/Common/Icon/Discord';
import TelegramIcon from '@/components/Common/Icon/Telegram';
import TwitterIcon from '@/components/Common/Icon/Twitter';
import Link from 'next/link';
import React from 'react';

interface BlogLinkProp {}

const BlogLink: React.FC<BlogLinkProp> = () => {
  return (
    <div className="body-m mx-auto mb-[80px] flex max-w-[808px] justify-between text-neutral-medium-gray">
      <span>Stay connected with us</span>
      <div className="flex items-center gap-[16px]">
        <Link
          href={'https://discord.gg/KkAJHPqywn'}
          target="_blank"
          className="cursor-pointer hover:scale-[1.1]"
        >
          <span className="text-text-default-color">
            <DiscordIcon color={'#8c8c8c'} isMobile={true} />
          </span>
        </Link>
        <Link
          href={'https://x.com/hackquest_?s=21&t=kYetGSBybf-ssFBo7GodGA'}
          target="_blank"
          className="cursor-pointer hover:scale-[1.1]"
        >
          <span className="text-text-default-color">
            <TwitterIcon color={'#8c8c8c'} isMobile={true} />
          </span>
        </Link>
        <Link
          href={'https://t.me/hackquester'}
          target="_blank"
          className="cursor-pointer hover:scale-[1.1]"
        >
          <span className="text-text-default-color">
            <TelegramIcon color={'#8c8c8c'} isMobile={true} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default BlogLink;
