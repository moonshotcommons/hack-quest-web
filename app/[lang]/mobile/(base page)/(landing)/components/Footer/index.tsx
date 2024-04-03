import Image from 'next/image';
import { FC } from 'react';
import { FOOTER_LINKS } from './constant';
import Link from 'next/link';

interface FooterProps {}

const Footer: FC<FooterProps> = (props) => {
  return (
    <div className="w-full bg-neutral-black px-5 py-20">
      <div className="flex w-full flex-col gap-20 text-neutral-white">
        <div className="relative h-[.875rem] w-[8.25rem]">
          <Image src={'/images/logo/home_nav_logo.svg'} alt="hackquest" fill></Image>
        </div>

        {FOOTER_LINKS.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-5">
              <h4 className="text-h4">{item.group}</h4>
              <div className="body-m flex flex-col gap-2">
                {item.links.map((link, i) => {
                  return (
                    <Link key={i} href={link.link} target="_blank">
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
