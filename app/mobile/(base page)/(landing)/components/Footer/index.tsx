import Image from 'next/image';
import { FC } from 'react';
import { FOOTER_LINKS } from './constant';
import Link from 'next/link';

interface FooterProps {}

const Footer: FC<FooterProps> = (props) => {
  return (
    <div className="py-20 px-5 w-full bg-neutral-black">
      <div className="w-full flex flex-col text-neutral-white gap-20">
        <div className="w-[8.25rem] h-[.875rem] relative">
          <Image
            src={'/images/logo/home_nav_logo.svg'}
            alt="hackquest"
            fill
          ></Image>
        </div>

        {FOOTER_LINKS.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-5">
              <h4 className="text-h4 font-next-book-bold">{item.group}</h4>
              <div className="flex flex-col body-m gap-2">
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
